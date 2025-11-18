# Sprint 2 Planning Meeting – Commute Buddy

---

## Meeting Information

**Project Name:** Commute Buddy

**Sprint Number:** Sprint 2

**Date:** November 5, 2025

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

Implement **core matching and coordination features** for Campus Commute Buddy that enable verified students to set up preferences, find compatible commute buddies, send/manage requests, and control their privacy settings—delivering the platform's primary value proposition.

**Sprint Success Criteria**

- Users can set up commute preferences (home area, routes, schedule)
- Matching algorithm finds compatible buddies based on routes and preferences
- Match percentage calculated based on route similarity and user statistics
- Users can send, accept, and decline commute requests with custom messages
- Request management system tracks pending, approved, and declined requests
- Privacy settings allow users to control profile visibility and data sharing
- Profile management enables users to update personal details and change passwords
- All features integrated with existing authentication system
- System builds and runs successfully with MongoDB
- All tasks tracked on Trello and meet Definition of Done

---

## Sprint 1 Retrospective Review

The team reviewed action items and lessons learned from Sprint 1:

### Action Items Implemented

✅ **Better Time Estimation:** Accounted for external workload; planned 34 points vs 20 in Sprint 1  
✅ **Mid-Sprint Check-in:** Scheduled for Nov 11 to catch blockers early  
✅ **Definition of Done Checklist:** Created and will be applied to all stories  
✅ **Capacity Planning:** Planned 85% utilization with buffer for academic commitments  
✅ **Earlier Testing:** Sathmi assigned testing role from start; incremental testing approach  
✅ **Documentation as We Go:** Each developer documents their work during development

### Key Learnings Applied

- **Tackle Complex Tasks Early:** Matching algorithm and request system prioritized at sprint start
- **Daily Integration:** Features will be integrated continuously, not saved for sprint end
- **Realistic Capacity:** Total capacity adjusted to 110 hours (vs 120) to account for ongoing coursework
- **Clear Communication:** Daily async standups + 5 scheduled sync calls

---

## Strategic Pivot: Feature Selection Rationale

### Original Sprint 2 Plan (from SR1.md)

Sprint 1 Retrospective identified admin dashboard completion stories:

- US #21: Admin User Management Actions
- US #22: Admin Reports Dashboard
- US #23: Admin Activity Log
- US #24: Admin Analytics Dashboard
- US #25: Admin User Search and Filtering

### Revised Sprint 2 Plan

After Sprint 1 retrospective discussion, **the team unanimously decided to pivot** to core user-facing features:

- US #2: Commute Preferences Setup
- US #4: Commute Buddy Matching
- US #7: Commute Request System
- US #18: Privacy Settings

### Decision Rationale

**Why the change?**

1. **Platform Value Proposition:** Sprint 1 delivered authentication, but platform has no user-facing functionality yet. Admin tools don't demonstrate core value.

2. **Demo Requirements:** Need working end-to-end user journey for course evaluation—students registering, setting preferences, finding matches, and connecting.

3. **User Feedback Priority:** Beta testers need core features to test platform viability; admin tools are backend-only.

4. **Technical Dependencies:** Matching and request features unlock future development (messaging, location sharing); admin dashboard is independent.

5. **Team Motivation:** Developers more excited to build user-facing features that showcase platform capabilities.

6. **Release Goal Alignment:** Originally planned "Authentication + Admin Tools + Core Matching" for Release 1.0—shifting admin dashboard to Sprint 3 still meets release goals.

**Team Vote:** 4/4 unanimous agreement to prioritize user features

**Admin Dashboard Status:** Deferred to Sprint 3; basic viewing functionality from Sprint 1 sufficient for current needs

---

## Team Capacity

| Member | Role                      | Hours | Main Focus                                              |
| ------ | ------------------------- | ----- | ------------------------------------------------------- |
| Ashraf | Product Owner / Developer | 30    | Commute preferences setup, backend integration, UI/UX   |
| Ali    | Developer                 | 30    | Matching algorithm, request system, backend controllers |
| Shaun  | Developer                 | 30    | Privacy settings, profile management, request frontend  |
| Sathmi | Developer                 | 20    | Testing, QA, documentation, code review                 |

**Total Capacity:** 110 hours  
**Utilization:** ~85% (buffer for coursework)  
**Velocity Target:** 34 story points

---

## User Stories Selected for Sprint 2

