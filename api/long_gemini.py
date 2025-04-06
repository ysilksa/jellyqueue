from flask import Flask, request, jsonify
from google.oauth2 import service_account
from googleapiclient.discovery import build
from dotenv import load_dotenv
import pytz
import datetime
import json
import os
import requests
from google import genai


# Load environment variables from .env file
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')
time_zone = os.getenv('TIMEZONE', 'America/New_York')

client = genai.Client(api_key=api_key)

# Flask app
app = Flask(__name__)

#@app.route('/generate', methods=['POST'])

def extract_meeting_details(prompt):
    system_prompt = """
                        You are a helpful assistant that extracts structured meeting information from a user's text prompt.

                        Return a JSON object with the following keys:
                        - meeting_title (string)
                        - duration_minutes (integer)
                        - participants (list of emails)
                        - earliest_date (string, YYYY-MM-DD)
                        - latest_date (string, YYYY-MM-DD)
                        - preferred_time_of_day (string: morning, afternoon, evening)
                        - summary (string)
                    """

    response = client.model.generate_content(system_prompt + "\nUser Prompt: " + prompt)
    text = response.text

    try:
        json_str = text[text.find("{"):text.rfind("}")+1]
        return eval(json_str)  # You can use `json.loads()` instead if you're confident in formatting
    except Exception as e:
        raise ValueError("Failed to extract JSON: " + str(e))

def schedule_event(details):
    credentials = service_account.Credentials.from_service_account_file(
        'credentials.json',
        scopes=['https://www.googleapis.com/auth/calendar']
    )
    service = build('calendar', 'v3', credentials=credentials)

    participants = details['participants']
    duration = datetime.timedelta(minutes=details['duration_minutes'])

    tz = pytz.timezone(os.getenv("TIMEZONE", "America/New_York"))

    # Map preferred time of day to hour ranges
    time_blocks = {
        "morning": range(9, 12),
        "afternoon": range(13, 17),
        "evening": range(17, 20)
    }

    preferred_block = time_blocks.get(details.get("preferred_time_of_day", "afternoon"), range(13, 17))
    earliest = datetime.datetime.strptime(details["earliest_date"], "%Y-%m-%d").date()
    latest = datetime.datetime.strptime(details["latest_date"], "%Y-%m-%d").date()

    # Iterate through days and hours
    for day in (earliest + datetime.timedelta(n) for n in range((latest - earliest).days + 1)):
        for hour in preferred_block:
            start_dt = tz.localize(datetime.datetime.combine(day, datetime.time(hour, 0)))
            end_dt = start_dt + duration

            # Query FreeBusy
            fb_request = {
                "timeMin": start_dt.isoformat(),
                "timeMax": end_dt.isoformat(),
                "timeZone": tz.zone,
                "items": [{"id": email} for email in participants]
            }

            fb_response = service.freebusy().query(body=fb_request).execute()
            all_busy = any(
                fb_response['calendars'][email]['busy'] for email in participants
            )

            if not all_busy:
                # Everyone's free — schedule it!
                event = {
                    "summary": details['meeting_title'],
                    "description": details['summary'],
                    "start": {"dateTime": start_dt.isoformat(), "timeZone": tz.zone},
                    "end": {"dateTime": end_dt.isoformat(), "timeZone": tz.zone},
                    "attendees": [{"email": email} for email in participants],
                }

                created_event = service.events().insert(calendarId='primary', body=event).execute()
                return created_event['htmlLink']

    raise Exception("No common free time found between participants in the preferred time window.")

@app.route("/schedule", methods=["POST"])

def schedule():
    try:
        prompt = request.json.get("prompt")
        if not prompt:
            return jsonify({"error": "Missing prompt"}), 400

        meeting_details = extract_meeting_details(prompt)
        print("Extracted details:", meeting_details)

        event_link = schedule_event(meeting_details)
        return jsonify({"message": "Meeting scheduled!", "eventLink": event_link})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)