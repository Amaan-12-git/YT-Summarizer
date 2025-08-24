# YouTube Video Summarizer

A full-stack web application that allows users to **paste any YouTube video or short URL** and get a **concise summary** of its transcript using **Gemini API**. Built with **MERN stack**, **React + Tailwind CSS frontend**, **Express backend**, and **Python Flask API** for processing video transcripts.

This project leverages the **YouTube_Transcript_API** to fetch transcripts, the **Gemini API** for summarization, and integrates secure authentication using **JWT** and **Google OAuth**. MongoDB stores user details and chat histories, making it a scalable and user-friendly solution.

---

## **Features**

- **Video Summarization:** Paste any YouTube URL to generate a concise summary of the video transcript.
- **Multi-Language Support:** Summarizes videos in any language, translating subtitles to English.
- **Future Q&A Feature:** Users will be able to ask questions about video content and get answers from the transcript.
- **Secure Authentication:** JWT-based authentication and Google OAuth integration.
- **Database Storage:** MongoDB stores user information and chat histories for personalized experiences.
- **Fast and Efficient:** Optimized backend for quick processing of videos of any length.
- **Responsive UI:** Built with React and Tailwind CSS for clean, mobile-friendly design.

---

## **Tech Stack**

- **Frontend:** React, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Python API:** Flask + YouTube_Transcript_API + Gemini API
- **Database:** MongoDB
- **Authentication:** JWT, Google OAuth

---

## **Installation & Setup (Unified)**

1. **Clone the repository:**

```bash
git clone <repository-url>
cd youtube-video-summarizer
```

2. **Install all dependencies:**

```bash
cd server
npm install
cd ..

cd client
npm install
cd ..

cd python
pip install -r requirements.txt
cd ..
```

3. **Configure Environment Variables:**

```bash
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
GOOGLE_CLIENT_SECRET=<your_google_oauth_client_secret>
VITE_GOOGLE_CLIENT_ID=<your_google_oauth_vite_client_id>
GEMINI_API_KEY=<your_gemini_api_key>
```

4. **Run the Application:**

```bash
# Start Python Flask API
cd python
python main.py

# Start Backend Server
cd server
npm run dev

# Start Frontend
cd client
npm start
```
