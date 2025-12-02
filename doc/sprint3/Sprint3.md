# Sprint 3 Planning Meeting – Commute Buddy

---

## Meeting Information

**Project Name:** Commute Buddy

**Sprint Number:** Sprint 3

**Date:** November 19, 2025

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

Implement **real-time communication and advanced filtering features** for Commute Buddy that enable verified students to message their commute buddies, receive instant notifications, and find more personalized matches—completing the core platform functionality for Release 1.0.

**Sprint Success Criteria**

- Real-time in-app messaging between connected users using WebSocket technology
- Typing indicators and read receipts for enhanced chat experience
- Message history persistence and retrieval
- Real-time notification system for matches, requests, and messages
- Notification preferences and management
- Advanced filtering by gender, faculty, and year of study
- All real-time features tested for performance and reliability
- System handles concurrent users without performance degradation
- All features integrated with existing authentication and matching systems
- Application builds and runs successfully with Socket.io integration

---

## Sprint 2 Retrospective Review

The team reviewed action items and lessons learned from Sprint 2:

### Action Items Implemented

✅ **Code Freeze Policy:** Implemented 2-day code freeze before sprint end (worked perfectly)  
✅ **Backup/Contingency Planning:** Created backup plans for each role; activated when Shaun had competing deadline  
✅ **User Feedback Sessions:** team members acted as testers and provided input; influenced Sprint 3 feature selection  
✅ **Retrospective Action Tracking:** Trello cards created for all actions; reviewed at this planning meeting

### Key Learnings Applied

- **Proactive Scope Management:** Reduce scope before sprint starts based on capacity, not mid-sprint
- **Daily Integration Maintained:** Continue integrating features daily; no last-minute surprises
- **Code Freeze Effectiveness:** Nov 30 testing-only day prevented bugs in Sprint 2
- **User Feedback Value:** Beta tester input validated feature priorities and UX decisions

---

## Strategic Context: Final Sprint & Release 1.0

### Sprint 3 as Final Course Sprint

**Timeline Context:**

- Sprint 3 ends December 1, 2025 (last day of classes)
- Final demo/presentation: December 1, 2025
- This is the final sprint for EECS 3311 course requirements
- Team plans to continue development post-course informally

**End-of-Semester Considerations:**

- All team members have overlapping final projects, assignments, and exams
- Reduced sprint capacity compared to Sprint 2 due to academic pressure
- Must balance quality delivery with realistic workload expectations
- Focus on demo-ready, user-facing features over backend admin tools

### Feature Selection Rationale

**Originally Planned for Sprint 3 (from Sprint 2 Retrospective):**

- US #21: Admin User Management Actions (5 pts)
- US #22: Admin Reports Dashboard (8 pts)
- US #23: Admin Activity Log (8 pts)
- US #24: Admin Analytics Dashboard (8 pts)
- US #25: Admin User Search and Filtering (5 pts)
- **Total:** 34 points (admin dashboard completion)

**Revised Sprint 3 Plan:**

- US #8: In-App Messaging (13 pts)
- US #15: Push Notifications (8 pts)
- US #5: Advanced Match Filtering (5 pts)
- **Total:** 26 points (communication features)

### Decision Rationale

**Why pivot from admin dashboard to communication features?**

1. **Demo Impact:** Real-time messaging is more impressive and demonstrates technical sophistication; admin dashboard is backend-only

2. **User Value:** Beta testers specifically requested messaging; admin tools only valuable for platform operators

3. **Learning Opportunity:** Socket.io/WebSocket technology provides valuable real-world skill; admin CRUD operations less educational

4. **Platform Completeness:** Messaging completes end-to-end user journey (register → match → request → chat); admin dashboard is operational tool

5. **Technical Challenge:** Team excited to learn real-time programming; motivates through final sprint pressure

6. **Course Requirements:** Demo needs "wow factor" for evaluation; messaging more impressive than admin panel

7. **Post-Course Plans:** Team committed to continuing development; admin dashboard can be completed after course ends

8. **Beta Feedback Priority:** User feedback indicated messaging as #1 requested feature; admin tools not mentioned

**Team Vote:** 4/4 unanimous agreement to prioritize communication features

**Admin Dashboard Status:** Deferred to post-course development; basic viewing from Sprint 1 sufficient for course demo

**Capacity Justification:** 26 points (vs 34 in Sprint 2) accounts for:

- End-of-semester academic pressure (multiple course deadlines)
- Socket.io learning curve (new technology for team)
- Real-time feature complexity (testing, concurrency, edge cases)
- Conservative buffer for unexpected challenges

---

