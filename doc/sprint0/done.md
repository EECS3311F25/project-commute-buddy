# ✅ DONE.md — _Commute Buddy Project_

## 📘 Project Overview

**Commute Buddy** is a web-based application exclusively designed mainly for York University students to make daily commuting safer, more social, and more efficient. The platform connects students taking similar routes and schedules, allowing them to commute together.

<!--This document outlines all the **completed features** mapped directly to the **user stories**, representing the final state of the project at completion.-->

---

## 🚀 Core Features and Implementation Summary

### 🧩 1. User Registration & Authentication

- **Implemented Features:**
  - Account creation restricted to valid university email addresses (`@yorku.ca/@my.yorku.ca`).
  - Secure login and logout system using password hashing. <!--with possible session management-->
  - Email verification to ensure only verified students/faculty can access the app.

---

### 🚗 2. Commute Preferences Setup

- **Implemented Features:**
  - User can set home area, class schedule, and preferred bus routes.
  - Saved preferences are used to personalize commute suggestions.

---

### 🎚️ 3. Filtering & Safety Preferences

- **Implemented Features:**
  - Filter matches by gender, faculty, or preferred buddy types.
  - Each user is verified through university email validation.
  - Privacy settings control who can view routes or profiles.

---

### 💬 4. Communication System

- **Implemented Features:**
  - In-app chat system for direct messaging between matched users.
  - Ability to send and receive commute requests before a trip.
  - Notifications for new requests, matches, and messages.

---

### 📍 5. Live Location & Tracking

- **Implemented Features:**
  - Optional live location sharing between confirmed buddies.

 <!--Possible Location data encryption and is accessible only during active sessions.-->

---

### 🚌 6. TTC Route Integration

- **Implemented Features:**
  - Integration with TTC open data API to allow:
    - Searching nearby bus stops.
    - Viewing live bus timings.
    - Adding routes to commute preferences.

---

### 👥 7. Group Commutes

- **Implemented Features:**
  - Users can form or join group commutes (2–5 members).
  - Group chats and shared meeting points supported.

---

### 🌟 8. Commute Rating & History

- **Implemented Features:**
  - Users can rate commute experiences after each trip.
  - Historical data shows previous commute sessions and partners.

---

### 🧑‍🤝‍🧑 9. Favorites & Recommends

- **Implemented Features:**
  - Add users as “favorite buddies” for quick access and future matching preference.

---

### 🚨 10. Safety & Emergency Tools

- **Implemented Features:**
  - Emergency button in active commute view to alert campus security or chosen emergency contact.
  - Safety tips and support page linked to York University’s safety resources.

---

### 🛠️ 11. Admin Dashboard

- **Implemented Features:**
  - Admins can view user activity, report flags, and manage user accounts.
  - Logs of commutes, messages, and emergency alerts for security auditing.

---

## 💻 Technical Summary

- **Frontend:** React + CSS
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB Atlas
- **Authentication:** JWT-based with bcrypt password hashing
- **APIs:** TTC Open Data API for routes and stops

---

<!--

  ## 🧾 Final Notes

  - All core user stories were completed and tested through functional test cases.
  - The system meets all **MVP** and **extended** requirements (matching, messaging, safety, and admin).
  - Future improvements can include machine learning–based route predictions, public transit delay alerts, and mobile app integration along with further security enhancements.

-->
