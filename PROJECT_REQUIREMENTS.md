/Users/brijesh/Desktop/AI/exam-buddy/exam-buddy/
├── .git/                 # Git repository metadata
├── .gitignore            # Specifies intentionally untracked files
├── client/               # Frontend application (Setup pending/incomplete)
│   ├── package.json      # (Potentially conflicting, from failed CRA attempt)
│   ├── public/           # (Potentially conflicting)
│   └── src/              # (Potentially conflicting)
├── server/               # Backend application
│   ├── config/           # For configuration files (e.g., DB connection)
│   ├── controllers/      # Request handling logic
│   ├── middleware/       # Custom middleware (e.g., auth checks)
│   ├── models/           # Mongoose schemas/models
│   ├── routes/           # API route definitions
│   ├── index.js          # Main server entry point
│   └── package.json      # Backend dependencies and scripts
│   └── package-lock.json # Locked dependency versions
├── node_modules/         # Server dependencies (Gitignored)
├── DEVELOPMENT_LOG.md
├── PROJECT_REQUIREMENTS.md
└── README.md

## Project Overview
Exam Buddy is a comprehensive mock test platform that allows multiple users to take multiple mock tests simultaneously for various exams and subjects. The platform provides features for tracking progress, searching exams, and managing mock tests.

## Core Features

### 1. User Management
- User registration and login
- Role-based access control (Admin/User)
- Profile management
- Progress tracking
- Achievement system

### 2. Exam Management
- **Exam Types**: Support diverse exam categories:
  - Civil Services (e.g., UPSC CSE Prelims, State PSC Prelims)
  - University Entrance (e.g., CUET-UG, CUET-PG)
  - Government Recruitment (e.g., SSC CGL Tier 1, Banking Prelims - IBPS/SBI)
  - Professional Courses (e.g., NEET, JEE)
- **Exam Structure**: Define exam structure with multiple papers/sections:
  - Example (UPSC Prelims): Paper 1 (GS), Paper 2 (CSAT)
  - Example (Banking Prelims): Section 1 (English), Section 2 (Quant), Section 3 (Reasoning)
- **Exam Details**: Store key details for each exam/paper:
  - Subjects Covered (e.g., History, Geography, Polity, Quant, Reasoning, English, Domain Specific)
  - Total Marks (e.g., 200 marks)
  - Number of Questions (e.g., 100 questions, 80 questions)
  - Duration (e.g., 120 minutes, 60 minutes)
  - Marking Scheme (e.g., +2/-0.66 for UPSC GS, +1/-0.25 for Banking)
  - Negative Marking (Yes/No, specific fraction like 1/3rd, 1/4th)
  - Sectional Timings (Yes/No, duration per section for Banking)
  - Qualifying Papers (Yes/No, e.g., CSAT)
  - Language Options (e.g., English/Hindi)

### 3. Mock Test Management
- **Mock Test Types**: Create various mock test types:
  - Full-Length Mocks (simulating the entire exam pattern)
  - Sectional Mocks (focusing on specific sections/papers like Quant, GS Paper 1)
  - Subject-wise Mocks (focusing on specific subjects like Polity, Modern History)
  - Topic-wise Mocks (drilling down to specific topics within subjects)
  - Previous Year Question Papers (PYQPs) as mocks
- **Test Configuration**: Configure mock tests based on real exam patterns:
  - Adhere to Number of Questions, Marks, Duration, Negative Marking of the target exam.
  - Option to enable/disable sectional timings.
  - Difficulty level settings (Easy, Medium, Hard, Mixed).
- **Test Interface**: Provide a realistic test-taking interface:
  - Timer (overall and sectional if applicable)
  - Question navigation panel (Answered, Not Answered, Marked for Review)
  - Options for marking questions for review.
  - Clear indication of negative marking rules.
  - Ability to switch between languages if applicable.
- **Test Generation**: Generate tests from the question bank based on criteria (subject, topic, difficulty, type). Option for randomization.

### 4. Question Management
- **Question Types**: Support diverse question formats found in target exams:
  - Standard MCQs (Single Correct Option)
  - Multiple Correct Options MCQs (Common in engineering entrances)
  - Assertion-Reasoning Type
  - Matching List Type
  - Statement-Based Questions (e.g., 'Which of the above statements is/are correct?')
  - Reading Comprehension based MCQs
  - Data Interpretation based MCQs
  - (Future) Numerical Answer Type (NAT)
  - (Future) Fill in the Blanks
