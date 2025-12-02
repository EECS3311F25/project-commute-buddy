# Product Backlog (PB.md)

## Campus Commute Buddy Platform

**Last Updated:** November 17, 2025  
**Product Owner:** Ashraf  
**Version:** 3.0

---

## Backlog Status Legend

- ✅ **DONE** - Completed and deployed
- 📋 **SPRINT 3** - Planned for Sprint 3
- 🔮 **FUTURE** - Post-release backlog

---

## Sprint 1 - Completed Stories ✅

### US #1: University Email Registration

**Status:** DONE | **Priority:** P0 | **Points:** 8  
**Sprint Completed:** Sprint 1

_As an unregistered user, I want to create an account using my university email so that only verified students can access the platform._

**Deliverables:**

- Email validation with university domain whitelist (@yorku.ca, @my.yorku.ca)
- Email verification flow with code/link
- Account creation process
- Duplicate account prevention

---

### US #3: Secure User Login

**Status:** DONE | **Priority:** P0 | **Points:** 5  
**Sprint Completed:** Sprint 1

_As a returning registered user, I want to log in securely so that my personal commute data remains protected._

**Deliverables:**

- Email and password authentication with JWT (1-hour expiry)
- Secure session management
- Password reset functionality via email
- "Remember me" feature
- Failed login attempt tracking
- Session timeout after inactivity

---

### US #12: Student Verification

**Status:** DONE | **Priority:** P0 | **Points:** 3  
**Sprint Completed:** Sprint 1

_As a registered user, I want each buddy to be a verified student so that I feel safe traveling together._

**Deliverables:**

- Student status verification via university email domain
- Platform access restricted to verified students only

**Note:** Implemented as part of US #1 (University Email Registration)

---

### US #20: Admin Dashboard - Basic User Viewing (Partial)

**Status:** PARTIAL (8/13 points complete) | **Priority:** P1  
**Sprint Completed:** Sprint 1 (Partial)

_As an admin, I want to view and manage user activity and reports so that I can ensure platform safety and compliance._

**Completed in Sprint 1:**

- Admin authentication system with role-based access
- Basic user viewing interface
- View user information (name, email, role, creation date)
- UI structure with tabs (Reports, Activity Log, Analytics)

**Remaining Work:**

- User management actions (suspend, delete) → US #21
- Reports tab functionality → US #22
- Activity log functionality → US #23
- Platform analytics → US #24
- Advanced search and filtering → US #25

---

## Sprint 2 - Completed Stories ✅

### US #2: Commute Preferences Setup

**Status:** DONE | **Priority:** P0 | **Points:** 8  
**Sprint Completed:** Sprint 2

_As a registered user, I want to set up my commuting preferences (home area, campus schedule, and preferred bus routes) so that I can get accurate commute matches._

**Deliverables:**

- User preference schema (homeArea, schedule, preferredRoutes, commuteTime)
- PUT /api/users/preferences and GET /api/users/preferences endpoints
- Preferences setup page with intuitive UI
- Home area input with validation
- Schedule selector (days and time ranges)
- Bus route multi-select component
- Preferences display on profile page
- Form validation and error handling
- Data persistence in MongoDB

---

### US #4: Commute Buddy Matching

**Status:** DONE | **Priority:** P0 | **Points:** 13  
**Sprint Completed:** Sprint 2

_As a registered user, I want to find other students taking the same bus or route so that I can plan to commute together._

**Deliverables:**

- Matching algorithm with weighted factors:
  - Route overlap: 40%
  - Start area proximity: 20%
  - Commute time compatibility: 20%
  - Schedule overlap: 20%
- POST /api/matches/search endpoint with query filters
- Match percentage calculation (0-100%)
- Matching page with filter controls (route, start area, commute time, match %)
- Match results displayed in card format
- Profile preview for potential matches
- Privacy settings enforcement in matching queries
- "No matches found" empty state
- Performance optimized for multiple users

---

### US #7: Commute Request System

**Status:** DONE | **Priority:** P0 | **Points:** 8  
**Sprint Completed:** Sprint 2

_As a registered user, I want to send and receive commute requests so that I can coordinate with others before traveling._

**Deliverables:**

