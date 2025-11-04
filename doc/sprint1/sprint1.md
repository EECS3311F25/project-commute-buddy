# Sprint 1 Planning Meeting – Commute Buddy

---

## Meeting Information

**Project Name:** Commute Buddy

**Sprint Number:** Sprint 1

**Date:** October 19, 2025

**Time:** 2:00 PM – 4:00 PM EST

**Location:** WhatsApp Video Call

**Facilitator:** Ashraf (Product Owner)

**Note Taker:** Sathmi

---

## Participants

| Name   | Role                      | Attendance | Participation |
| ------ | ------------------------- | ---------- | ------------- |
| Ashraf | Product Owner / Developer | ✓          | ✓ Active      |
| Ali    | Developer                 | ✓          | ✓ Active      |
| Shaun  | Developer                 | ✓          | ✓ Active      |
| Sathmi | Developer                 | ✓          | ✓ Active      |

**Attendance:** 4 / 4 (100%)

---

## Sprint Goal

Build and deploy the **authentication foundation** for Campus Commute Buddy that enables verified York University students to securely register, log in, and access the platform with role-based permissions.

**Sprint Success Criteria**

- Registration accepts only `@yorku.ca` or `@my.yorku.ca` emails.
- JWT authentication with role-based access control (1-hour expiry).
- Protected routes only accessible to authenticated users.
- Admin endpoint (`/api/users/all`) restricted to admins.
- React frontend includes Signup, Login, and Protected pages.
- System builds and runs successfully using MongoDB.
- All tasks and user stories tracked on Trello.

---

## Team Capacity

| Member | Role                      | Hours | Main Focus                                                   |
| ------ | ------------------------- | ----- | ------------------------------------------------------------ |
| Ashraf | Product Owner / Developer | 30    | Backend controllers, frontend integration, UI design         |
| Ali    | Developer                 | 30    | Database schema, admin routes, infrastructure                |
| Shaun  | Developer                 | 30    | Backend controllers , JWT middleware, testing, documentation |
| Sathmi | Developer                 | 30    | React UI (TailwindCSS), form validation, UX                  |

**Total Capacity:** 120 hours **Utilization:** ~80 % (buffer for midterms)

---

## User Stories Selected for Sprint 1

| Story Title                   | Priority | Points | Assignees             |
| ----------------------------- | -------- | ------ | --------------------- |
| University Email Registration | P0       | 8      | Ashraf, Ali, Sathmi   |
| Secure User Login             | P0       | 5      | Ashraf, Shaun, Sathmi |
| Protected Route Access        | P0       | 5      | Shaun, Ali            |
| Admin Role Management         | P1       | 2      | Ali, Shaun            |

**Total Story Points:** 20 **Aligned with:** RPM (Oct 16 2025)

---

## Acceptance Criteria (Summary)

**University Email Registration**

- Accept only YorkU emails; prevent duplicates.
- Password hashed (bcrypt) and saved in MongoDB.
- Successful registration returns token.
- Frontend form validates and connects to backend API.

**Secure User Login**

- Valid credentials return JWT with id and role.
- Invalid → 400 error message.
- Token stored in localStorage.
- Redirects to protected content after login.

**Protected Route Access**

- `/api/content` protected by JWT middleware.
- Invalid token → 401 Unauthorized.
- Valid token → user-specific message.
- React ProtectedRoute guards frontend access.

**Admin Role Management**

- `isAdmin` middleware verifies role.
- Admin → 200 response with user list (no passwords).
- Non-admin → 403 Forbidden.
- Backend-only feature tested via Postman.

---

## Tasks Breakdown (Sprint 1)

### University Email Registration (P0)

- **Backend:** Create User schema with unique email + hashed password using bcrypt.
- **Backend:** Implement `POST /api/users/register` endpoint with email validation and duplicate check.
- **Frontend:** Build Signup page (React + Tailwind) validating YorkU domain (`@yorku.ca` / `@my.yorku.ca`).
- **Integration:** Connect frontend form to backend API and handle success/error messages.
- **Testing:** Verify registration flow with valid, duplicate, and invalid email inputs.

---

### Secure User Login (P0)

- **Backend:** Create `POST /api/users/login` endpoint using bcrypt comparison and JWT (1-hour expiry, includes role).
- **Frontend:** Develop Login page and store token in `localStorage` for session persistence.
- **Frontend:** Redirect user to protected page after login and display login errors for invalid credentials.
- **Integration:** Connect backend and frontend login flow; test manually via Postman and UI.
- **Testing:** Validate behavior for expired tokens and invalid credentials.

