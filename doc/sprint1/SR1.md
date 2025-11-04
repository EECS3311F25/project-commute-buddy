# Sprint 1 Retrospective Meeting (SR1.md)

## Meeting Information

**Sprint:** Sprint 1  
**Date:** 03rd November  
**Time:** 08.30 PM
**Duration:** 45 Minutes
**Location/Platform:** Discord
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

## Sprint 1 Overview

**Sprint Goal:** Implement core authentication system and basic admin dashboard for the Campus Commute Buddy platform.

**Planned Features:**

1. ✅ University Email Registration - **COMPLETED**
2. ✅ Secure User Login - **COMPLETED**
3. ⚠️ Admin Dashboard - **PARTIALLY COMPLETED**

---

## Completed Work

### Feature 1: University Email Registration ✅

**Status:** Fully Implemented

**Completed Stories:**

- US #1: Create account using university email
- US #12: Student verification for safety

**Deliverables:**

- Email validation with university domain whitelist
- Account creation process
- Duplicate account prevention

---

### Feature 2: Secure User Login ✅

**Status:** Fully Implemented

**Completed Stories:**

- US #3: Secure login for returning users

**Deliverables:**

- Email and password authentication
- Secure session management
- Session timeout functionality

---

### Feature 3: Admin Dashboard ⚠️

**Status:** Partially Implemented

**Completed Components:**

- Admin authentication system
- Basic user viewing interface
- View user information (name, email, role, creation date)
- Basic UI structure with tabs

**Incomplete Components:**

- Reports tab functionality
- Activity log tab functionality
- User suspension feature
- User deletion feature
- Advanced filtering and search
- Platform analytics

---

## Unfinished Tasks

### New User Stories for Sprint 2

**US #21: Admin User Management Actions**
_As an admin, I want to suspend or delete user accounts so that I can moderate the platform and remove problematic users._

**Acceptance Criteria:**

- [ ] Implement suspend user functionality
- [ ] Implement delete user functionality
- [ ] Add confirmation dialogs for destructive actions
- [ ] Log all admin actions for audit trail
- [ ] Display user status (active/suspended) in user list

**Priority:** P1 (High)  
**Difficulty:** Medium  
**Story Points:** [TBD]

---

**US #22: Admin Reports Dashboard**
_As an admin, I want to view and manage user reports so that I can respond to safety concerns and policy violations._

**Acceptance Criteria:**

- [ ] Implement reports tab in admin dashboard
- [ ] Display list of user-submitted reports
- [ ] Show report details (reporter, reported user, reason, timestamp)
- [ ] Add report status workflow (pending, reviewing, resolved)
- [ ] Enable admin actions on reports (dismiss, take action)

**Priority:** P1 (High)  
**Difficulty:** Medium  
**Story Points:** [TBD]

---

**US #23: Admin Activity Log**
_As an admin, I want to view platform activity logs so that I can monitor system usage and identify potential issues._

**Acceptance Criteria:**

- [ ] Implement activity log tab in admin dashboard
- [ ] Display user activities (logins, registrations, profile updates)
- [ ] Add filtering by user, date range, and activity type
- [ ] Implement pagination for large log datasets
- [ ] Add export functionality for activity logs

**Priority:** P2 (Medium)  
**Difficulty:** Medium  
**Story Points:** [TBD]

---

**US #24: Admin Analytics Dashboard**
_As an admin, I want to view platform analytics so that I can understand user engagement and platform growth._

**Acceptance Criteria:**

- [ ] Display total user count
- [ ] Show registrations over time (daily, weekly, monthly)
- [ ] Display active users statistics
- [ ] Add visual charts/graphs for metrics
- [ ] Show verification completion rate

**Priority:** P2 (Medium)  
**Difficulty:** Medium  
**Story Points:** [TBD]

---

**US #25: Admin User Search and Filtering**
_As an admin, I want to search and filter users so that I can quickly find specific accounts for management purposes._

**Acceptance Criteria:**

- [ ] Implement search by name, email, or ID
- [ ] Add filter by account status (active, suspended, verified)
- [ ] Add filter by registration date range
- [ ] Add filter by role
- [ ] Display search results in sortable table

**Priority:** P1 (High)  
**Difficulty:** Easy-Medium  
**Story Points:** [TBD]

---

## Retrospective: Continue, Start, Stop

### 🟢 Continue (Practices to Keep)

**What went well:**

1. **Regular Communication**

   - Daily stand-ups via WhatsApp kept everyone aligned
   - Quick response times to blockers and questions
   - Open and transparent communication culture

2. **Collaborative Problem-Solving**

   - Team members helped each other when stuck
   - Code reviews provided valuable feedback
   - Knowledge sharing sessions were beneficial

3. **Clear Task Assignment**

   - Everyone knew what they were responsible for
   - Workload was distributed fairly
   - Minimal confusion about ownership

4. **Meeting Up in Person After Class**

   - Face-to-face discussions were highly productive
   - Easier to brainstorm and whiteboard solutions
   - Strengthened team bonding and morale

5. **Incremental Development**
   - Breaking features into smaller tasks worked well
   - Allowed for early testing and validation
   - Easier to track progress

---

### 🔵 Start (New Practices to Adopt)

**Improvements for Sprint 2:**

1. **Better Time Estimation**

   - Spend more time on story point estimation
   - Account for external workload (exams, other courses)
   - Add buffer time for unexpected challenges