- Request schema (sender, receiver, message, status, timestamps)
- API endpoints: POST /api/requests/send, PUT /api/requests/:id/accept, PUT /api/requests/:id/decline
- GET /api/requests/sent, GET /api/requests/received, GET /api/requests/connections endpoints
- Connections tab with summary view (pending, approved, declined)
- New request creation with user search by email/username
- Accept/Decline functionality with real-time status updates
- Duplicate request prevention
- Request count indicators
- Success/error notifications
- User validation (verify receiver exists)

---

### US #18: Privacy Settings

**Status:** DONE | **Priority:** P1 | **Points:** 5  
**Sprint Completed:** Sprint 2

_As a registered user, I want to control who can view my profile or see my route details so that I can maintain my privacy._

**Deliverables:**

- Privacy fields in User schema (profileVisibility, routeVisibility, allowRequests)
- PUT /api/users/privacy endpoint for privacy settings
- PUT /api/users/profile endpoint for personal details
- PUT /api/users/change-password endpoint with current password verification
- Privacy Settings page with visibility toggles
- Profile Management page with personal details form
- Change password functionality with validation
- Interests and bus routes selection on profile
- Privacy enforcement in matching and profile queries
- Form validation and confirmation dialogs
- Success/error feedback messages

---

## Sprint 3 - Admin Dashboard Completion & Final Polish 📋

### US #21: Admin User Management Actions

**Status:** READY | **Priority:** P1 | **Points:** 5

_As an admin, I want to suspend or delete user accounts so that I can moderate the platform and remove problematic users._

**Acceptance Criteria:**

- [ ] Implement suspend user functionality
- [ ] Implement delete user functionality (soft delete)
- [ ] Add confirmation dialogs for destructive actions
- [ ] Log all admin actions for audit trail
- [ ] Display user status (active/suspended) in user list
- [ ] Prevent admins from suspending/deleting other admins
- [ ] Email notification to suspended users (optional)

---

### US #25: Admin User Search and Filtering

**Status:** READY | **Priority:** P1 | **Points:** 5

_As an admin, I want to search and filter users so that I can quickly find specific accounts for management purposes._

**Acceptance Criteria:**

- [ ] Implement search by name, email, or user ID
- [ ] Add filter by account status (active, suspended, verified)
- [ ] Add filter by registration date range
- [ ] Add filter by role (user, admin)
- [ ] Display search results in sortable table
- [ ] Show result count and pagination
- [ ] Clear filters button
- [ ] Search persistence across page refreshes

---

### US #22: Admin Reports Dashboard

**Status:** READY | **Priority:** P1 | **Points:** 8

_As an admin, I want to view and manage user reports so that I can respond to safety concerns and policy violations._

**Acceptance Criteria:**

- [ ] Implement reports tab in admin dashboard
- [ ] Display list of user-submitted reports
- [ ] Show report details (reporter, reported user, reason, timestamp, description)
- [ ] Add report status workflow (pending, reviewing, resolved, dismissed)
- [ ] Enable admin actions on reports (change status, view user profiles, take action)
- [ ] Filter reports by status and date range
- [ ] Sort by date, severity, or status
- [ ] Mark reports as resolved with admin notes

**Note:** Requires reporting mechanism for users (can be simplified button for Sprint 3)

---

### US #23: Admin Activity Log

**Status:** READY | **Priority:** P2 | **Points:** 8

_As an admin, I want to view platform activity logs so that I can monitor system usage and identify potential issues._

**Acceptance Criteria:**

- [ ] Implement activity log tab in admin dashboard
- [ ] Display user activities (logins, registrations, profile updates, requests sent/received)
- [ ] Add filtering by user, date range, and activity type
- [ ] Implement pagination for large log datasets (20-50 entries per page)
- [ ] Add export functionality for activity logs (CSV format)
- [ ] Show timestamp, user, action type, and details for each entry
- [ ] Search functionality for specific users or actions

**Note:** Requires backend logging infrastructure for user activities

---

### US #24: Admin Analytics Dashboard

**Status:** READY | **Priority:** P2 | **Points:** 8

_As an admin, I want to view platform analytics so that I can understand user engagement and platform growth._

**Acceptance Criteria:**

- [ ] Display total user count and growth trend
- [ ] Show registrations over time (daily, weekly, monthly views)
- [ ] Display active users statistics (logged in within last 7/30 days)
- [ ] Add visual charts/graphs for metrics (line charts, bar charts)
- [ ] Show verification completion rate
- [ ] Display total requests sent/accepted/declined
- [ ] Show total matches made
- [ ] Export analytics data as CSV/PDF