| Story Title               | Priority | Points | Assignees      |
| ------------------------- | -------- | ------ | -------------- |
| Commute Preferences Setup | P0       | 8      | Ashraf, Sathmi |
| Commute Buddy Matching    | P0       | 13     | Ali, Shaun     |
| Commute Request System    | P0       | 8      | Ali, Ashraf    |
| Privacy Settings          | P1       | 5      | Shaun, Sathmi  |

**Total Story Points:** 34  
**Aligned with:** Product Backlog v2.0 and Release 1.0 goals

---

## Acceptance Criteria (Summary)

### Commute Preferences Setup (US #2)

- [ ] Users can input home area with dropdown/input field
- [ ] Campus schedule configuration by days and time ranges
- [ ] Select preferred bus routes from available options
- [ ] Save and update preferences in user profile
- [ ] Preferences persist and display correctly on profile page
- [ ] Frontend validates all required fields
- [ ] Preferences accessible via API endpoints

### Commute Buddy Matching (US #4)

- [ ] Search for users by route, start area, and commute time
- [ ] Display match percentage (0-100%) based on compatibility
- [ ] Calculate match % using route similarity, area, time, schedule
- [ ] View potential buddy profiles with relevant information
- [ ] Filter results by route, area, time range, match percentage
- [ ] Show "no matches found" when no compatible users exist
- [ ] Matching respects privacy settings (visibility controls)
- [ ] Results display in clean, organized card/list format

### Commute Request System (US #7)

- [ ] Send commute request with custom text message to other users
- [ ] Accept or decline incoming requests with status updates
- [ ] View all sent requests with status (pending, approved, declined)
- [ ] View all received requests with action buttons
- [ ] Connections tab shows summary of all requests by status
- [ ] Create request directly if email/username is known
- [ ] Request status updates reflect immediately in UI
- [ ] Prevent duplicate requests to same user
- [ ] Email/username search validates user exists

### Privacy Settings (US #18)

- [ ] Control profile visibility (public/connections only/private)
- [ ] Toggle route details visibility to other users
- [ ] Control who can send requests (everyone/connections/nobody)
- [ ] Update personal details (name, email, gender)
- [ ] Change password with current password verification
- [ ] Select and save user interests (tags/chips)
- [ ] Select and save bus routes on profile
- [ ] Privacy preferences persist and enforce in queries
- [ ] Form validation for all inputs
- [ ] Success/error feedback for all actions

---

## Tasks Breakdown (Sprint 2)

### Commute Preferences Setup (P0 - 8 points)

**Backend Tasks:**

- Extend User schema with fields: `homeArea`, `schedule`, `preferredRoutes`, `commuteTime`
- Create `PUT /api/users/preferences` endpoint to save preferences
- Create `GET /api/users/preferences` endpoint to retrieve user preferences
- Implement bus routes data structure in MongoDB
- Validate preference inputs (required fields, data types)
- Test API endpoints with Postman

**Frontend Tasks:**

- Build Preferences Setup page (React + TailwindCSS)
- Create home area input component (text input or dropdown)
- Implement schedule selector UI (day checkboxes + time inputs)
- Add bus route multi-select component
- Connect forms to backend API endpoints
- Display saved preferences on profile page
- Handle loading, success, and error states
- Add form validation messages

**Integration & Testing:**

- Test preference save/retrieve flow end-to-end
- Verify data persistence in MongoDB
- Test schedule and route selection UI/UX
- Manual testing by Sathmi

**Assignees:** Ashraf (lead), Sathmi (testing/documentation)

---

### Commute Buddy Matching (P0 - 13 points)

**Backend Tasks:**

- Design matching algorithm with weighted factors:
  - Route overlap: 40%
  - Start area proximity: 20%
  - Commute time compatibility: 20%
  - Schedule overlap: 20%
- Create `POST /api/matches/search` endpoint with query filters
- Implement match percentage calculation function
- Build filtering logic (route, area, time, match %)
- Integrate privacy settings into matching queries
- Optimize database queries for performance
- Test algorithm with various user combinations

**Frontend Tasks:**

- Build Matching/Search page with filter panel
- Create filter controls (route, start area, time, match % slider)
- Display match results in card format with key info
- Show match percentage prominently with visual indicator
- Implement profile preview/modal for each match
- Add sorting options (match %, name, recent)
- Show "no matches" empty state
- Handle loading and error states