## Team Capacity

| Member | Role                      | Hours | Main Focus                                                                 |
| ------ | ------------------------- | ----- | -------------------------------------------------------------------------- |
| Ashraf | Product Owner / Developer | 25    | Messaging frontend, advanced filtering, UI/UX                              |
| Ali    | Developer                 | 30    | WebSocket infrastructure, real-time systems (reduced due to exam schedule) |
| Shaun  | Developer                 | 25    | Notification system, notification UI, Socket.io client and backend         |
| Sathmi | Developer                 | 10    | Testing, documentation, QA (reduced due to exam schedule)                  |

**Total Capacity:** 90 hours (reduced from 110 in Sprint 2)  
**Utilization:** ~80% (significant buffer for end-of-semester commitments)  
**Velocity Target:** 26 story points

**Risk Acknowledgment:** Team recognizes Sprint 3 coincides with busiest academic period; committed to supporting each other and maintaining quality despite pressure

---

## User Stories Selected for Sprint 3

| Story Title              | Priority | Points | Assignees      |
| ------------------------ | -------- | ------ | -------------- |
| In-App Messaging         | P0       | 13     | Shaun, Ashraf  |
| Push Notifications       | P1       | 8      | Ali, Shaun     |
| Advanced Match Filtering | P1       | 5      | Ashraf, Sathmi |

**Total Story Points:** 26  
**Aligned with:** Product Backlog v3.0 and Release 1.0 goals

---

## Acceptance Criteria (Summary)

### In-App Messaging (US #8)

- [ ] Real-time chat implementation using Socket.io/WebSocket
- [ ] Message schema with sender, receiver, text
- [ ] Chat interface with conversation list and message thread view
- [ ] WebSocket connection management (connect, disconnect, reconnect)
- [ ] Message history persistence in MongoDB
- [ ] Only allow messaging between accepted connections (approved requests)
- [ ] Message notifications when new message received
- [ ] Unread message badges on conversation list
- [ ] Auto-scroll to latest message in conversation
- [ ] Send message on Enter key, new line on Shift+Enter

### Push Notifications (US #15)

- [ ] In-app notification system using Socket.io for real-time updates
- [ ] Notification schema with type, recipient, content
- [ ] GET /api/notifications endpoint to retrieve user notifications
- [ ] PUT /api/notifications/:id/read endpoint to mark notification as read
- [ ] Notification types implemented:
  - New match found
  - Incoming commute request
  - Request accepted
  - Request declined
  - New message received
  - Commute buddy online status (optional)
- [ ] Real-time notification pop-ups (toast notifications)

### Advanced Match Filtering (US #5)

- [ ] Extend User schema with gender and faculty fields
- [ ] Enhanced matching algorithm to support additional filters
- [ ] Filter controls on matching page:
  - Gender filter (Male, Female, Non-binary, Prefer not to say, Any)
  - Faculty filter (Lassonde, Liberal Arts, Science, Health, Education, Glendon, Osgoode, Schulich)
  - Year of study filter (1st year, 2nd year, 3rd year, 4th year+)
- [ ] Filter persistence in session storage (maintain across page refreshes)
- [ ] Clear all filters button
- [ ] Active filter chips showing currently applied filters
- [ ] Filter result count updates in real-time
- [ ] Combination of filters works correctly (AND logic)
- [ ] Privacy consideration: users can choose to hide gender/faculty in privacy settings
- [ ] Filters integrate with existing match percentage algorithm

---

## Tasks Breakdown (Sprint 3)

### In-App Messaging (P0 - 13 points)

**Research & Setup (2-3 days):**

- Research Socket.io documentation and best practices
- Set up Socket.io server with Express integration
- Configure WebSocket connection on client-side (React)
- Create proof-of-concept for basic message sending
- Test WebSocket connection and event handling

**Backend Tasks:**

- Install and configure Socket.io on backend (`npm install socket.io`)
- Create Message schema with fields:
  - `sender` (User ref)
  - `receiver` (User ref)
  - `conversation` (String - generated from user IDs for indexing)
  - `message` (String, max 1000 chars)
  - `read` (Boolean, default false)
  - `createdAt`, `updatedAt` (timestamps)
- Implement Socket.io event handlers:
  - `connection` - user connects to WebSocket
  - `disconnect` - user disconnects
  - `join-conversation` - user joins conversation room
  - `send-message` - user sends message
  - `typing` - user is typing
  - `read-message` - user read message