**Note:** Consider using Chart.js or Recharts for visualizations

---

## Future Backlog (Post-Release 1.0) 🔮

### US #14: Class Schedule Integration

**Status:** FUTURE | **Priority:** P1 | **Points:** 8

_As a registered user, I want to input my class schedule so that the app can automatically find matches who finish around the same time._

**Acceptance Criteria:**

- [ ] Input class schedule (course times, days, building/campus locations)
- [ ] Parse schedule to determine commute windows
- [ ] Auto-match based on class end times
- [ ] Support multiple schedules (e.g., Mon/Wed/Fri vs Tue/Thu)
- [ ] Integrate with matching algorithm

**Dependencies:** US #2 (Commute Preferences Setup) ✅ Complete

---

### US #5: Advanced Match Filtering

**Status:** FUTURE | **Priority:** P1 | **Points:** 5

_As a registered user, I want to filter potential matches by gender or faculty so that I feel more comfortable choosing a buddy._

**Acceptance Criteria:**

- [ ] Filter by gender (male, female, non-binary, prefer not to say)
- [ ] Filter by faculty/program
- [ ] Filter by year of study
- [ ] Filter by rating/reviews (when implemented)
- [ ] Save filter preferences

**Dependencies:** US #4 (Commute Buddy Matching) ✅ Complete

---

### US #6: Automatic Buddy Suggestions

**Status:** FUTURE | **Priority:** P1 | **Points:** 13

_As a registered user, I want the system to automatically suggest suitable commute buddies based on my schedule and route history._

**Acceptance Criteria:**

- [ ] Algorithm using route overlap and preferences
- [ ] Schedule compatibility matching
- [ ] Historical patterns analysis (past commutes)
- [ ] User preferences integration
- [ ] Daily/weekly suggestion notifications
- [ ] "Dismiss" and "Interested" actions on suggestions

**Dependencies:** US #4 (Commute Buddy Matching) ✅ Complete, US #7 (Commute Request System) ✅ Complete

---

### US #8: In-App Messaging

**Status:** FUTURE | **Priority:** P0 | **Points:** 13

_As a registered user, I want to message my commute buddy directly in the app so that I can coordinate timing and meeting points._

**Acceptance Criteria:**

- [ ] Real-time chat with matched/connected buddies
- [ ] Message history persistence
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Message notifications
- [ ] Only allow messaging with accepted connections
- [ ] Block/report functionality in messages

**Dependencies:** US #7 (Commute Request System) ✅ Complete

**Technical Requirements:** WebSocket or Socket.io for real-time messaging

---

### US #9: Live Location Sharing

**Status:** FUTURE | **Priority:** P1 | **Points:** 13

_As a registered user, I want to share my live location with my commute buddy so that we can meet easily before departure._

**Acceptance Criteria:**

- [ ] Share real-time location with active commute buddy
- [ ] Location sharing duration/session control (start/stop)
- [ ] Map view showing buddy locations
- [ ] Stop sharing when commute ends or manually stopped
- [ ] Privacy: only share with approved connections during active session
- [ ] Battery usage optimization

**Dependencies:** US #7 (Commute Request System) ✅ Complete

**Technical Requirements:** Geolocation API, map library (Google Maps, Mapbox, Leaflet)

---

### US #10: TTC Route & Stop Search

**Status:** FUTURE | **Priority:** P1 | **Points:** 8

_As a registered user, I want to search for TTC bus routes and stops near me so that I can plan my commute more efficiently._

**Acceptance Criteria:**

- [ ] Search bus routes by number or destination
- [ ] Find nearby stops using GPS/location services
- [ ] Display route details and schedules
- [ ] Integration with TTC API/data feed (or static GTFS data)
- [ ] Show next arrival times for stops
- [ ] Save favorite routes/stops

**Technical Requirements:** TTC Open Data, GTFS feed, or third-party transit API

---

### US #11: Group Commutes

**Status:** FUTURE | **Priority:** P2 | **Points:** 13

_As a registered user, I want to join group commutes with more than one person so that I can travel with multiple friends at once._

**Acceptance Criteria:**

- [ ] Create group commute sessions (3+ people)
- [ ] Invite multiple users to group
- [ ] Group chat for coordination
- [ ] View all group members on map (if location sharing enabled)
- [ ] Group schedule coordination
- [ ] Leave/remove from group functionality