- **Question Attributes**: Store detailed attributes for each question:
  - Associated Exam(s)
  - Subject (e.g., Polity, Quantitative Aptitude)
  - Topic (e.g., Fundamental Rights, Percentages)
  - Difficulty Level (Easy, Medium, Hard)
  - Tags (e.g., #PYQP_2022, #CurrentAffairs_Jan2025)
  - Language (e.g., English, Hindi)
  - Correct Answer(s)
  - Explanation/Solution
  - Media Support (Images for DI/Geometry, Passages for RC)
  - Negative Marks applicable (override test default if needed)

### 5. Progress Tracking
- Test history
- Score trends
- Strengths and weaknesses analysis
- Time management analysis
- Subject-wise performance

### 6. Search and Filter
- Exam search by type
- Test search by subject
- Filter by difficulty level
- Filter by date
- Advanced search options

### 7. Admin Management
- User management
- Exam management
- Question bank management
- Test scheduling
- Performance analytics
- Content moderation

## Technical Requirements

### Frontend
- React (JavaScript)
- Material-UI for UI components
- React Router for navigation
- Redux for state management
- Axios for API calls
- Toast notifications
- Loading states

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- Multer for file uploads
- Cloudinary for media storage

## Database Schema

### Users Collection
- _id
- name
- email
- password (hashed)
- role (user/admin)
- profile_picture
- created_at
- updated_at

### Exams Collection
- _id
- name (e.g., 'UPSC Civil Services Prelims', 'SSC CGL Tier 1')
- type (e.g., 'Civil Services', 'Govt Recruitment', 'University Entrance')
- description
- papers: [ 
    { 
      paper_name: String, (e.g., 'General Studies Paper 1', 'CSAT', 'Quantitative Aptitude')
      subjects: [String],
      total_marks: Number, (e.g., 200)
      num_questions: Number, (e.g., 100)
      duration_minutes: Number, (e.g., 120)
      marking_scheme: { correct: Number, incorrect: Number }, (e.g., { correct: 2, incorrect: -0.66 })
      has_negative_marking: Boolean,
      is_qualifying: Boolean, (default: false)
      language_options: [String] (e.g., ['English', 'Hindi'])
    }
  ]
- overall_duration_minutes: Number, (if applicable, e.g., SSC CGL Tier 1)
- has_sectional_timing: Boolean, (e.g., true for Banking Prelims)
- created_at
- updated_at

### Tests Collection (Mock Tests)
- _id
- exam_id (reference to exams collection)
- name (e.g., 'UPSC Prelims GS Full Mock 1', 'SSC CGL Tier 1 Quant Sectional Mock 3')
- type (e.g., 'Full Length', 'Sectional', 'Subject Wise', 'Topic Wise', 'PYQP')
- description
- associated_paper_name: String, (Optional, for sectional tests, e.g., 'General Studies Paper 1')
- associated_subject: String, (Optional, for subject/topic tests, e.g., 'Polity')
- num_questions: Number,
- duration_minutes: Number,
- total_marks: Number,
- marking_scheme: { correct: Number, incorrect: Number }, (Can inherit from Exam or be specific)
- has_negative_marking: Boolean, (Can inherit from Exam or be specific)
- difficulty_level: String, (Easy, Medium, Hard, Mixed)
- is_active: Boolean, (For scheduling/availability)
- created_at
- updated_at

### Questions Collection
- _id
- associated_exams: [ObjectId], (Exams this question is relevant for)
- question_text: String,
- question_type: String, (e.g., 'MCQ_Single', 'MCQ_Multiple', 'AssertionReason', 'Matching', 'StatementBased')
- options: [ { text: String, is_correct: Boolean } ], (for MCQ types)
- correct_answer_text: String, (for non-MCQ or explanation reference)
- explanation: String,
- subject: String, (e.g., 'Modern History', 'Reasoning Ability')
- topic: String, (e.g., 'Indian National Movement', 'Syllogism')
- difficulty_level: String, (Easy, Medium, Hard)
- tags: [String], (e.g., 'PYQP_UPSC_2021', 'Conceptual')
- language: String, (e.g., 'English')
- media_urls: [String], (For images, passages)
- marks_override: { correct: Number, incorrect: Number }, (Optional, if different from test default)
- created_at
- updated_at

### UserProgress Collection
- _id
- user_id (reference to users collection)
- test_id (reference to tests collection)
- score
- time_taken
- completed_at
- subject_performance
- difficulty_performance

## Security Requirements
- Secure authentication
- Role-based access control
- Data encryption
- Secure file handling
- Rate limiting
- Input validation

## Performance Requirements
- Fast loading times
- Smooth navigation
- Efficient data handling
- Concurrent test taking
- Real-time score updates
- Scalable architecture

## Future Enhancements
1. Adaptive learning system
2. AI-powered question recommendations
3. Social features (leaderboards, discussions)
4. Offline study mode
5. Detailed analytics
6. Mobile app integration
7. Email notifications
8. Certificate generation

## Development Phases

### Phase 1: Core Authentication
- User registration/login
- Role-based access control
- Basic UI setup
- Profile management

### Phase 2: Exam and Test Management
- Exam creation and management
- Test creation and management
- Question bank implementation
- Basic search functionality

### Phase 3: User Dashboard
- Progress tracking
- Test history
- Performance analytics
- Subject-wise analysis

### Phase 4: Admin Dashboard
- User management
- Exam management
- Question bank management
- Analytics dashboard

### Phase 5: Enhancements
- Advanced search features
- Social features
- Offline capabilities
- Mobile app integration

### Phase 6: Optimization
- Performance optimization
- Scalability improvements
- Security enhancements
- Bug fixes

## API Endpoints

### Auth API
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- PUT /api/auth/profile
- POST /api/auth/logout

### Exams API
- GET /api/exams
- POST /api/exams
- GET /api/exams/:id
- PUT /api/exams/:id
- DELETE /api/exams/:id

### Tests API
- GET /api/tests
- POST /api/tests
- GET /api/tests/:id
- PUT /api/tests/:id
- DELETE /api/tests/:id

### Questions API
- GET /api/questions
- POST /api/questions
- GET /api/questions/:id
- PUT /api/questions/:id
- DELETE /api/questions/:id

### User Progress API
- GET /api/user/progress
- POST /api/user/progress
- GET /api/user/progress/:id
- PUT /api/user/progress/:id
- DELETE /api/user/progress/:id

### Admin API
- GET /api/admin/users
- GET /api/admin/exams
- GET /api/admin/tests
- GET /api/admin/analytics
- POST /api/admin/content

## Error Handling
- Input validation errors
- Authentication errors
- Database errors
- API errors
- Network errors
- Timeout errors

## Testing Requirements
- Unit tests for components
- Integration tests for API
- E2E tests for main flows
- Performance testing
- Security testing

## Documentation Requirements
- API documentation
- User guides
- Developer documentation
- Setup instructions

## Detailed Specifications & Planning

This section provides granular details, dummy data, and refined flows to guide development.

### Dummy Personas & Roles

*   **Student User (Regular User):**
    *   **Name:** Priya Sharma
    *   **Email:** `priya.sharma.student@example.com`
    *   **Password:** (Hashed) `hashed_password_1`
    *   **Target Exams:** UPSC CSE Prelims, State PSC (UPPSC)
    *   **Profile Picture:** `default_avatar.png`
    *   **Joined Date:** 2025-04-15
    *   **Subscription Tier:** Free Tier
    *   **DB Fields:** `isVerified` (Boolean, default: false), `verificationToken` (String, nullable), `verificationTokenExpiry` (Date, nullable), `lastLogin` (Date, nullable), `failedLoginAttempts` (Number, default: 0), `preferredLanguage` (String, default: 'English'), `phoneNumber` (String, nullable)
*   **Student User (Regular User):**
    *   **Name:** Rahul Verma
    *   **Email:** `rahul.verma.student@example.com`
    *   **Password:** (Hashed) `hashed_password_2`
    *   **Target Exams:** SSC CGL, Banking (IBPS PO)
    *   **Profile Picture:** `avatar_rahul.png`
    *   **Joined Date:** 2025-05-01
    *   **Subscription Tier:** Free Tier
*   **Student User (CUET Aspirant):**
    *   **Name:** Sameer Khan
    *   **Email:** `sameer.khan.student@example.com`
    *   **Password:** (Hashed) `hashed_password_3`
    *   **Target Exams:** CUET-UG (Science: Physics, Chemistry, Maths, English)
    *   **Profile Picture:** `avatar_sameer.png`
    *   **Joined Date:** 2025-05-03
    *   **Phone Number:** +91 9876543211
    *   **Preferred Language:** English
    *   **Subscription Tier:** Free Tier
*   **Admin User (Super Admin):**
    *   **Name:** Admin User
    *   **Email:** `admin@exambuddy.com`
    *   **Password:** (Hashed) `hashed_admin_password`
    *   **Role:** `SuperAdmin` (Manages users, exams, tests, questions, settings)
*   **Admin User (Exam Manager):**
    *   **Name:** Anjali Gupta
    *   **Email:** `anjali.gupta.manager@example.com`
    *   **Password:** (Hashed) `hashed_manager_password`
    *   **Role:** `ExamManager` (Manages assigned exam categories: e.g., Civil Services, University Entrance)

### Dummy Exam Categories

*   **Category Name:** Civil Services
    *   **Description:** Exams for central and state civil services.
    *   **Exams within:** UPSC CSE, State PSCs (UPPSC, BPSC, etc.)
    *   **Managed By:** `anjali.gupta.manager@example.com`
*   **Category Name:** SSC (Staff Selection Commission)
    *   **Description:** Exams for Group B and C government posts.
    *   **Exams within:** SSC CGL, SSC CHSL, SSC MTS
    *   **Managed By:** `admin@exambuddy.com`
*   **Category Name:** Banking
    *   **Description:** Exams for Public Sector Banks.
    *   **Exams within:** IBPS PO, IBPS Clerk, SBI PO, SBI Clerk
    *   **Managed By:** `admin@exambuddy.com`
*   **Category Name:** University Entrance
    *   **Description:** Common University Entrance Tests (UG & PG).
    *   **Exams within:** CUET-UG, CUET-PG
    *   **Managed By:** `anjali.gupta.manager@example.com`

### Dummy Exam Profiles

*   **Exam Name:** UPSC CSE Prelims 2025
    *   **Category:** Civil Services
    *   **Official Website Link:** `https://upsc.gov.in/`
    *   **Exam Date (Tentative):** May 26, 2025
    *   **Structure:**
        *   Paper 1: GS - 100 Qs, 200 Marks, 2 Hrs, Neg: -0.66
        *   Paper 2: CSAT - 80 Qs, 200 Marks, 2 Hrs, Neg: -0.83, Qualifying (33%)
    *   **Syllabus Outline:** History, Geography, Polity, Economy, Env, Science, Current Affairs (GS); Comprehension, Reasoning, Numeracy (CSAT).
*   **Exam Name:** SSC CGL Tier 1 2025
    *   **Category:** SSC
    *   **Structure:** Single Paper, 1 Hr, 100 Qs, 200 Marks, Neg: -0.50
        *   Reasoning: 25 Qs, 50 Marks
        *   General Awareness: 25 Qs, 50 Marks
        *   Quantitative Aptitude: 25 Qs, 50 Marks
        *   English: 25 Qs, 50 Marks
    *   **Syllabus Outline:** Standard SSC Tier 1 Syllabus.
*   **Exam Name:** CUET-UG 2025
    *   **Category:** University Entrance
    *   **Official Website Link:** `https://exams.nta.ac.in/CUET-UG/`
    *   **Exam Date (Tentative):** May 15-31, 2025
    *   **Structure:** Variable Sections:
        *   Sec IA/IB: Languages (e.g., English) - 40/50 Qs, 45 mins.
        *   Sec II: Domain Subjects (e.g., Physics) - 35/40 Qs out of 45/50, 45 mins.
        *   Sec III: General Test - 50/60 Qs, 60 mins.
    *   **Marking Scheme:** +5 correct, -1 incorrect.
    *   **Syllabus Outline:** Class 12 syllabus + General Test components.
*   **Exam Name:** CUET-PG 2025
    *   **Category:** University Entrance
    *   **Official Website Link:** `https://pgcuet.samarth.ac.in/`
    *   **Exam Date (Tentative):** March 11-28, 2025
    *   **Structure:** Varies by PG subject paper (MCQ based).
    *   **Marking Scheme:** Varies (e.g., +4 / -1).
    *   **Syllabus Outline:** Respective UG subject syllabus.

### Dummy Mock Tests

*   **Test Name:** UPSC Prelims 2025 - Full Mock Test 1 (GS Paper 1 Focus)
    *   **Exam:** UPSC CSE Prelims 2025
    *   **Type:** Full-Length Mock
    *   **Structure:** Paper 1: 100 Qs, 200 Marks, 2 Hrs
    *   **Difficulty:** Medium-Hard
    *   **Status:** Published
    *   **Focus Tags:** `Polity Heavy`, `Current Affairs May'24`
    *   **Created By:** `anjali.gupta.manager@example.com`
    *   **Created Date:** 2025-04-20
    *   **Attempts Allowed:** 3
*   **Test Name:** SSC CGL Tier 1 - Sectional Mock: Quantitative Aptitude Set 3
    *   **Exam:** SSC CGL Tier 1 2025
    *   **Type:** Sectional Mock
    *   **Structure:** 25 Qs, 50 Marks, 15 Mins (suggested)
    *   **Difficulty:** Hard
    *   **Status:** Published
    *   **Created By:** `admin@exambuddy.com`
*   **Test Name:** CUET-UG General Test Mock 1
    *   **Exam:** CUET-UG 2025
    *   **Type:** Sectional Mock (General Test)
    *   **Structure:** 60 Questions (Attempt 50), 120 Marks (Temp. +5/-1), 60 Minutes
    *   **Difficulty:** Medium
    *   **Status:** Published
    *   **Focus Tags:** `General Knowledge`, `Reasoning`
    *   **Created By:** `admin@exambuddy.com`
    *   **Created Date:** 2025-05-01
    *   **Attempts Allowed:** Unlimited (Free Tier)

### Dummy Questions (Examples)

*   **Exam:** UPSC CSE Prelims 2025
    *   **Question ID:** `UPSC_GS1_POL_Q042`
    *   **Subject:** Polity (GS Paper 1)
    *   **Text:** "Which DPSPs were added by the 42nd Amendment...? [Options: 1. Healthy dev children, 2. Free legal aid, 3. Worker participation, 4. Env protection]"
    *   **Type:** MCQ (Single Correct)
    *   **Options:** (A) 1,2 (B) 1,2,3 (C) 2,3,4 (D) 1,2,3,4
    *   **Answer:** (D)
    *   **Explanation:** "42nd Amd added Art 39(f), 39A, 43A, 48A... [details]"
    *   **Difficulty:** Medium
    *   **Tags:** `DPSP`, `Amendments`, `Polity`
    *   **Created By:** `anjali.gupta.manager@example.com`
*   **Exam:** CUET-UG 2025
    *   **Question ID:** `CUET_GT_GK_Q001`
    *   **Subject:** General Knowledge (General Test)
    *   **Text:** "Which city is 'Silicon Valley of India'?"
    *   **Type:** MCQ (Single Correct)
    *   **Options:** (A) Mumbai, (B) Hyderabad, (C) Bengaluru, (D) Chennai
    *   **Answer:** (C)
    *   **Explanation:** "Bengaluru known for IT companies."
    *   **Difficulty:** Easy
    *   **Tags:** `Geography`, `India`, `Cities`
    *   **Created By:** `admin@exambuddy.com`

### Detailed User Flow: Authentication

1.  **Register:**
    *   **Component:** `RegisterPage` (`/register`)
    *   **Fields:** Full Name, Email, Password, Confirm Password.
    *   **Client Validation:** Real-time checks (required, email format, password length/match).
    *   **Micro Tasks:** Check email uniqueness (on blur), Submit -> API Call, Handle Success (Verification email sent? Redirect) / Error (Display message).
    *   **API:** `POST /api/auth/register`
    *   **DB Fields Added:** `isVerified`, `verificationToken`, `verificationTokenExpiry`.
2.  **Email Verification:**
    *   **Component:** `VerifyEmailPage` (`/verify-email/:token`)
    *   **Micro Tasks:** API Call -> Backend validates token -> Update `isVerified` -> Display Success/Error -> Link to Login.
    *   **API:** `GET /api/auth/verify-email/:token`
3.  **Login:**
    *   **Component:** `LoginPage` (`/login`)
    *   **Fields:** Email, Password.
    *   **Micro Tasks:** Client Validation, Submit -> API Call, Handle Success (Store token/user state, Redirect to Dashboard) / Error (Check `isVerified`, Invalid credentials, Account locked?).
    *   **API:** `POST /api/auth/login`
    *   **DB Fields Added:** `lastLogin`, `failedLoginAttempts`.
4.  **Forgot/Reset Password:**
    *   **Component:** `ForgotPasswordPage` (`/forgot-password`)
        *   Field: Email.
        *   Micro Tasks: Validate email exists, API Call -> Send Reset Email, Rate Limiting.
        *   API: `POST /api/auth/forgot-password`
    *   **Component:** `ResetPasswordPage` (`/reset-password/:token`)
        *   Fields: New Password, Confirm New Password.
        *   Micro Tasks: Validate passwords (match, strength), API Call -> Verify token -> Update Password -> Invalidate token.
        *   API: `POST /api/auth/reset-password/:token`