- Create `POST /api/messages/send` endpoint (REST fallback)
- Create `GET /api/messages/conversation/:userId` endpoint to retrieve history
- Create `PUT /api/messages/:id/read` endpoint to mark message as read
- Implement room management (each conversation = unique room)
- Handle user authentication for Socket.io connections (JWT in handshake)
- Broadcast message to receiver in real-time via Socket.io
- Store message in MongoDB for persistence
- Handle reconnection logic (exponential backoff)
- Test with Postman and Socket.io testing tools

**Frontend Tasks:**

- Install Socket.io client (`npm install socket.io-client`)
- Create Socket.io connection wrapper/hook (useSocket)
- Implement conversation list:
  - Display all accepted connections
  - Display unread badge
- Implement message thread view:
  - Display messages in chronological order
  - Group messages by sender
  - Show message timestamps (relative time)
  - Auto-scroll to bottom on new message
- Create message input component:
  - Text area
  - Send button
  - Enter to send, Shift+Enter for new line
  - Character count (optional, max 1000)
- Implement real-time features:
  - Listen for incoming messages via Socket.io
  - Emit read receipt when message viewed
  - Handle connection/disconnection gracefully

**Assignees:** Shaun (lead - Socket.io backend), Ashraf (frontend & Socket.io client integration)

---

### Push Notifications (P1 - 8 points)

**Backend Tasks:**

- Create Notification schema with fields:
  - `recipient` (User ref)
  - `type` (enum: match, request_received, request_accepted, request_declined, new_message, user_online)
  - `content` (String - notification text)
  - `relatedUser` (User ref, optional - who triggered notification)
  - `relatedItem` (ObjectId, optional - request ID, message ID, etc.)
  - `read` (Boolean, default false)
  - `createdAt` (timestamp)
- Create `PUT /api/notifications/:id/read` endpoint
- Create `PUT /api/notifications/read-all` endpoint
- Integrate notification creation into existing features:
  - Matching algorithm → emit "new match" notification
  - Request system → emit request notifications
  - Message system → emit new message notification
- Implement Socket.io events for real-time notification delivery:
  - `new-notification` - broadcast to user when notification created
- Create notification preferences schema (enable/disable by type)
- Create `PUT /api/users/notification-preferences` endpoint
- Test notification creation and delivery

**Frontend Tasks:**

- Create notification bell icon component in navbar
- Display unread notification count badge
- Build notification dropdown:
  - List of recent notifications (last 10-20)
  - Click to mark as read and navigate to relevant page
  - "Mark all as read" button
  - "View all notifications" link (optional full page)
- Implement toast notification component:
  - Pop-up in top-right corner
  - Auto-dismiss after 5 seconds
  - Click to navigate to relevant page
  - Different icons for different notification types
  - Sound effect option (toggle in settings)
- Create notification preferences page:
  - Toggle switches for each notification type
  - Save preferences to backend
- Integrate Socket.io listener for real-time notifications:
  - Listen for `new-notification` event
  - Update notification count badge
  - Show toast notification
  - Play sound if enabled
- Handle notification clicks:
  - New match → navigate to matching page
  - Request received → navigate to connections page
  - Message → navigate to messaging page with conversation open
- Style notifications with TailwindCSS

**Integration & Testing:**

- Test notification creation triggers from all sources
- Test real-time notification delivery via Socket.io
- Verify toast notifications appear and auto-dismiss
- Test notification preferences save/load correctly
- Verify notification count updates in real-time
- Test navigation from notification to relevant page
- Edge case testing: rapid notifications, many unread
- Manual testing by Sathmi

**Assignees:** Ali (backend integration & Socket.io), Shaun (frontend UI & preferences)

---

### Advanced Match Filtering (P1 - 5 points)

**Backend Tasks:**

- Extend User schema with new fields:
  - `gender` (enum: male, female, non-binary, prefer_not_to_say, optional)
  - `faculty` (enum: lassonde, liberal_arts, science, health, education, glendon, osgoode, schulich, optional)
  - `yearOfStudy` (Number: 1, 2, 3, 4+, optional)
- Update `POST /api/matches/search` endpoint to accept additional filters:
  - `gender` (string, optional)
  - `faculty` (string, optional)
  - `yearOfStudy` (number, optional)
- Modify matching query to filter by these fields (AND logic with existing filters)
- Ensure privacy settings respected (users can hide gender/faculty)
- Update user profile endpoints to save new fields
- Test filtering combinations with Postman

**Frontend Tasks:**

- Add gender, faculty, year fields to user profile/preferences page
- Create advanced filter controls on matching page:
  - Gender dropdown (with "Any" option)
  - Faculty dropdown (with "Any" option)
  - Year of study dropdown (with "Any" option)