**Dependencies:** US #7 (Commute Request System) ✅ Complete, US #8 (In-App Messaging), US #9 (Live Location Sharing)

---

### US #13: Rating & Review System

**Status:** FUTURE | **Priority:** P1 | **Points:** 8

_As a registered user, I want to rate my commute experience after each trip so that the system can improve future matches._

**Acceptance Criteria:**

- [ ] Rate commute buddy after trip (1-5 stars)
- [ ] Optional written feedback/review
- [ ] View ratings on user profiles (average rating)
- [ ] Use ratings in matching algorithm (boost high-rated users)
- [ ] Report inappropriate reviews
- [ ] Admin moderation of reviews

**Dependencies:** US #7 (Commute Request System) ✅ Complete

---

### US #15: Push Notifications

**Status:** FUTURE | **Priority:** P1 | **Points:** 8

_As a registered user, I want to receive notifications when someone matches my route or sends me a request so that I don't miss an opportunity._

**Acceptance Criteria:**

- [ ] New match notifications
- [ ] Incoming request alerts
- [ ] Request accepted/declined notifications
- [ ] Message notifications (when messaging implemented)
- [ ] Commute reminders (30 min before scheduled time)
- [ ] Notification preferences (enable/disable by type)
- [ ] Email and/or push notifications

**Dependencies:** US #4 (Commute Buddy Matching) ✅ Complete, US #7 (Commute Request System) ✅ Complete

**Technical Requirements:** Firebase Cloud Messaging, OneSignal, or similar push notification service

---

### US #16: Favorite Buddies

**Status:** FUTURE | **Priority:** P2 | **Points:** 3

_As a registered user, I want to mark certain people as favorite buddies so that I can easily find and commute with them again._

**Acceptance Criteria:**

- [ ] Mark users as favorites (star/heart icon)
- [ ] Quick access to favorite buddies list
- [ ] Priority matching with favorites (show at top of results)
- [ ] Remove from favorites functionality
- [ ] Favorites section in profile/connections tab

**Dependencies:** US #4 (Commute Buddy Matching) ✅ Complete, US #7 (Commute Request System) ✅ Complete

---

### US #17: Emergency Alert System

**Status:** FUTURE | **Priority:** P0 | **Points:** 13

_As a registered user, I want to have an emergency button during a commute so that I can alert campus security or my contacts if needed._

**Acceptance Criteria:**

- [ ] Emergency button in active commute screen (prominent, red)
- [ ] Alert campus security with location and user info
- [ ] Alert emergency contacts (designated by user)
- [ ] Share location with authorities automatically
- [ ] Option to notify commute buddy
- [ ] Confirmation dialog to prevent accidental triggers
- [ ] Emergency contact management in settings

**Technical Requirements:** SMS API (Twilio), email service, geolocation

**Note:** High priority for safety but complex implementation; post-release

---

### US #19: Commute History

**Status:** FUTURE | **Priority:** P2 | **Points:** 5

_As a registered user, I want to view my past commute sessions so that I can track who I travelled with and when._

**Acceptance Criteria:**

- [ ] View past commute sessions (list with date, buddy, route)
- [ ] See who you travelled with (with profile links)
- [ ] Date/time/route of past commutes
- [ ] Export commute history (CSV format)
- [ ] Filter history by date range or buddy
- [ ] Statistics: total commutes, favorite buddies, most used routes

**Dependencies:** US #7 (Commute Request System) ✅ Complete

---

## Technical Debt & Enhancements

### Technical Debt from Sprint 1-2

**TD #1: Matching Algorithm Optimization**
**Priority:** Medium | **Effort:** 3-4 hours | **Owner:** Ali

- Current: Nested loops in route comparison—O(n²) complexity
- Impact: May slow down with 100+ users
- Fix: Optimize algorithm, add caching, use database indexes

---

**TD #2: Request Schema Database Indexes**
**Priority:** High | **Effort:** 1 hour | **Owner:** Ali

- Current: No indexes on sender/receiver fields in Request collection
- Impact: Query performance will degrade as requests accumulate
- Fix: Add compound indexes on sender/receiver fields

---

**TD #3: Error Handling Standardization**
**Priority:** Medium | **Effort:** 2-3 hours | **Owner:** Shaun

- Current: Inconsistent error formats across API endpoints
- Impact: Inconsistent user experience on errors
- Fix: Standardize error response format; update frontend error handling

---

**TD #4: Privacy Settings Backend Validation**
**Priority:** Low | **Effort:** 1-2 hours | **Owner:** Shaun

