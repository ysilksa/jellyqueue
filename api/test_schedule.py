import requests

prompt = "Schedule a 45-minute team sync with vichedanarith2027@u.northwestern.edu and maanvisarwadi2027@u.northwestern.edu next week between April 8 and April 10 in the morning."

res = requests.post(
    "http://localhost:5000/schedule",
    json={"prompt": prompt}
)

# Try to print JSON, or fallback to plain text
print("Status code:", res.status_code)

try:
    print("Response JSON:")
    print(res.json())
except Exception:
    print("Raw response text:")
    print(res.text)