- Implement filter UI:
  - Collapsible "Advanced Filters" section
  - Active filter chips showing applied filters
  - Clear individual filter (X button on chip)
  - Clear all filters button
- Store active filters in session storage (persist across refreshes)
- Update match results in real-time as filters applied
- Display result count: "42 matches found"
- Handle no results state: "No matches found with these filters"
- Integrate with existing route/area/time filters
- Style with TailwindCSS

**Integration & Testing:**

- Test each filter individually
- Test combination of multiple filters
- Verify filter persistence across page refreshes
- Test clear filters functionality
- Verify privacy enforcement (hidden fields not searchable)
- Test with various user data combinations
- Manual testing by Sathmi

**Assignees:** Ashraf (lead - backend & frontend), Sathmi (testing & documentation)

---

## Technical Spikes

| Spike                       | Focus                                     | Owner  | Duration | Outcome                                           |
| --------------------------- | ----------------------------------------- | ------ | -------- | ------------------------------------------------- |
| Socket.io Research          | WebSocket basics, Socket.io patterns      | Shaun  | 4 h      | Understanding of connection management and events |
| Real-Time Architecture      | Scaling WebSocket, room management        | Shaun  | 3 h      | Architecture design for messaging system          |
| Socket.io Authentication    | JWT integration with Socket.io handshake  | Ali    | 2 h      | Authentication flow for WebSocket connections     |
| Notification UI Patterns    | Toast notifications, badge design         | Ashraf | 2 h      | UI/UX design for notification system              |
| Advanced Filter Integration | Query optimization with multiple filters  | Ashraf | 2 h      | Efficient database queries for combined filters   |
| Real-Time Testing Strategy  | Concurrency testing, WebSocket test tools | Sathmi | 2 h      | Test scenarios for real-time features             |

---

## Key Decisions Made During Planning

**Strategic Decisions:**

1. ✅ **Feature Pivot Approved (Again):** Unanimously agreed to defer admin dashboard again; prioritize communication features

   - **Rationale:** Demo impact, user value, learning opportunity, platform completeness

2. ✅ **Reduced Sprint Capacity:** 26 points (vs 34 in Sprint 2) due to end-of-semester pressure

   - **Rationale:** Multiple course deadlines Nov 26-Dec 1; Socket.io learning curve; realistic expectations

3. ✅ **Socket.io Over Simpler Alternatives:** Chose WebSocket technology despite complexity

   - **Rationale:** Real-time features require real-time tech; valuable learning; impressive for demo

4. ✅ **In-App Notifications Only:** No email or SMS notifications; Socket.io-based only
   - **Rationale:** Scope control; email/SMS requires external services and costs

**Technical Decisions:**

5. ✅ **Message Persistence:** Store all messages in MongoDB, not just relay via Socket.io

   - **Rationale:** Message history required; offline users need to catch up

6. ✅ **Room-Based Messaging:** Each conversation = unique Socket.io room

   - **Rationale:** Efficient message targeting; scalability; standard Socket.io pattern

7. ✅ **Advanced Filtering Simplicity:** Gender, faculty, year only (no complex multi-criteria)
   - **Rationale:** 5-point story; time constraints; covers most common use cases

**Process Decisions:**

8. ✅ **Code Freeze Nov 30:** Strict no-new-code policy on final day

   - **Rationale:** Learned from Sprint 2; testing-only day prevents last-minute bugs

9. ✅ **Socket.io Research First:** Ali dedicates Nov 19-21 to research before coding

   - **Rationale:** Reduce mid-sprint surprises; understand technology before commitment

10. ✅ **Pair Programming for Socket.io:** Shaun + Ashraf pair on messaging implementation

    - **Rationale:** Knowledge transfer; faster learning; better code quality

11. ✅ **Concurrent User Testing:** Test with 5-10 simultaneous users before code freeze

    - **Rationale:** Real-time features need concurrency validation; catch performance issues

12. ✅ **Flexible Work Hours:** No mandatory hours; work when available
    - **Rationale:** Academic pressure varies by person; trust and flexibility reduce stress

---

**Document Version:** 1.0

**Created:** November 19, 2025

**Last Updated:** November 19, 2025

**Related Documents:**

- Sprint 2 Retrospective (SR2.md) - Nov 17, 2025
- Product Backlog (PB.md) - Version 3.0
- Release Planning Meeting (RPM.md) - Oct 15, 2025

---

_This document serves as the official record of the Sprint 3 Planning Meeting and defines the scope, responsibilities, and workflow for Sprint 3 of the Commute Buddy project. The team commits to learning from Sprint 2 experiences and implementing improved practices for continued success._

---