**Algorithm Development:**

- Calculate route similarity score (Jaccard similarity or overlap %)
- Implement distance/proximity calculation for start areas
- Compare time windows for compatibility
- Weight factors and normalize to 0-100% scale
- Test edge cases (identical users, no overlap, partial matches)

**Integration & Testing:**

- Test matching with real user data
- Verify match percentage accuracy
- Test all filter combinations
- Validate privacy enforcement
- Performance testing with 50+ users
- Manual testing by Sathmi

**Assignees:** Ali (lead - algorithm & backend), Shaun (frontend & integration)

---

### Commute Request System (P0 - 8 points)

**Backend Tasks:**

- Create Request schema with fields:
  - `sender` (User ref)
  - `receiver` (User ref)
  - `message` (String)
  - `status` (enum: pending, approved, declined)
  - `createdAt`, `updatedAt` (timestamps)
- Implement `POST /api/requests/send` endpoint
- Implement `PUT /api/requests/:id/accept` endpoint
- Implement `PUT /api/requests/:id/decline` endpoint
- Create `GET /api/requests/sent` endpoint (user's sent requests)
- Create `GET /api/requests/received` endpoint (user's received requests)
- Create `GET /api/requests/connections` endpoint (summary view)
- Add validation: prevent duplicate active requests
- Add validation: verify receiver exists
- Test all endpoints with Postman

**Frontend Tasks:**

- Build Connections tab with three sections:
  - Pending requests
  - Approved connections
  - Declined requests
- Create "New Request" modal/page with:
  - User search by email/username
  - Message text area
  - Send button
- Display sent requests list with status badges
- Display received requests with Accept/Decline buttons
- Implement real-time status updates after actions
- Add request count indicators
- Handle empty states for each section
- Show success/error notifications

**Integration & Testing:**

- Test request creation flow end-to-end
- Verify accept/decline updates status correctly
- Test duplicate request prevention
- Validate user search functionality
- Test edge cases (non-existent user, self-request)
- Manual testing by Sathmi

**Assignees:** Ali (backend lead), Ashraf (frontend support), Shaun (UI/UX)

---

### Privacy Settings (US #18 - 5 points)

**Backend Tasks:**

- Extend User schema with privacy fields:
  - `profileVisibility` (enum: public, connectionsOnly, private)
  - `routeVisibility` (boolean)
  - `allowRequests` (enum: everyone, connectionsOnly, nobody)
  - `interests` (array of strings)
- Create `PUT /api/users/privacy` endpoint
- Implement `PUT /api/users/profile` endpoint for personal details
- Create `PUT /api/users/change-password` endpoint
  - Verify current password with bcrypt
  - Hash new password
  - Validate password strength
- Implement privacy enforcement in matching queries
- Validate email uniqueness on update
- Test all endpoints

**Frontend Tasks:**

- Build Privacy Settings page with sections:
  - Profile Visibility toggle/dropdown
  - Route Visibility toggle
  - Request Permissions dropdown
- Create Profile Management page:
  - Personal details form (name, email, gender)
  - Change password section (current, new, confirm)
  - Interests input (tags/chips component)
  - Bus routes multi-select
- Implement client-side validation:
  - Email format
  - Password strength (min 8 chars, complexity)
  - Confirm password match
- Connect all forms to backend APIs
- Display current settings on page load
- Show success/error feedback messages
- Add confirmation dialog for password change

**Security & Validation:**

- Verify current password before allowing change
- Ensure email uniqueness when updating
- Hash passwords with bcrypt (backend)
- Enforce privacy settings in all relevant queries

**Integration & Testing:**

- Test privacy setting updates and enforcement
- Verify profile updates save correctly
- Test password change with correct/incorrect current password
- Validate email update conflicts
- Test interests and bus routes save
- Verify privacy enforcement in matching results
- Manual security testing by Sathmi

**Assignees:** Shaun (lead), Sathmi (testing/documentation)

---

## Technical Spikes

| Spike                     | Focus                                  | Owner  | Duration | Outcome                                        |
| ------------------------- | -------------------------------------- | ------ | -------- | ---------------------------------------------- |
| Matching Algorithm Design | Calculate match % and route similarity | Ali    | 4 h      | Weighted algorithm with 4 factors defined      |
| Request State Management  | Status transitions and validation      | Ali    | 2 h      | Status enum and business rules documented      |
| Privacy Query Enforcement | Filter queries by privacy settings     | Shaun  | 3 h      | Middleware and query modifications planned     |
| Password Change Security  | Secure validation and bcrypt flow      | Shaun  | 2 h      | Security measures and validation rules defined |
| Schedule UI/UX            | Intuitive schedule selection interface | Ashraf | 3 h      | Component design and user flow finalized       |
| Testing Strategy          | Comprehensive test plan for Sprint 2   | Sathmi | 2 h      | Test scenarios and edge cases documented       |

---

## Definition of Done

A story is **DONE** when:

- ✅ Code meets all acceptance criteria listed in this document
- ✅ Code reviewed and approved by at least one team member
- ✅ Merged to main branch via pull request
- ✅ Application builds and runs without errors
- ✅ Manual testing completed and passed (Sathmi)
- ✅ API endpoints documented (for backend work)
- ✅ User-facing documentation updated (for frontend work)
- ✅ No critical or high-priority bugs remaining
- ✅ Demo-ready and presentable

**Quality Gates:**

- Backend: Postman tests passing
- Frontend: UI responsive and accessible
- Integration: End-to-end user flow working
- Documentation: README and API docs current

---

## Development Practices

**Workflow:** Product Backlog → Sprint 2 Backlog → In Progress → Code Review → Testing / QA → Done

**Key Improvements from Sprint 1:**

✅ **Mid-Sprint Check-in:** Nov 11 scheduled to assess progress and identify blockers  
✅ **Continuous Integration:** Features integrated daily, not deferred to sprint end  
✅ **Incremental Testing:** Sathmi tests features as they complete, not all at once  
✅ **Documentation During Development:** Developers write docs while coding  
✅ **Capacity Awareness:** Realistic 85% utilization with coursework buffer  
✅ **Definition of Done:** Applied rigorously to prevent premature completion

**Technical Practices:**

- **Branching:** `feature/sprint2-<description>` (e.g., `feature/sprint2-matching-algorithm`)
- **Commits:** Clear, descriptive messages; logical, atomic commits
- **Reviews:** Peer review within 24-48 hours; Sathmi conducts QA review
- **Testing:**
  - Manual testing by Sathmi for all features
  - Developers test their own work before review
  - Integration testing during mid-sprint check-in
- **Tools:** GitHub, Trello, Postman, VS Code, MongoDB Compass, WhatsApp (standups)

**Communication:**

- Daily async standups via WhatsApp (What done? What next? Blockers?)
- 5 scheduled sync video calls throughout sprint
- Ad-hoc pairing sessions as needed
- Mid-sprint formal check-in (Nov 11)

---

## Sprint Schedule

| Date          | Focus                   | Deliverables                                                      | Milestone                   |
| ------------- | ----------------------- | ----------------------------------------------------------------- | --------------------------- |
| **Nov 5**     | Sprint Kickoff          | Tasks assigned, repos cloned, initial setup                       | Sprint Planning Complete    |
| **Nov 5-8**   | Backend Foundation      | Schemas extended, API endpoints created, algorithm design started | Backend scaffolding done    |
| **Nov 8-11**  | Core Development        | Matching algorithm implemented, preferences UI built              | 50% progress checkpoint     |
| **Nov 11**    | **Mid-Sprint Check-in** | **Progress review, blocker resolution, scope validation**         | **Formal sync meeting**     |
| **Nov 11-14** | Frontend & Integration  | Request system UI, privacy settings, feature integration          | Features nearing completion |
| **Nov 14-16** | Testing & Refinement    | Sathmi testing, bug fixes, edge case handling                     | QA phase                    |
| **Nov 16-17** | Documentation & Demo    | Docs finalized, demo prepared, retrospective meeting              | Sprint 2 Complete           |
| **Nov 17**    | Sprint Review & Retro   | Demo to stakeholders, retrospective discussion                    | Sprint 2 Closed             |

---

## Standups (Scheduled)

**Format:** Daily async updates via WhatsApp + 5 scheduled sync video calls

**Scheduled Sync Standups:**

1. **Nov 5 (2:00 PM)** – Sprint kickoff and initial task assignment ✓
2. **Nov 8 (8:00 PM)** – Progress check, early blocker identification
3. **Nov 11 (2:00 PM)** – **Mid-sprint check-in (formal meeting)**
4. **Nov 14 (8:00 PM)** – Integration status and testing coordination
5. **Nov 17 (2:00 PM)** – Final testing, demo prep, retrospective

**Daily Async Updates Template:**

- ✅ **Completed:** What did you finish yesterday?
- 🔄 **Today:** What will you work on today?
- 🚫 **Blockers:** Any obstacles or help needed?

---

## Sprint Tracking

All Sprint 2 work is tracked on our Trello board:

**Board Name:** Project Commute Buddy – EECS 3311

**Workflow Columns:**  
Product Backlog → Sprint 2 Backlog → In Progress → Code Review → Testing / QA → Done

**Sprint 2 Backlog Cards:**

| Feature Area             | Trello Card Name          | Related Story | Assignees      | Priority |
| ------------------------ | ------------------------- | ------------- | -------------- | -------- |
| User Profile & Prefs     | Commute Preferences Setup | US #2         | Ashraf, Sathmi | P0       |
| Matching & Discovery     | Commute Buddy Matching    | US #4         | Ali, Shaun     | P0       |
| Communication & Requests | Commute Request System    | US #7         | Ali, Ashraf    | P0       |
| Privacy & Profile Mgmt   | Privacy Settings          | US #18        | Shaun, Sathmi  | P1       |

**Card Details:**

- Each card includes full acceptance criteria checklist
- Subtasks for backend, frontend, testing, documentation
- Definition of Done checklist must be completed
- Labels: Priority (P0/P1), Type (Backend/Frontend/Testing/Docs), Status

**Tracking Metrics:**

- Story points burndown tracked daily
- Velocity calculated at sprint end
- Completion % visible on Trello board
- Blockers tagged and escalated immediately

---

## Risk Management

### Identified Risks & Mitigation

| Risk                                | Probability | Impact | Mitigation Strategy                                         |
| ----------------------------------- | ----------- | ------ | ----------------------------------------------------------- |
| Matching algorithm more complex     | Medium      | High   | Technical spike completed; Ali leads with Shaun backup      |
| Request system edge cases           | Medium      | Medium | Comprehensive testing by Sathmi; validation rules strict    |
| Privacy enforcement bugs            | Low         | High   | Code review focused on security; thorough manual testing    |
| Integration challenges              | Low         | Medium | Daily integration approach; mid-sprint check-in validates   |
| Academic workload (midterms, exams) | High        | Medium | 85% capacity utilization; buffer built into estimates       |
| Team member illness/unavailability  | Low         | Medium | Cross-training; pair programming; documentation current     |
| Scope creep during development      | Medium      | Medium | Strict adherence to acceptance criteria; no ad-hoc features |

### Contingency Plans

- **If matching algorithm needs more work:** Simplify initial version (basic route overlap only); enhance in Sprint 3
- **If request system becomes complex:** Defer advanced features (expiration, reminders) to future sprint
- **If testing reveals major issues:** Extend sprint by 1-2 days with team consensus; reschedule demo
- **If team member unavailable:** Remaining members cover critical work; adjust scope if needed
- **If mid-sprint check-in shows <50% completion:** Reduce scope by deferring Privacy Settings (US #18) to Sprint 3

---

## Dependencies

### External Dependencies

- ✅ MongoDB database running and accessible
- ✅ Authentication system from Sprint 1 functioning correctly
- ⚠️ Bus routes data available (will hardcode initial list if needed)
- ✅ Development environment set up for all team members

### Internal Dependencies

- **Preferences → Matching:** Matching algorithm requires user preferences data
- **Matching → Requests:** Request system benefits from matching, but can function independently
- **Privacy → Matching:** Privacy settings must enforce in matching queries
- **All features → Authentication:** All features depend on Sprint 1 auth system

### Dependency Management

- Preferences and matching developed in parallel with coordination
- Ali coordinates between request system and matching integration
- Privacy settings integrated incrementally as features complete
- Daily standups identify and resolve dependency blockers

---

## Key Decisions Made During Planning

**Strategic Decisions:**

1. ✅ **Feature Pivot Approved:** Unanimously agreed to defer admin dashboard to Sprint 3 and prioritize user-facing features

   - **Rationale:** Deliver platform value proposition; needed for demo and user testing

2. ✅ **Simplified Matching Algorithm:** Initial version focuses on route similarity and basic stats; advanced ML/historical patterns deferred

   - **Rationale:** Complexity management; 13 story points already substantial

3. ✅ **Basic Request Notifications:** In-app status updates only; push notifications (US #15) deferred

   - **Rationale:** Scope control; push notifications require external service integration

4. ✅ **Incremental Privacy Enforcement:** Privacy settings enforced in matching queries; full enforcement across all features by Sprint 3
   - **Rationale:** Phased rollout reduces integration complexity

**Technical Decisions:**

5. ✅ **Match Percentage Weighting:**

   - Route overlap: 40%
   - Start area proximity: 20%
   - Commute time compatibility: 20%
   - Schedule overlap: 20%
   - **Rationale:** Route most important; other factors support

6. ✅ **Request Status Enum:** `pending`, `approved`, `declined` (no `expired` or `cancelled` initially)

   - **Rationale:** Simplicity; can extend in future sprints

7. ✅ **Sathmi's Role:** Focused on testing, QA, documentation, code review
   - **Rationale:** Leverage her strengths; ensure quality; sustainable workload

**Process Decisions:**

8. ✅ **Mid-Sprint Check-in Mandatory:** Nov 11 formal sync meeting to validate progress

   - **Rationale:** Learned from Sprint 1; catch issues early

9. ✅ **Daily Integration:** Features merged and integrated daily, not at sprint end

   - **Rationale:** Avoid last-minute integration chaos from Sprint 1

10. ✅ **Definition of Done Strict Enforcement:** No story marked done without meeting all DoD criteria
    - **Rationale:** Prevent incomplete work accumulation

---

## Success Metrics

Sprint 2 will be considered **successful** if:

### Functional Completeness

- ✅ All 4 user stories (US #2, #4, #7, #18) meet acceptance criteria
- ✅ 34 story points completed (100% of planned capacity)
- ✅ All features integrated and working end-to-end
- ✅ Zero critical bugs at sprint end; < 3 medium-priority bugs

### Quality Metrics

- ✅ 100% code review coverage (all PRs reviewed and approved)
- ✅ Manual testing completed by Sathmi for all features
- ✅ Documentation complete and up-to-date (README, API docs)
- ✅ Application builds and deploys without errors
- ✅ No security vulnerabilities identified

### Process Metrics

- ✅ Mid-sprint check-in conducted on Nov 11
- ✅ Daily standups maintained (async updates + 5 sync calls)
- ✅ Definition of Done applied and verified for all stories
- ✅ Sprint 1 retrospective action items addressed
- ✅ No major scope changes after Nov 11 mid-sprint check-in

### Team Metrics

- ✅ Team morale remains positive
- ✅ Collaboration and communication maintained
- ✅ All team members contribute meaningfully
- ✅ Workload fairly distributed (adjusted for Sathmi's testing role)
- ✅ No team member overworked or burned out

### Demo Readiness

- ✅ End-to-end user journey demo-able:
  1. Register → Login
  2. Set preferences
  3. Find matches
  4. Send/receive requests
  5. Manage privacy settings
- ✅ Demo script prepared
- ✅ Test data seeded in database

---

## Approval & Sign-Off

| Name   | Role                        | Signature               | Date        |
| ------ | --------------------------- | ----------------------- | ----------- |
| Ashraf | Product Owner / Facilitator | Mohammed Ashraful Islam | Nov 5, 2025 |
| Ali    | Developer                   | Ali Nategh              | Nov 5, 2025 |
| Shaun  | Developer                   | Shaun Fernando          | Nov 5, 2025 |
| Sathmi | Developer                   | Sathmi Kurukulasooriya  | Nov 5, 2025 |

**Team Commitment:**

All team members commit to:

- Adhering to the Definition of Done
- Communicating blockers immediately
- Supporting each other to achieve sprint goals
- Applying lessons learned from Sprint 1
- Participating in mid-sprint check-in and retrospective
- Delivering high-quality, working software

---

**Document Version:** 1.0

**Created:** November 5, 2025

**Last Updated:** November 5, 2025

**Related Documents:**

- Sprint 1 Retrospective (SR1.md) - Nov 3, 2025
- Product Backlog (PB.md) - Version 2.0
- Release Planning Meeting (RPM.md) - Oct 15, 2025

---

_This document serves as the official record of the Sprint 2 Planning Meeting and defines the scope, responsibilities, and workflow for Sprint 2 of the Campus Commute Buddy project. The team commits to learning from Sprint 1 experiences and implementing improved practices for continued success._

---
