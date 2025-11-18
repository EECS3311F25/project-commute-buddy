# Sprint 2 Retrospective Meeting (SR2.md)

## Meeting Information

**Sprint:** Sprint 2  
**Date:** November 17, 2025  
**Time:** 2:00 PM  
**Duration:** 1 hour  
**Location/Platform:** WhatsApp Video Call  
**Note Taker:** Sathmi

---

## Participants

| Name   | Role                   | Attendance |
| ------ | ---------------------- | ---------- |
| Ashraf | Product Owner          | ✓ Present  |
| Shaun  | Developer              | ✓ Present  |
| Ali    | Developer              | ✓ Present  |
| Sathmi | Developer & Note Taker | ✓ Present  |

**Participation Rate:** 4/4 (100%)

---

## Sprint 2 Overview

**Sprint Goal:** Implement core matching and coordination features for the Campus Commute Buddy platform.

**Planned Features:**
1. ✅ Commute Preferences Setup (US #2) - **COMPLETED**
2. ✅ Commute Buddy Matching (US #4) - **COMPLETED**
3. ✅ Commute Request System (US #7) - **COMPLETED**
4. ✅ Privacy Settings (US #18) - **COMPLETED**

**Sprint Duration:** November 5 - November 17, 2025 (12 days)

---

## Completed Work

### Feature 1: Commute Preferences Setup (US #2) ✅
**Status:** Fully Implemented  
**Story Points:** 8

**Completed Stories:**
- US #2: Set up commuting preferences

**Deliverables:**
- User preference schema with homeArea, schedule, preferredRoutes, commuteTime
- PUT /api/users/preferences and GET /api/users/preferences endpoints
- Preferences setup page with home area input, schedule selector, and bus route selection
- Preferences display on user profile page
- Form validation and error handling
- Data persistence in MongoDB

**Key Achievement:** Intuitive schedule selector UI that made preference setup smooth and user-friendly

---

### Feature 2: Commute Buddy Matching (US #4) ✅
**Status:** Fully Implemented  
**Story Points:** 13

**Completed Stories:**
- US #4: Find other students taking the same bus or route

**Deliverables:**
- Matching algorithm with weighted factors:
  - Route overlap: 40%
  - Start area proximity: 20%
  - Commute time compatibility: 20%
  - Schedule overlap: 20%
- POST /api/matches/search endpoint with query filters
- Match percentage calculation (0-100%)
- Matching page with filter controls (route, area, time, match %)
- Match results displayed in card format with key information
- Privacy settings enforcement in matching queries
- "No matches found" empty state
- Profile preview for each match

**Key Achievement:** Matching algorithm works accurately and efficiently; match percentages make sense to users

---

### Feature 3: Commute Request System (US #7) ✅
**Status:** Fully Implemented  
**Story Points:** 8

**Completed Stories:**
- US #7: Send and receive commute requests

**Deliverables:**
- Request schema with sender, receiver, message, status, timestamps
- API endpoints: send, accept, decline, get sent, get received, get connections
- Connections tab with three sections (pending, approved, declined)
- New request creation with user search by email/username
- Accept/Decline functionality with real-time status updates
- Duplicate request prevention
- Request count indicators
- Success/error notifications

**Key Achievement:** Request workflow is smooth and intuitive; status updates work instantly

---

### Feature 4: Privacy Settings (US #18) ✅
**Status:** Fully Implemented  
**Story Points:** 5

**Completed Stories:**
- US #18: Control profile visibility and privacy settings

**Deliverables:**
- Privacy fields in User schema (profileVisibility, routeVisibility, allowRequests)
- PUT /api/users/privacy, PUT /api/users/profile, PUT /api/users/change-password endpoints
- Privacy Settings page with visibility toggles and request permissions
- Profile Management page with personal details form
- Change password functionality with current password verification
- Interests and bus routes selection on profile
- Privacy enforcement in matching queries
- Form validation and confirmation dialogs
- Success/error feedback messages

**Key Achievement:** Comprehensive privacy controls give users confidence in platform safety

---

## Sprint Metrics

### Velocity & Burndown
- **Planned Story Points:** 34
- **Completed Story Points:** 34
- **Velocity:** 100% of planned capacity ✅
- **Burndown:** Steady progress first week; slight slowdown mid-sprint (Nov 11-13); strong finish in final days

### Team Capacity
- **Planned Hours:** 110 hours
- **Actual Hours:** ~105 hours
- **Utilization:** ~95%
- **Lost Capacity:** ~5 hours due to Sathmi's illness mid-sprint

### Completion Rate
- **Stories Completed:** 4/4 (100%)
- **Acceptance Criteria Met:** 100%
- **Critical Bugs:** 0
- **Medium Bugs:** 2 (both fixed before sprint end)

---

## Unforeseen Challenges

### Major Challenge: Sathmi's Illness (Mid-Sprint)

**Timeline:**
- **Nov 11-13:** Sathmi fell ill with flu symptoms
- **Impact:** Unable to participate in mid-sprint check-in on Nov 11; limited availability for 2-3 days

**Team Response:**
- ✅ Team rallied together and redistributed testing workload
- ✅ Ashraf and Shaun conducted additional manual testing
- ✅ Ali took over documentation for request system temporarily
- ✅ Mid-sprint check-in rescheduled to async updates instead of formal meeting
- ✅ Sathmi returned to testing role on Nov 14 and caught up quickly

**Outcome:**
- Despite setback, sprint goals still achieved
- Team demonstrated strong collaboration and adaptability
- Sathmi's illness actually highlighted importance of cross-functional skills and backup planning

**Lesson Learned:**
- Need better contingency planning for team member unavailability
- Cross-training on testing procedures helped tremendously
- Documentation-as-we-go practice from Sprint 1 retrospective paid off—Sathmi could catch up easily

---

## Retrospective: Continue, Start, Stop

### 🟢 Continue (Practices to Keep)

**What went well:**

1. **Daily Integration Practice**
   - Merged features daily instead of waiting until sprint end
   - Caught integration issues early
   - Reduced last-minute stress significantly
   - **Result:** No integration crisis like Sprint 1

2. **Mid-Sprint Check-in Concept**
   - Although rescheduled due to Sathmi's illness, the async check-in on Nov 11 still helped
   - Team identified matching algorithm optimization need early
   - Adjusted testing approach mid-sprint
   - **Recommendation:** Keep this practice; formalize async alternative for emergencies

3. **Clear Task Ownership**
   - Ali owned matching algorithm and request backend
   - Ashraf owned preferences and UI/UX
   - Shaun owned privacy settings and profile management
   - Sathmi owned testing and documentation
   - **Result:** No confusion about responsibilities; efficient parallel work

4. **Better Time Estimation**
   - 34 story points was realistic and achievable
   - Accounted for coursework and exam prep
   - Buffer time helped absorb Sathmi's illness impact
   - **Result:** 100% completion rate vs 75-80% in Sprint 1

5. **Documentation During Development**
   - Developers documented code while writing it
   - API endpoints documented immediately
   - README updated incrementally
   - **Result:** Sathmi could catch up quickly after illness; no documentation debt

6. **Team Support Culture**
   - Everyone helped each other when Sathmi was sick
   - Ali and Shaun pair-programmed on complex matching logic
   - Ashraf provided UI/UX guidance to entire team
   - **Result:** High team morale; strong collaboration

7. **Definition of Done Rigor**
   - Strictly applied DoD checklist to all stories
   - Nothing marked complete without meeting all criteria
   - **Result:** High quality deliverables; no technical debt

---

### 🔵 Start (New Practices to Adopt)

**Improvements for Sprint 3:**

1. **Backup/Contingency Planning**
   - Designate backup person for each critical role
   - Cross-train on testing procedures (everyone should know basic testing)
   - Document emergency contact protocols
   - **Rationale:** Sathmi's illness showed need for better backup plans

2. **Earlier Code Freeze**
   - Freeze new features 2 days before sprint end (Nov 15 instead of Nov 17)
   - Dedicate final 2 days exclusively to testing, bug fixes, documentation
   - **Rationale:** Rushed final day testing; want more buffer for QA

3. **Automated Testing Foundation**
   - Start writing basic unit tests for critical functions (matching algorithm, request logic)
   - Explore Jest/Mocha for backend, React Testing Library for frontend
   - **Rationale:** Manual testing is comprehensive but time-consuming; automation would help

4. **Performance Testing**
   - Test with larger datasets (100+ users, 500+ requests)
   - Measure API response times and optimize slow queries
   - **Rationale:** Current testing with 10-20 users; need to validate scalability

5. **User Feedback Sessions**
   - Get feedback from 3-5 external beta testers on Sprint 2 features
   - Observe real users navigating matching and request flows
   - **Rationale:** Team testing finds bugs but not UX issues; fresh eyes needed

6. **Sprint Retrospective Actions Tracking**
   - Create Trello card for each retrospective action item
   - Assign owner and due date for each action
   - Review action items at next sprint planning
   - **Rationale:** Some Sprint 1 actions not fully implemented; need better tracking

7. **Technical Debt Register**
   - Maintain list of known tech debt and refactoring needs
   - Allocate 10-15% of Sprint 3 capacity to address debt
   - **Rationale:** Some quick-and-dirty solutions in Sprint 2; need to clean up

---

### 🔴 Stop (Harmful Practices to Eliminate)

**What didn't work:**

1. **Informal Mid-Sprint Check-in**
   - Due to Sathmi's illness, Nov 11 check-in was async only
   - Lost value of face-to-face discussion and problem-solving
   - **Fix:** Commit to formal video call even if one member absent; record for later

2. **Last-Minute UI Polish**
   - Spent Nov 16 afternoon tweaking UI styling instead of testing
   - Created risk of introducing bugs right before sprint end
   - **Fix:** UI polish should be during development, not at the end

3. **Vague Task Descriptions**
   - Some Trello subtasks were too broad (e.g., "Implement matching UI")
   - Led to confusion about what "done" meant
   - **Fix:** Break down tasks into specific, testable items (1-2 hour chunks)

4. **Skipping Code Review for "Small Changes"**
   - Few quick bug fixes merged without review during Nov 16 crunch
   - Introduced one regression bug (caught by Sathmi, fixed immediately)
   - **Fix:** No exceptions—all PRs require review, even one-line changes

5. **Over-Engineering Initially**
   - Ali spent extra time on matching algorithm optimization early in sprint
   - Could have started with simpler version and optimized later if needed
   - **Fix:** Start with simplest working solution; optimize only if necessary

6. **Testing Bottleneck**
   - Most testing concentrated in final 2 days (Nov 15-17)
   - Sathmi overwhelmed with testing workload after recovering from illness
   - **Fix:** Continuous testing throughout sprint; everyone does own basic testing first

---

## Sprint Experiences

### 😊 Best Experience

**"Watching the matching algorithm work for the first time and seeing real, accurate match percentages was incredibly satisfying"**

**Team Highlights:**

- **Ali's Matching Algorithm Success:**
  - After 4 hours of work on algorithm design, seeing it correctly calculate 87% match between two similar users was a "wow" moment
  - The weighted factors approach worked beautifully
  - Team gathered around screen to test different user combinations

- **End-to-End User Journey:**
  - First time seeing complete flow: Register → Set Preferences → Find Matches → Send Request → Accept Request
  - Felt like a real, functional product for the first time
  - Demo to a friend outside the team who said "I'd actually use this!"

- **Team Collaboration During Crisis:**
  - When Sathmi was sick, team came together without hesitation
  - No blame, no stress—just "how do we handle this?"
  - Everyone pitched in on testing and documentation
  - Sathmi felt supported, not guilty

- **Feature Polish:**
  - Match percentage visualization with color coding (green for high match, yellow for medium, red for low)
  - Smooth animations on request status changes
  - Professional-looking UI that team is proud of

- **Technical Achievement:**
  - Matching algorithm performs well even with complex queries
  - Privacy enforcement works seamlessly—users can't see what they shouldn't
  - Request system handles edge cases gracefully (duplicate requests, non-existent users)

**Key Takeaway:** Sprint 2 delivered the core value proposition of the platform. Seeing it work end-to-end and knowing real students could actually use it was immensely rewarding and motivating.

---

### 😔 Worst Experience

**"Sathmi getting sick mid-sprint and the stress of redistributing work while keeping sprint on track"**

**Team Challenges:**

- **Sathmi's Illness (Nov 11-13):**
  - Felt terrible for being unavailable during critical mid-sprint period
  - Worried about letting team down and falling behind
  - Physically exhausted; couldn't focus on screen for long periods
  - Missed mid-sprint check-in which was important milestone

- **Workload Redistribution Stress:**
  - Remaining team members took on extra testing work
  - Ashraf and Shaun had to learn testing procedures on the fly
  - Ali juggled backend development with documentation duties
  - Everyone already busy with their own features

- **Continued Academic Pressure:**
  - Nov 12-14 had assignments due for other courses
  - Shaun had EECS 3101 midterm on Nov 13
  - Ali had EECS 3221 project deadline Nov 15
  - Balancing coursework with sprint commitments difficult

- **Compressed Testing Timeline:**
  - Originally planned testing throughout sprint
  - Sathmi's illness compressed testing into Nov 14-17
  - Final 2 days felt rushed despite completing all features
  - Some edge cases discovered late (Nov 16) causing mini-panic

- **Communication Gaps:**
  - Async mid-sprint check-in less effective than planned formal meeting
  - Some decisions made without full team input
  - Sathmi felt out of the loop when she returned

**Impact:**

- Testing quality slightly compromised (though no critical bugs shipped)
- Team stress levels elevated during Nov 11-14
- Sprint could have been smoother with better contingency planning
- Final demo prep rushed on Nov 17 morning

**Key Takeaway:** Despite best planning, unexpected personal challenges (illness) can derail sprints. Need better backup plans and more realistic buffers. However, team's response demonstrated resilience and strong culture—nobody blamed anyone, everyone supported each other.

---

## What Worked from Sprint 1 Retrospective Actions

### Successfully Implemented ✅

1. **Better Time Estimation** ✅
   - **Action:** Account for external workload and add buffer time
   - **Result:** 34 points was realistic; 100% completion despite illness
   - **Grade:** A

2. **Definition of Done Checklist** ✅
   - **Action:** Create clear checklist for each story
   - **Result:** Nothing marked done prematurely; high quality deliverables
   - **Grade:** A

3. **Earlier Testing** ✅
   - **Action:** Start testing earlier in sprint, not at the end
   - **Result:** Testing started Nov 9; bugs caught earlier than Sprint 1
   - **Grade:** B+ (would be A if not for illness disruption)

4. **Documentation as We Go** ✅
   - **Action:** Write documentation while coding
   - **Result:** Excellent documentation; helped Sathmi catch up after illness
   - **Grade:** A

5. **Capacity Planning** ✅
   - **Action:** Consider team availability during planning
   - **Result:** 85% utilization realistic; absorbed illness impact
   - **Grade:** A-

### Partially Implemented ⚠️

6. **Mid-Sprint Check-ins** ⚠️
   - **Action:** Schedule mid-sprint sync to assess progress
   - **Result:** Planned for Nov 11 but became async due to Sathmi's illness
   - **Grade:** B- (concept good, execution disrupted)
   - **Fix for Sprint 3:** Commit to formal meeting even if one member absent

### Not Fully Implemented ❌

7. **Technical Debt Tracking** ❌
   - **Action:** Document technical debt as we go
   - **Result:** Some debt identified informally but not formally tracked
   - **Grade:** C
   - **Fix for Sprint 3:** Create dedicated Trello board or GitHub issues for tech debt

---

## Action Items for Sprint 3

| Action Item                                  | Owner  | Priority | Target Date |
| -------------------------------------------- | ------ | -------- | ----------- |
| Create backup/contingency plan document      | Ashraf | High     | Nov 20      |
| Set up basic unit testing framework          | Ali    | High     | Nov 22      |
| Create technical debt register in Trello     | Shaun  | High     | Nov 20      |
| Implement code freeze policy (2 days before) | Team   | High     | Sprint 3    |
| Conduct user feedback session (3-5 testers)  | Ashraf | Medium   | Nov 25      |
| Performance testing with 100+ users          | Ali    | Medium   | Sprint 3    |
| Cross-train team on basic testing procedures | Sathmi | Medium   | Nov 24      |
| Formalize retrospective action tracking      | Ashraf | Medium   | Nov 20      |
| Review and refactor matching algorithm       | Ali    | Low      | Sprint 3    |

---

## Unfinished Business & Sprint 3 Planning

### Deferred from Sprint 2

**None—all Sprint 2 stories completed!** ✅

However, some **enhancements identified** during Sprint 2 development:

**Enhancement 1: Advanced Matching Filters (Future)**
- Filter by gender, faculty, year of study
- Related to US #5 from Product Backlog
- Complexity: Medium
- **Decision:** Defer to post-Release 1.0

**Enhancement 2: Request Expiration (Future)**
- Automatically expire pending requests after 7 days
- Prevents stale requests accumulating
- Complexity: Low
- **Decision:** Defer to Sprint 4 or post-release

**Enhancement 3: Match Percentage Explanation (Future)**
- Show users why they got specific match % (breakdown)
- Improves transparency and trust
- Complexity: Low
- **Decision:** Nice-to-have for post-release

---

### Sprint 3 Scope (Preliminary)

Based on Product Backlog and Release 1.0 goals:

**High Priority (Carry-over from Original Sprint 2 Plan):**

1. **US #21: Admin User Management Actions** (5 points)
   - Suspend/delete user accounts
   - Confirmation dialogs for destructive actions
   - Audit trail logging

2. **US #25: Admin User Search and Filtering** (5 points)
   - Search by name, email, ID
   - Filter by status, role, registration date
   - Sortable results table

3. **US #22: Admin Reports Dashboard** (8 points)
   - View user-submitted reports
   - Report status workflow (pending, reviewing, resolved)
   - Admin actions on reports

**Medium Priority:**

4. **US #23: Admin Activity Log** (8 points)
   - Display user activities (logins, registrations, updates)
   - Filtering by user, date range, activity type
   - Pagination for large datasets

5. **US #24: Admin Analytics Dashboard** (8 points)
   - User count, registrations over time
   - Active users statistics
   - Visual charts/graphs

**Additional Considerations:**

6. **Technical Debt Cleanup** (3-5 points)
   - Refactor matching algorithm for better readability
   - Optimize database queries
   - Improve error handling consistency

7. **Testing & QA** (ongoing)
   - Unit tests for critical functions
   - Performance testing with larger datasets
   - User feedback integration

**Total Estimated Points for Sprint 3:** 34-42 points

**Sprint 3 Goals:**
- Complete admin dashboard functionality
- Address technical debt from Sprint 1-2
- Prepare for Release 1.0 final demo
- Achieve production-ready quality

---

## Technical Debt Identified

**Sprint 2 Technical Debt:**

1. **Matching Algorithm Optimization (Priority: Medium)**
   - Current implementation works but could be more efficient
   - Nested loops in route comparison—O(n²) complexity
   - **Impact:** May slow down with 100+ users
   - **Effort:** 3-4 hours refactoring
   - **Owner:** Ali

2. **Error Handling Inconsistency (Priority: Medium)**
   - Some API endpoints return different error formats
   - Frontend error handling not standardized
   - **Impact:** Inconsistent user experience on errors
   - **Effort:** 2-3 hours standardization
   - **Owner:** Shaun

3. **Request Schema Missing Indexes (Priority: High)**
   - No database indexes on sender/receiver fields
   - Queries will slow down as requests accumulate
   - **Impact:** Performance degradation over time
   - **Effort:** 1 hour to add indexes
   - **Owner:** Ali

4. **Privacy Settings Validation (Priority: Low)**
   - Frontend validation exists but backend validation minimal
   - Could accept invalid privacy values if frontend bypassed
   - **Impact:** Low (frontend prevents, but security best practice)
   - **Effort:** 1-2 hours
   - **Owner:** Shaun

5. **UI Responsiveness on Mobile (Priority: Medium)**
   - Some pages (matching, connections) not fully mobile-optimized
   - Works but UX could be better on small screens
   - **Impact:** Poor mobile experience
   - **Effort:** 3-4 hours responsive design
   - **Owner:** Ashraf

**Total Technical Debt:** ~12-15 hours (will allocate 10% of Sprint 3 capacity)

---

## Notes from Discussion

**Sathmi's Notes:**

### General Observations

- Sprint 2 was more successful than Sprint 1 overall (100% vs 75-80% completion)
- Daily integration practice was game-changer—no integration hell
- Definition of Done checklist prevented premature "done" declarations
- Better time estimation (34 points) was realistic and achievable

### Sathmi's Illness Impact

- Got sick on Nov 11 (day of mid-sprint check-in)—bad timing
- Team was incredibly supportive; no one made me feel bad
- Ashraf checked in daily: "How are you feeling? No pressure, rest up"
- Ali and Shaun took over testing without complaint
- Documentation quality from Sprint 1 action item helped me catch up quickly
- Returned Nov 14; caught up by reviewing docs and testing features
- Final 3 days were intense but manageable

### What Impressed the Team

- **Ali's matching algorithm:** Elegant solution; weighted factors approach works perfectly
- **Ashraf's UI/UX:** Preferences setup page is intuitive; users won't need instructions
- **Shaun's privacy settings:** Comprehensive and well-thought-out; users have full control
- **Team collaboration:** Everyone helped with testing when Sathmi was sick

### Concerns Moving Forward

- Need better backup plan if someone gets sick in Sprint 3
- Testing still bottlenecked at end—automation would help
- Some UI elements need mobile optimization
- Technical debt should be addressed in Sprint 3

### Sprint 3 Recommendations

- Focus on admin dashboard completion (as originally planned for Sprint 2)
- Allocate 10% of capacity to technical debt cleanup
- Implement code freeze 2 days before sprint end
- Start basic unit testing framework
- Get user feedback on Sprint 2 features before building more

### Team Morale

- High morale despite challenges
- Everyone proud of what we built
- Matching algorithm and request system feel like "real software"
- Excited for Sprint 3 and final release

---

## Sprint 2 Completion Summary

**Overall Assessment:** Sprint 2 was highly successful. Despite mid-sprint challenge of Sathmi's illness, team completed all planned stories (34 points, 100% velocity), delivered high-quality features, and demonstrated strong collaboration and adaptability. Sprint 2 delivered core platform value proposition—users can now set preferences, find matches, and connect with commute buddies.

**Key Achievements:**
- ✅ 100% story completion rate (4/4 stories)
- ✅ All acceptance criteria met
- ✅ Zero critical bugs
- ✅ High-quality, polished features
- ✅ Strong team collaboration during crisis
- ✅ Sprint 1 retrospective actions mostly implemented
- ✅ End-to-end user journey fully functional

**Areas for Improvement:**
- ⚠️ Better contingency planning for team member unavailability
- ⚠️ Testing still somewhat compressed at sprint end
- ⚠️ Technical debt tracking not formalized
- ⚠️ Mobile responsiveness needs improvement

**Team Morale:** Very Positive—team is proud of accomplishments and motivated for Sprint 3

**Readiness for Sprint 3:** High—clear understanding of admin dashboard scope and technical debt to address

**Release 1.0 Status:** On track—authentication and core features complete; admin dashboard remains for Sprint 3

---

## Recommendations for Sprint 3

### Scope & Planning

1. **Complete Admin Dashboard:** Focus on US #21, #22, #23, #24, #25 as originally planned
2. **Address Technical Debt:** Allocate 10% capacity (3-4 points) to tech debt from Sprint 1-2
3. **User Feedback Integration:** Get feedback on Sprint 2 features and make minor adjustments
4. **Testing & QA Focus:** Allocate 15% capacity for comprehensive testing and quality assurance

### Process Improvements

5. **Implement Code Freeze:** No new features or changes after Nov 15 (2 days before sprint end)
6. **Backup Planning:** Designate backup person for each critical role; cross-train on testing
7. **Automated Testing:** Set up Jest/Mocha for backend unit tests; start with critical functions
8. **Formal Mid-Sprint Check-in:** Commit to video call even if one member absent; record for absentees

### Quality & Performance

9. **Performance Testing:** Test with 100+ users to validate scalability
10. **Mobile Optimization:** Improve responsive design on matching and connections pages
11. **Security Audit:** Review authentication, privacy enforcement, and data protection
12. **Documentation Review:** Ensure all code, APIs, and user guides are current

### Team Health

13. **Sustainable Pace:** Maintain 85% capacity utilization; don't overcommit
14. **Celebrate Wins:** Team did great in Sprint 2 despite challenges—acknowledge this!
15. **Support System:** Continue supportive culture; check in on each other's wellbeing
16. **Academic Balance:** Continue respecting exam schedules and assignment deadlines

---

## Sign-off

**Note Taker:** Sathmi  
**Date:** November 17, 2025

**Participant Acknowledgment:**

All participants reviewed and agreed with the retrospective notes.

- Ashraf ✓
- Shaun ✓
- Ali ✓
- Sathmi ✓

---

**Document Version:** 1.0  
**Next Sprint Planning:** Sprint 3 Planning Meeting (November 19, 2025)  
**Next Retrospective:** End of Sprint 3 (December 1, 2025)

---

_This document serves as the official record of the Sprint 2 Retrospective Meeting and will inform planning and practices for Sprint 3, the final sprint before Release 1.0._
