import openai

openai.api_key = "YOUR_GEMINI_API_KEY"

def extract_meeting_details(user_input):
    response = openai.Completion.create(
        model="gemini",
        prompt=f"""
        You are a meeting scheduler AI. Given this message:

        "{user_input}"

        Extract the following:
        - Attendees (name or email)
        - Duration (in minutes)
        - Date range (start and end date)
        - Time preference (morning/afternoon/evening)
        Return the data as JSON.
        """,
        max_tokens=150
    )
    return response.choices[0].text.strip()

user_input = "Schedule a 1-hour meeting with Alice and Bob next Tuesday."
meeting_details = extract_meeting_details(user_input)
print(meeting_details)