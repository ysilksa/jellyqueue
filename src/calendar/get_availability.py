from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

def get_availability(attendees, date_range):
    # Create Google Calendar API client
    creds = Credentials.from_authorized_user_info(info="YOUR_CREDENTIALS")
    service = build('calendar', 'v3', credentials=creds)

    # Dynamic date range from the Gemini output
    time_min = f'{date_range[0]}T00:00:00Z'
    time_max = f'{date_range[1]}T23:59:59Z'

    freebusy_request = {
        "timeMin": time_min,
        "timeMax": time_max,
        "items": [{"id": attendee} for attendee in attendees]
    }

    freebusy_result = service.freebusy().query(body=freebusy_request).execute()

    # Collect busy times for each attendee
    busy_times = {}
    for attendee in attendees:
        busy_times[attendee] = freebusy_result['calendars'].get(attendee, {}).get('busy', [])

    return busy_times

attendees = ["alice@example.com", "bob@example.com"]
date_range = ["2025-04-08", "2025-04-08"]

busy_times = get_availability(attendees, date_range)
print(busy_times)
