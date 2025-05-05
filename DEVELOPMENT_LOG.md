PORT=5001
MONGO_URI=<your_mongodb_connection_string>  
Next, create `client/src/pages/LoginPage.jsx`:

```tool_code
Then, create `client/src/pages/RegisterPage.jsx`:

```tool_code
Finally, update [client/src/App.jsx](cci:7://file:///Users/brijesh/Desktop/AI/exam-buddy/exam-buddy/client/src/App.jsx:0:0-0:0) to import and use these new page components:

```tool_code
Next, create the Footer component `client/src/components/common/Footer.jsx`:

```tool_code
Finally, update [client/src/App.jsx](cci:7://file:///Users/brijesh/Desktop/AI/exam-buddy/exam-buddy/client/src/App.jsx:0:0-0:0) to include the `Navbar` and `Footer`:

```tool_code
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

## Project Overview
Exam Buddy is a comprehensive mock test platform that allows multiple users to take multiple mock tests simultaneously for various exams and subjects.

## Development Phases

### Phase 1: Core Infrastructure (Week 1-2)

#### Completed Tasks
- [x] Project structure setup
- [x] Basic authentication system
- [x] Initial frontend components
- [x] Redux store setup

#### Planned Tasks
1. Database schema implementation
2. API endpoint setup
3. Basic routing
4. Error handling

### Phase 2: User Management (Week 3-4)

#### Planned Tasks
1. User registration and login
2. Profile management
3. Progress tracking
4. Achievement system

### Phase 3: Exam Management (Week 5-6)

#### Planned Tasks
1. Exam types and categories
2. Exam difficulty levels
3. Exam scheduling
4. Passing criteria

### Phase 4: Mock Test System (Week 7-8)

#### Planned Tasks
1. Question bank management
2. Test generation
3. Time-based testing
4. Score calculation

### Phase 5: Question Management (Week 9-10)

#### Planned Tasks
1. Multiple question types
2. Question difficulty levels
3. Question categories
4. Media support

### Phase 6: Progress Tracking (Week 11-12)

#### Planned Tasks
1. Test history
2. Score trends
3. Performance analytics
4. Subject-wise analysis

### Phase 7: Search and Filter (Week 13-14)

#### Planned Tasks
1. Exam search functionality
2. Test filtering
3. Advanced search options
4. Search optimization

### Phase 8: Admin Dashboard (Week 15-16)

#### Planned Tasks
1. User management
2. Exam management
3. Question bank management
4. Analytics dashboard

## Technical Implementation

### Database Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: String,
  profile_picture: String,
  created_at: Date,
  updated_at: Date
}
```

#### Exams Collection
```javascript
{
  _id: ObjectId,
  name: String,
  type: String,
  description: String,
  subjects: [String],
  difficulty_levels: [String],
  duration: Number,
  passing_marks: Number,
  created_at: Date,
  updated_at: Date
}
```

#### Tests Collection
```javascript
{
  _id: ObjectId,
  exam_id: ObjectId,
  name: String,
  description: String,
  total_questions: Number,
  duration: Number,
  passing_marks: Number,
  difficulty_level: String,
  created_at: Date,
  updated_at: Date
}
```

#### Questions Collection
```javascript
{
  _id: ObjectId,
  test_id: ObjectId,
  question_text: String,
  question_type: String,
  options: [String],
  correct_answer: String,
  difficulty_level: String,
  subject: String,
  media_url: String,
  created_at: Date,
  updated_at: Date
}
```

#### UserProgress Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  test_id: ObjectId,
  score: Number,
  time_taken: Number,
  completed_at: Date,
  subject_performance: {
    [subject]: {
      score: Number,
      time_taken: Number
    }
  },
  difficulty_performance: {
    [difficulty]: {
      score: Number,
      time_taken: Number
    }
  }
}
```

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

### Common Error Types
1. Input validation errors
2. Authentication errors
3. Database errors
4. API errors
5. Network errors
6. Timeout errors

### Error Response Format
```javascript
{
  error: {
    code: String,
    message: String,
    details: Object
  }
}
```

## Testing Strategy

### Test Types
1. Unit tests for components
2. Integration tests for API
3. E2E tests for main flows
4. Performance testing
5. Security testing

### Test Coverage Requirements
- Minimum 80% code coverage
- All API endpoints tested
- All user flows tested
- Performance benchmarks established

## Documentation Requirements

### Required Documentation
1. API documentation
2. User guides
3. Developer documentation
4. Setup instructions
5. Best practices

### Documentation Standards
- Clear and concise
- Well-structured
- Regularly updated
- Examples included

## Version Control Strategy

### Branching Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `hotfix/*`: Critical bug fixes
- `release/*`: Release preparation

### Commit Guidelines
- Use conventional commits format
- Write clear commit messages
- Group related changes
- Test before committing

## Code Review Process

### Review Steps
1. Create Pull Request
2. Assign reviewers
3. Address feedback
4. Merge to develop
5. Test on staging
6. Merge to main

## Security Measures

### Implemented Security
1. Secure authentication
2. Role-based access control
3. Data encryption
4. Secure file handling
5. Rate limiting
6. Input validation

## Performance Optimization

### Optimization Targets
1. Fast loading times
2. Smooth navigation
3. Efficient data handling
4. Concurrent test taking
5. Real-time score updates
6. Scalable architecture

## Future Enhancements

### Planned Enhancements
1. Adaptive learning system
2. AI-powered question recommendations
3. Social features (leaderboards, discussions)
4. Offline study mode
5. Detailed analytics
6. Mobile app integration
7. Email notifications
8. Certificate generation

## Project Timeline

### Phase 1: Core Infrastructure (Week 1-2)
- Setup project structure
- Implement basic authentication
- Create initial components
- Set up Redux store

### Phase 2: User Management (Week 3-4)
- Complete user management
- Implement profile features
- Add progress tracking
- Create achievement system

### Phase 3: Exam Management (Week 5-6)
- Implement exam types
- Add exam categories
- Set up difficulty levels
- Create exam scheduling

### Phase 4: Mock Test System (Week 7-8)
- Implement question bank
- Create test generation
- Add time-based testing
- Implement scoring

### Phase 5: Question Management (Week 9-10)
- Add question types
- Implement difficulty levels
- Create categories
- Add media support

### Phase 6: Progress Tracking (Week 11-12)
- Implement test history
- Add score trends
- Create analytics
- Add subject analysis

### Phase 7: Search and Filter (Week 13-14)
- Implement exam search
- Add test filtering
- Create advanced search
- Optimize search

### Phase 8: Admin Dashboard (Week 15-16)
- Complete user management
- Add exam management
- Implement question bank
- Create analytics
