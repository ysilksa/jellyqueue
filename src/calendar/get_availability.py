from flask import Flask, session, redirect, jsonify
# pip install google-api-python-client
from google.oauth2.credentials import Credentials
# pip install google-auth-oauthlib
from googleapiclient.discovery import build
import datetime
import os


app = Flask(__name__)
app.secret_key = os.urandom(24)
# OAuth client ID and secret (use the credentials file you downloaded from Google Cloud Console)
CLIENT_SECRETS_FILE = "client_secrets.json"
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
from flask import request
from google_auth_oauthlib.flow import Flow


@app.route('/authorize')
def authorize():
   flow = Flow.from_client_secrets_file(
       CLIENT_SECRETS_FILE,
       scopes=SCOPES,
       redirect_uri='http://localhost:5000/oauth2callback'
   )
   auth_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
   session['state'] = state
   return redirect(auth_url)


@app.route('/oauth2callback')
def oauth2callback():
   state = session['state']
   flow = Flow.from_client_secrets_file(
       CLIENT_SECRETS_FILE,
       scopes=SCOPES,
       state=state,
       redirect_uri='http://localhost:5000/oauth2callback'
   )
   flow.fetch_token(authorization_response=request.url)


   creds = flow.credentials
   session['credentials'] = {
       'token': creds.token,
       'refresh_token': creds.refresh_token,
       'token_uri': creds.token_uri,
       'client_id': creds.client_id,
       'client_secret': creds.client_secret,
       'scopes': creds.scopes
   }


   return redirect('/availability/json')


@app.route('/availability/json')
def availability_json():
   if 'credentials' not in session:
       return redirect('/authorize')
  
   creds_data = session['credentials']
   creds = Credentials.from_authorized_user_info(info=creds_data)
   slots = get_availabilities(creds)
  
   return jsonify({"available_slots": slots})


def get_availabilities(creds):
   service = build('calendar', 'v3', credentials=creds)


   now = datetime.datetime.utcnow()
   start_of_day = now.replace(hour=9, minute=0, second=0, microsecond=0)
   end_of_day = now.replace(hour=17, minute=0, second=0, microsecond=0)


   time_min = start_of_day.isoformat() + 'Z'
   time_max = end_of_day.isoformat() + 'Z'


   body = {
       "timeMin": time_min,
       "timeMax": time_max,
       "timeZone": "UTC",
       "items": [{"id": "primary"}]
   }


   result = service.freebusy().query(body=body).execute()
   busy_times = result['calendars']['primary']['busy']


   busy_periods = [
       (
           datetime.datetime.fromisoformat(b['start'].replace('Z', '+00:00')),
           datetime.datetime.fromisoformat(b['end'].replace('Z', '+00:00'))
       ) for b in busy_times
   ]
   busy_periods.sort()


   availabilities = []
   cursor = start_of_day
   for start, end in busy_periods:
       if cursor < start:
           availabilities.append((cursor, start))
       cursor = max(cursor, end)


   if cursor < end_of_day:
       availabilities.append((cursor, end_of_day))


   formatted_slots = [
       f"{slot_start.strftime('%H:%M')} - {slot_end.strftime('%H:%M')}"
       for slot_start, slot_end in availabilities
   ]


   return formatted_slots


if __name__ == "__main__":
   app.run(debug=True)
