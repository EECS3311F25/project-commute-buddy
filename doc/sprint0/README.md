# CommuteBuddy

---

## Motivation

York University is known as a commuter school, with thousands of students traveling from across the GTA every day. Many students take the same TTC, GO Transit, or YRT routes but rarely know who else shares their journey.

**CommuteBuddy** is a web application designed exclusively for York University students to make commuting more social, safe, and efficient. It connects students traveling on similar public transit routes at similar times, turning long, isolated commutes into opportunities for companionship and safety.
Beyond commute coordination, CommuteBuddy’s main goal is to help York commuters build real friendships, creating a stronger sense of community for students who spend hours traveling daily.

---

## Project Overview

CommuteBuddy allows verified York students to:

- Create accounts using **YorkU email verification**
- Set up and save **commuting preferences**
- **Match** with other students traveling on similar routes
- **Chat** securely within the platform to coordinate meet-ups
- **Share live locations** for easy coordination
- Receive **notifications** for potential matches or route overlaps
- Rate and review commute experiences to improve suggestions
- Maintain privacy and safety via **university credential checks**

---

## Architecture & Stack

Our system will follow the **MVC architecture** pattern, ensuring modular and maintainable code structure.

| Layer                        | Technology (Planned)                     |
| ---------------------------- | ---------------------------------------- |
| **Frontend (View)**          | React.js with TailwindCSS                |
| **Backend (Controller)**     | Node.js + Express                        |
| **Database (Model)**         | MongoDB (Atlas)                          |
| **Authentication**           | YorkU Email Verification (OAuth)         |
| **Version Control & DevOps** | GitHub, GitHub Projects, Trello, Discord |

---

## Installation (Setup Instructions)

> ⚠️ _Full deployment steps will be completed during Sprint 1._

For now, to clone the repository and view Sprint 0 documents:

```bash
# Clone the repo
git clone https://github.com/EECS3311F25/project-commute-buddy.git

# Navigate to project folder
cd project-commute-buddy/

# Install dependencies on backend and start server

cd setup/
npm init -y
npm install express mongoose cors

node server.js

# Install dependencies on frontend and build frontend to run

cd frontend/
npm install axios

npm start

# View documentation
cd doc/sprint0
```
