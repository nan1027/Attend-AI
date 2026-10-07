# 🤖 AttendAI — Smart Facial Recognition Attendance System

### AI-Powered Attendance Management with Real-Time Face Recognition

AttendAI is a full-stack facial recognition attendance system designed to automate student attendance using a webcam-based recognition pipeline.

The system allows administrators to register students, capture face samples, train a recognition model, recognize students in real time, automatically record attendance, and review or export attendance history through a modern web interface.

<p align="center">
  <a href="YOUR_RENDER_URL">
    <img src="https://img.shields.io/badge/Live%20Demo-FF633F?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo"/>
  </a>
  <a href="https://github.com/nan1027/Attend-AI">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
</p>

---

## ✨ Features

### 👨‍🎓 Student Registration
- Register students with:
  - Full name
  - Roll number
  - Registration number
  - Class
  - Section
- Capture multiple face samples directly through the browser camera.
- Prepare facial data for recognition.

### 📷 Real-Time Face Recognition
- Browser-based webcam integration.
- Real-time face detection using MediaPipe.
- Facial image preprocessing before classification.
- Machine-learning based student recognition.
- Live recognition interface with visual scanning feedback.

### 🟢 Automatic Attendance
- Automatically records attendance when a registered student is recognized.
- Prevents the need for manual attendance entry.
- Displays recognized students during the current recognition session.

### 📊 Attendance Records
- View complete attendance history.
- Filter records by:
  - All
  - Today
  - Last 7 days
  - Last 30 days
- View student ID, student name, timestamp and attendance status.
- Export attendance records as CSV.

### 🎨 Modern User Interface
- Responsive dashboard.
- Camera-focused recognition interface.
- Clean editorial-style visual design.
- Real-time system and camera status indicators.
- Dedicated workflows for registration, recognition and attendance management.

---

## 🧠 How It Works

```text
                    ┌─────────────────────┐
                    │       Student       │
                    │     Registration    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Webcam Capture    │
                    │   Face Samples      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   MediaPipe Face    │
                    │     Detection       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Image Preprocessing │
                    │ Crop → Gray → Resize│
                    │     → Flatten       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Random Forest       │
                    │ Classifier          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Student Recognition │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Attendance Record   │
                    │     SQLite DB       │
                    └─────────────────────┘