- Current: Frontend validation exists but minimal backend validation
- Impact: Could accept invalid values if frontend bypassed
- Fix: Add Joi/Yup validation on backend for privacy endpoints

---

**TD #5: UI Mobile Responsiveness**
**Priority:** Medium | **Effort:** 3-4 hours | **Owner:** Ashraf

- Current: Matching and connections pages not fully mobile-optimized
- Impact: Poor mobile experience on small screens
- Fix: Improve responsive design with Tailwind breakpoints

---

**Total Technical Debt Estimate:** ~12-15 hours (allocate 10% of Sprint 3 capacity)

---

## Enhancements Identified

### Enhancement 1: Match Percentage Breakdown

**Priority:** Low | **Effort:** 2-3 hours

- Show users detailed breakdown of match percentage (why 87%?)
- Improves transparency and trust
- **Decision:** Post-Release 1.0

---

### Enhancement 2: Request Expiration

**Priority:** Low | **Effort:** 2 hours

- Automatically expire pending requests after 7 days
- Prevents stale requests from accumulating
- **Decision:** Sprint 4 or post-release

---

### Enhancement 3: Onboarding Tutorial

**Priority:** Medium | **Effort:** 4-5 hours

- Interactive tutorial for first-time users
- Guide through: preferences setup → finding matches → sending requests
- **Decision:** Post-Release 1.0

---

## Summary

### Story Points by Sprint

- **Sprint 1 (Completed):** 16 points ✅
- **Sprint 2 (Completed):** 34 points ✅
- **Sprint 3 (Planned):** 34 points (admin dashboard) + 5 points (tech debt) = 39 points
- **Future Backlog:** 91 points
- **Total Backlog:** 180 points (183 - 3 technical debt)

### Completion Status

- **Completed Stories:** 8/23 (35%)
- **In Progress:** 0/23
- **Planned Sprint 3:** 5/23 (22%)
- **Future Backlog:** 10/23 (43%)

### Release 1.0 Status

**Target Date:** December 1, 2025 (End of Sprint 3)

**Release 1.0 Scope:**

- ✅ Authentication & User Management (Sprint 1)
- ✅ Core Matching & Coordination (Sprint 2)
- 📋 Admin Dashboard & Moderation (Sprint 3)
- 📋 Technical Debt Resolution (Sprint 3)
- 📋 Final Testing & QA (Sprint 3)

**Post-Release 1.0:**

- Communication features (messaging, notifications)
- Live features (location sharing, emergency alerts)
- Enhancements (class schedule, advanced filters, ratings)

---

## Sprint 3 Priorities

**Must Complete (P0/P1):**

1. US #21: Admin User Management Actions (5 pts)
2. US #25: Admin User Search and Filtering (5 pts)
3. US #22: Admin Reports Dashboard (8 pts)
4. Technical Debt: Request Schema Indexes (TD #2)

**Should Complete (P1/P2):** 5. US #23: Admin Activity Log (8 pts) 6. US #24: Admin Analytics Dashboard (8 pts) 7. Technical Debt: Error Handling Standardization (TD #3) 8. Technical Debt: Matching Algorithm Optimization (TD #1)

**Nice to Have:** 9. Technical Debt: Mobile Responsiveness (TD #5) 10. User feedback integration from Sprint 2 features

**Total Sprint 3 Estimate:** 34-39 points

---

## Notes

- **Sprint 2 Pivot Rationale:** Team prioritized core user features over admin tools to deliver platform value proposition and enable user testing
- **Admin Dashboard Deferred:** Originally planned for Sprint 2; deferred to Sprint 3 without impacting release goals
- **Technical Debt Tracking:** Formalized in Sprint 2 retrospective; will allocate 10% capacity in Sprint 3
- **Sprint 3 Focus:** Complete admin dashboard, resolve technical debt, prepare for Release 1.0 demo

---

**Document Owner:** Ashraf (Product Owner)  
**Last Review:** Sprint 2 Retrospective (November 17, 2025)  
**Next Review:** Sprint 3 Planning (November 19, 2025)  
**Contributors:** Ashraf, Ali, Shaun, Sathmi

---

_This Product Backlog reflects the current state of the Campus Commute Buddy platform after Sprint 2 completion. Sprint 3 will focus on admin dashboard completion and technical debt resolution to achieve Release 1.0 readiness._