2. **Mid-Sprint Check-ins**

   - Schedule a mid-sprint sync to assess progress
   - Identify blockers earlier
   - Adjust scope if necessary before it's too late

3. **Definition of Done Checklist**

   - Create a clear checklist for each story
   - Include testing, documentation, and code review
   - Ensure nothing is marked complete prematurely

4. **Capacity Planning**

   - Consider team availability during sprint planning
   - Account for exam periods and heavy academic workload
   - Be more realistic about sprint capacity

5. **Earlier Testing**

   - Start testing earlier in the sprint
   - Don't wait until the end to integrate features
   - Catch bugs sooner

6. **Documentation as We Go**

   - Write documentation while coding, not after
   - Update README and API docs incrementally
   - Easier than trying to remember everything at the end

---

### 🔴 Stop (Harmful Practices to Eliminate)

**What didn't work:**

1. **Underestimating Complexity**

   - Admin dashboard was more complex than anticipated
   - Need to better assess feature complexity upfront
   - Conduct technical spike when unsure

2. **Leaving Integration to the End**

   - Waiting until the last days caused integration issues
   - Should integrate features continuously
   - Daily or every-other-day integration would be better

3. **Not Accounting for External Commitments**

   - Didn't properly factor in midterms and other course projects
   - Led to uneven workload distribution during sprint
   - Need to be more vocal about upcoming conflicts

4. **Scope Creep During Development**

   - Added "small features" without discussing with team
   - Led to incomplete core features
   - Must stick to sprint commitment

5. **Postponing Difficult Tasks**
   - Tendency to work on easier tasks first
   - Difficult tasks (like admin actions) left incomplete
   - Should tackle complex tasks earlier in sprint

---

## Sprint Experiences

### 😊 Best Experience

**"It was fun to discuss with everyone and meet up and see the project being developed right before your eyes"**

**Team Highlights:**

- Watching features come to life was incredibly motivating
- In-person meetups created great team energy and collaboration
- Seeing user registration work for the first time was exciting
- Testing the login flow together was a proud moment
- Team chemistry and support made challenges manageable
- Collaborative debugging sessions were productive and educational
- Celebrating small wins together kept morale high

**Key Takeaway:** The collaborative, hands-on nature of development and seeing tangible progress was the most rewarding aspect of Sprint 1.

---

### 😔 Worst Experience

**"Heavy workload due to projects, exams, and quizzes from other courses"**

**Team Challenges:**

- Multiple team members had midterms during the sprint
- Other course projects competed for time and attention
- Quiz preparation reduced available development hours
- Stress from academic pressure affected focus
- Late nights trying to balance coursework and development
- Felt rushed toward the end of the sprint
- Couldn't dedicate as much time as initially planned

**Impact:**

- Admin dashboard features had to be deprioritized
- Quality concerns due to time pressure
- Less time for thorough testing
- Documentation was rushed
- Some technical debt was introduced

**Key Takeaway:** Academic commitments significantly impacted sprint capacity. Future sprints must account for exam periods and course deadlines during planning.

---

## Metrics and Data

### Sprint Velocity

- **Planned Story Points:** [Points for 3 features]
- **Completed Story Points:** [Points for 2 complete + partial admin]
- **Velocity:** ~75-80% of planned capacity

### Burndown

- Sprint started strong
- Progress slowed mid-sprint (exam week)
- Rush toward the end to complete core features
- Admin dashboard features pushed to Sprint 2

### Team Capacity

- Average hours per team member: [30]
- Total team hours: [120]
- Lost capacity due to exams: ~20-30%

---

## Action Items for Sprint 2

| Action Item                                      | Owner  | Priority |
| ------------------------------------------------ | ------ | -------- |
| Complete unfinished admin dashboard user stories | Team   | High     |
| Implement capacity planning process              | Ashraf | High     |
| Create Definition of Done checklist              | Sathmi | High     |
| Schedule mid-sprint check-in                     | Ashraf | Medium   |
| Set up continuous integration                    | Ali    | Medium   |
| Document technical debt                          | Shaun  | Medium   |
| Update story point estimation process            | Team   | Medium   |

---

## Sprint 1 Completion Summary

**Overall Assessment:** Despite external challenges, Sprint 1 was largely successful. Two out of three features were fully completed, and the team demonstrated strong collaboration and problem-solving skills. The partially completed admin dashboard provides a solid foundation for Sprint 2.

**Team Morale:** Positive - team is motivated to continue and improve

**Readiness for Sprint 2:** High - clear understanding of what needs to be done

---

## Notes from Discussion

**Sathmi's Notes:**

- Everyone agreed that the in-person sessions were the most productive
- Consensus that we underestimated the admin dashboard complexity
- Team wants to maintain the collaborative culture going forward
- Need to be more realistic about time commitments
- Suggestion: Create a shared calendar of everyone's major deadlines
- Idea: Pair programming sessions helped a lot - do more of this
- Note: Email verification system worked flawlessly - proud of this achievement
- Observation: Code quality was generally good despite time pressure
- Concern: Technical debt in admin dashboard needs addressing early in Sprint 2

---

## Sign-off

**Note Taker:** Sathmi  
**Date:** [03rd November]

**Participant Acknowledgment:**

All participants reviewed and agreed with the retrospective notes.

- Ashraf ✓
- Shaun ✓
- Ali ✓
- Sathmi ✓

---

**Document Version:** 1.0  
**Next Retrospective:** End of Sprint 2

---

_This document serves as the official record of the Sprint 1 Retrospective Meeting and will inform planning and practices for Sprint 2._
