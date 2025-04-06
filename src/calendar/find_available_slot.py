from datetime import datetime, timedelta

def find_available_slots(busy_times, duration):
    # Assume the day starts at 9 AM and ends at 5 PM
    work_day_start = datetime.strptime("2025-04-08T09:00:00", "%Y-%m-%dT%H:%M:%S")
    work_day_end = datetime.strptime("2025-04-08T17:00:00", "%Y-%m-%dT%H:%M:%S")
    
    available_slots = []
    meeting_duration = timedelta(minutes=duration)

    # Loop through potential free times
    current_start = work_day_start

    while current_start + meeting_duration <= work_day_end:
        current_end = current_start + meeting_duration
        is_conflict = False
        
        # Check if this time slot conflicts with any attendee's busy times
        for busy_periods in busy_times.values():
            for busy_time in busy_periods:
                busy_start = datetime.strptime(busy_time["start"], "%Y-%m-%dT%H:%M:%SZ")
                busy_end = datetime.strptime(busy_time["end"], "%Y-%m-%dT%H:%M:%SZ")

                if current_start < busy_end and current_end > busy_start:
                    is_conflict = True
                    break

        if not is_conflict:
            available_slots.append((current_start, current_end))

        # Move to the next potential start time
        current_start = current_start + timedelta(minutes=30)  # Shift by 30 minutes for the next slot

    return available_slots

# Check for 1-hour slots
available_slots = find_available_slots(busy_times, 60)
print(available_slots)
