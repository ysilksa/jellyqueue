# 🪼 JellyQueue.tech — Your Smart AI Meeting Scheduler!

**Project**: JellyQueue <br>
**Registered Domain**: [fish.JellyQueue.tech](https://fish.jellyqueue.tech/) <br>
**Collaborators**: Vicheda Narith, Maanvi Sarwadi, Isabella Yan, Katie Jiang <br>
**Event**: WildHacks 2025 – Northwestern University's Largest Hackathon <br>

Welcome to **JellyQueue**, a smart, AI-powered calendar scheduling web application built during **WildHacks 2025**. 🧠📆

## 🚀 What is JellyQueue?

JellyQueue is an intelligent meeting scheduler that uses the **Gemini AI API** to scan multiple team members' **Google Calendars**, resolve conflicts, check for **weather conditions**, and auto-generate the most optimal meeting time and **Google Meet link**, all wrapped in a conversational AI chatbot experience.

Whether you're working on a school project or organizing a club meeting, JellyQueue ensures everyone finds the perfect time slot effortlessly.

---

## ✨ Features

- 🧠 **AI Chatbot Integration** (Gemini API)  
  Ask JellyQueue to “Schedule a meeting next week,” and it will do all the heavy lifting.

- 📅 **Smart Calendar Scanning**  
  Authenticates with **Google Calendar API** to scan availability across all participants.

- ⏱️ **Automated Conflict Resolution**  
  Suggests time slots that work for everyone and avoids double-booking.

- 🌤️ **Weather-Aware Scheduling**  
  Uses a **Weather API** to avoid scheduling outdoor meetings on rainy days.

- 📎 **Google Meet Link Generation**  
  Automatically creates a video meeting link once the meeting is scheduled.

- 🔔 **Notification System**  
  Sends smart reminders and confirmations to all participants.

---

![Diagram of API interactions](https://github.com/ysilksa/jellyqueue/blob/main/public/jellyqueue.png)

---

## 🔧 Tech Stack

**Frontend**:  
- React (with Vite for fast development)  

**Backend**:  
- Python - Flask (All required packages are in the requirements.txt file)
- Google Calendar API for scheduling  
- Gemini API for chatbot conversation & NLP  

**Cloud/Deployment**:  
- AWS EC2 for hosting  
- Serverless integrations for lightweight and scalable performance

---

## 🧑‍💻 Running the App Locally

### 🖥️ Client Side (React + Vite)
`npm install` <br>
`npm run dev` <br>

### Serverless Side
`cd api` <br>
`pip install -r requirements.txt` <br>
`python app.py` <br>
