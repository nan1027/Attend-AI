# 🎓 AttendAI — Smart Facial Recognition Attendance System

<p align="center">
  <strong>AI-powered attendance management using real-time facial recognition</strong>
</p>

<p align="center">
  <a href="https://attend-ai-rshe.onrender.com">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-AttendAI-orange?style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://github.com/nan1027/Attend-AI">
    <img src="https://img.shields.io/badge/💻%20GitHub-AttendAI-black?style=for-the-badge" alt="GitHub">
  </a>
</p>

---

## 📌 Overview

**AttendAI** is a web-based student attendance management system that uses **computer vision and machine learning** to recognize registered students and automatically record their attendance.

The application provides a complete workflow for:

- Registering students
- Capturing facial samples through a browser camera
- Training a facial recognition model
- Recognizing students in real time
- Automatically recording attendance
- Viewing attendance history
- Filtering attendance records
- Downloading attendance data as CSV

The project combines a **Flask backend**, **MediaPipe face detection**, **OpenCV image processing**, and a **Random Forest machine-learning classifier** with a modern responsive frontend.

---

## 🚀 Live Demo

### 👉 [Launch AttendAI](https://attend-ai-rshe.onrender.com)

The application is deployed on **Render** using HTTPS, allowing browser-based camera access for face capture and real-time attendance recognition.

> **Note:** The deployed application uses browser camera permissions. Allow camera access when prompted by the browser.

---

# ✨ Features

### 👤 Student Registration

Register students by entering:

- Full Name
- Roll Number
- Registration Number
- Class
- Section

The system then allows facial samples to be captured directly through the browser camera.

---

### 📸 Face Sample Capture

The application uses the browser's camera to capture multiple facial samples for each registered student.

The capture interface provides:

- Live camera preview
- Capture progress
- Sample count
- Registration completion status

Multiple samples help provide more training data for the recognition model.

---

### 🧠 Real-Time Face Recognition

AttendAI uses **MediaPipe** for face detection and **OpenCV** for image preprocessing.

The detected face is processed before being passed to the machine-learning classifier.

---

### ✅ Automatic Attendance

When a registered student is recognized:

1. The student's identity is predicted.
2. The recognition result is displayed.
3. Attendance is automatically recorded.
4. The timestamp is stored.

---

### 📊 Attendance Records

The attendance dashboard provides:

- Recognition history
- Student name
- Student ID
- Timestamp
- Attendance status
- Date-based filtering
- CSV export

Available filters include:

- All
- Today
- Last 7 Days
- Last 30 Days

---

### 🎨 Modern User Interface

AttendAI uses a custom responsive interface with:

- Editorial-inspired visual design
- Clean navigation
- Dashboard overview
- Dedicated camera interfaces
- Recognition status indicators
- Attendance analytics
- Responsive layouts

---

# 🧠 System Architecture

```text
                         👤 STUDENT
                              │
                              ▼
                  ┌─────────────────────┐
                  │  Student Registration│
                  │                     │
                  │ Name                │
                  │ Roll Number         │
                  │ Registration Number │
                  │ Class / Section     │
                  └──────────┬──────────┘
                             │
                             ▼
                    📸 Face Capture
                             │
                             ▼
                  ┌─────────────────────┐
                  │ MediaPipe Face      │
                  │ Detection           │
                  └──────────┬──────────┘
                             │
                             ▼
                    Face Preprocessing
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
                Grayscale        Resize 32×32
                    │                 │
                    └────────┬────────┘
                             │
                             ▼
                    Feature Vector
                             │
                             ▼
                  🌲 Random Forest Model
                             │
                             ▼
                     Face Prediction
                             │
                             ▼
                  👤 Student Identified
                             │
                             ▼
                     ✅ Attendance
                             │
                             ▼
                    🗄️ SQLite Database
                             │
                             ▼
                   📊 Attendance Records