---

### Protected Route Access (P0)

- **Backend:** Implement JWT middleware (`protect`, `verifyToken`) and `/api/content` endpoint.
- **Frontend:** Create `ProtectedRoute` wrapper and simple protected page showing user greeting.
- **Frontend:** Add Navbar and Logout functionality that clears token and redirects to home.
- **Integration:** Ensure only authenticated users can access protected routes.
- **Testing:** Test cases with valid, invalid, and expired tokens.

---

### Admin Role Management (P1)

- **Backend:** Add `role` field to User model (default = user); create `isAdmin` middleware.
- **Backend:** Implement `GET /api/users/all` route restricted to admin users; exclude passwords in response.
- **Setup:** Manually create one admin account in MongoDB for testing.
- **Security:** Verify JWT includes user role; return `403 Forbidden` for non-admins.
- **Testing:** Test admin vs. regular user access using Postman.

---

## Technical Spikes

| Spike                             | Focus                           | Owner  | Duration | Outcome                                   |
| --------------------------------- | ------------------------------- | ------ | -------- | ----------------------------------------- |
| JWT Authentication Best Practices | jsonwebtoken usage and security | Shaun  | 3 h      | Use jsonwebtoken + 1 h expiry             |
| MongoDB Schema Design             | User model and uniqueness rules | Ali    | 2 h      | User model with unique email + timestamps |
| React + Tailwind Setup            | Component layout and styling    | Sathmi | 2 h      | Responsive base UI implemented            |

---

## Definition of Done

A story is done when:

- Code meets all acceptance criteria.
- Reviewed and merged to main branch.
- Application builds and runs without errors.
- API endpoints documented.
- Demo video prepared and submitted.

---

## Development Practices

- **Workflow:** Product Backlog → Sprint 1 Backlog → In Progress → Code Review → Testing / QA → Done
- **Branching:** `feature/short-description` (e.g., `feature/register`)
- **Commits:** clear messages describing each change
- **Reviews:** peer review within 48 hours
- **Tools:** GitHub, Trello, Postman, VS Code

---

## Sprint Schedule

| Week           | Focus                  | Deliverables                                      |
| -------------- | ---------------------- | ------------------------------------------------- |
| Oct 19 – 25    | Setup + Backend        | MongoDB connected, register/login APIs working    |
| Oct 26 – Nov 3 | Frontend + Integration | Auth flow completed + admin endpoint + demo ready |

---

## Standups (Planned)

1. **Oct 16** – Initial setup completed, no blockers.
2. **Oct 20** – Mid-progress update during midterms.
3. **Nov 1** – Final testing and wrap-up before demo.

---

## Sprint Tracking

All Sprint 1 work is tracked on our Trello board:

**Board Name:** Project Commute Buddy – EECS 3311

**Workflow Columns:** Product Backlog → Sprint 1 Backlog → In Progress → Code Review → Testing / QA → Done

The Sprint 1 Backlog includes broader feature cards that correspond to our selected stories:

| Feature Area                | Trello Card Name              | Related Sprint 1 Stories                                                 |
| --------------------------- | ----------------------------- | ------------------------------------------------------------------------ |
| Authentication & Onboarding | “Authentication & Onboarding” | University Email Registration, Secure User Login, Protected Route Access |
| Admin Dashboard             | “Admin Dashboard”             | Admin Role Management                                                    |

Each Trello card lists assigned members, priority/difficulty labels, and checklists for subtasks.

Cards move across workflow columns as work progresses, providing real-time tracking for grading.

---

## Approval & Sign-Off

| Name   | Role                        | Signature               | Date        |
| ------ | --------------------------- | ----------------------- | ----------- |
| Ashraf | Product Owner / Facilitator | Mohammed Ashraful Islam | Oct 19 2025 |
| Ali    | Developer                   | Ali Nategh              | Oct 19 2025 |
| Shaun  | Developer                   | Shaun Fernando          | Oct 19 2025 |
| Sathmi | Developer                   | Sathmi Kurukulasooriya  | Oct 19 2025 |

---

**Document Version:** 1.0

**Created:** October 19, 2025

**Last Updated:** October 19, 2025

**Next Meeting:** Sprint 1 Retrospective (Nov 3, 2025)

---

_This document serves as the official record of the Sprint 1 Planning Meeting and defines the scope, responsibilities, and workflow for Sprint 1 of the Campus Commute Buddy project._
