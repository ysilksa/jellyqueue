def create_event(meeting_details, available_slot):
    event = {
        'summary': 'Scheduled Meeting',
        'location': 'Google Meet',
        'description': 'Team sync meeting.',
        'start': {
            'dateTime': available_slot[0].strftime('%Y-%m-%dT%H:%M:%S'),
            'timeZone': 'UTC',
        },
        'end': {
            'dateTime': available_slot[1].strftime('%Y-%m-%dT%H:%M:%S'),
            'timeZone': 'UTC',
        },
        'attendees': [{'email': attendee} for attendee in meeting_details['attendees']],
    }

    event = service.events().insert(calendarId='primary', body=event).execute()
    return event

event = create_event(meeting_details, available_slots[0])
print(f"Event created: {event.get('htmlLink')}")
