# Exam Buddy

A comprehensive exam preparation platform for students and educators.

## Project Structure

### Client Structure
```
client/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── auth/
│   │   │   └── LoginForm.jsx
│   │   ├── navigation/
│   │   │   ├── Navigation.jsx
│   │   │   ├── AdminNavigation.jsx
│   │   │   └── StudentNavigation.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminExamList.jsx
│   │   │   └── AdminCategoryList.jsx
│   │   └── dashboard/
│   │       └── Dashboard.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── dashboard/
│   │   │   ├── StudentDashboardPage.jsx
│   │   │   └── ExamManagerDashboardPage.jsx
│   │   └── admin/
│   │       └── AdminDashboard.jsx
│   ├── screens/
│   │   ├── auth/
│   │   │   └── AuthScreen.jsx
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.jsx
│   │   └── exam/
│   │       ├── MockTestScreen.jsx
│   │       └── ExamScreen.jsx
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── examSlice.js
│   │   │   └── testAttemptSlice.js
│   │   └── hooks/
│   │       └── hooks.js
│   ├── services/
│   │   ├── auth/
│   │   │   └── authService.js
│   │   ├── exam/
│   │   │   └── examService.js
│   │   └── category/
│   │       └── examCategoryService.js
│   ├── utils/
│   │   ├── validators/
│   │   │   └── formValidators.js
│   │   └── helpers/
│   │       └── apiHelpers.js
│   ├── hooks/
│   │   └── useAuth.js
│   └── styles/
│       ├── App.css
│       └── index.css
│   └── tests/
│       ├── components/
│       ├── pages/
│       └── services/
├── package.json
└── vite.config.js
```

### Server Structure
```
server/
├── controllers/
│   ├── auth/
│   │   └── authController.js
│   ├── exam/
│   │   └── examController.js
│   └── category/
│       └── categoryController.js
├── models/
│   ├── user/
│   │   └── User.js
│   ├── exam/
│   │   └── Exam.js
│   └── category/
│       └── ExamCategory.js
├── routes/
│   ├── auth/
│   │   └── authRoutes.js
│   ├── exam/
│   │   └── examRoutes.js
│   └── category/
│       └── categoryRoutes.js
├── middleware/
│   ├── auth/
│   │   └── authMiddleware.js
│   └── error/
│       └── errorMiddleware.js
├── services/
│   ├── auth/
│   │   └── authService.js
│   ├── exam/
│   │   └── examService.js
│   └── category/
│       └── categoryService.js
├── utils/
│   ├── validators/
│   │   └── requestValidators.js
│   └── helpers/
│       └── responseHelpers.js
├── config/
│   ├── db/
│   │   └── db.js
│   └── env/
│       └── config.js
├── seed/
│   ├── users/
│   │   └── seedUsers.js
│   ├── exams/
│   │   └── seedExams.js
│   └── categories/
│       └── seedCategories.js
├── tests/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── services/
├── .env
└── index.js
```

## Folder Organization

### Client
- `components/`: Reusable React components
  - `common/`: Common UI components
  - `auth/`: Authentication components
  - `navigation/`: Navigation components
  - `admin/`: Admin-specific components
  - `dashboard/`: Dashboard components
- `pages/`: Page-level components
  - `auth/`: Authentication pages
  - `dashboard/`: Dashboard pages
  - `admin/`: Admin pages
- `screens/`: Screen-level components
  - `auth/`: Authentication screens
  - `dashboard/`: Dashboard screens
  - `exam/`: Exam-related screens
- `store/`: Redux store and slices
  - `slices/`: Redux slices
  - `hooks/`: Store hooks
- `services/`: API services
  - `auth/`: Authentication services
  - `exam/`: Exam services
  - `category/`: Category services
- `utils/`: Utility functions
  - `validators/`: Form validation
  - `helpers/`: Helper functions
- `hooks/`: Custom React hooks
- `styles/`: CSS and styling
- `tests/`: Test files

### Server
- `controllers/`: Route handlers
  - `auth/`: Authentication controllers
  - `exam/`: Exam controllers
  - `category/`: Category controllers
- `models/`: Database models
  - `user/`: User model
  - `exam/`: Exam model
  - `category/`: Category model
- `routes/`: API routes
  - `auth/`: Authentication routes
  - `exam/`: Exam routes
  - `category/`: Category routes
- `middleware/`: Express middleware
  - `auth/`: Authentication middleware
  - `error/`: Error handling middleware
- `services/`: Business logic services
  - `auth/`: Authentication services
  - `exam/`: Exam services
  - `category/`: Category services
- `utils/`: Utility functions
  - `validators/`: Request validation
  - `helpers/`: Response helpers
- `config/`: Configuration files
  - `db/`: Database configuration
  - `env/`: Environment configuration
- `seed/`: Database seed files
  - `users/`: User seed data
  - `exams/`: Exam seed data
  - `categories/`: Category seed data
- `tests/`: Test files

### Client
- `components/`: Reusable React components
  - `common/`: Common UI components
  - `auth/`: Authentication components
  - `navigation/`: Navigation components
  - `admin/`: Admin-specific components
- `pages/`: Page-level components
  - `auth/`: Authentication pages
  - `dashboard/`: Dashboard pages
  - `admin/`: Admin pages
- `screens/`: Screen-level components
- `store/`: Redux store and slices
- `services/`: API services
- `utils/`: Utility functions
- `hooks/`: Custom React hooks
- `styles/`: CSS and styling

### Server
- `config/`: Configuration files
- `controllers/`: Route handlers
- `models/`: Database models
- `routes/`: API routes
- `middleware/`: Express middleware
- `services/`: Business logic services
- `utils/`: Utility functions
- `seed/`: Database seed files

## Features

- User Authentication (Firebase)
- Role-based Access Control (Admin/User)
- Mock Test Interface
- Dashboard for Progress Tracking
- Admin Dashboard for Content Management

## Tech Stack

- React (JavaScript)
- Node.js
- Express.js (Backend)
- MongoDB (Database)
- React Router (Routing)
- Material-UI (UI Components)

## Project Structure

```
exam-buddy/
├── client/               # React frontend
│   ├── public/          # Static assets
│   └── src/             # Source code
│       ├── components/  # React components
│       ├── store/       # Redux store
│       └── App.js       # Main application
├── server/              # Node.js backend
│   ├── routes/         # API routes
│   ├── models/         # MongoDB models
│   └── server.js       # Main server file
└── .env                # Environment variables
```

## Getting Started

1. Install dependencies:
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

2. Set up environment variables:
- Create a `.env` file in the root directory
- Add your MongoDB connection string
- Add JWT secret key
- Add Cloudinary credentials (for file uploads)

3. Start the development server:
```bash
# Start both server and client in development mode
npm run dev
```
Once the frontend server starts (usually on `http://localhost:5173` or similar, check the command output), I can open a browser preview for you.

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Maintain consistent naming conventions
- Use React Native Paper components for UI

### Version Control
- Create descriptive commit messages
- Use feature branches for new functionality
- Follow conventional commits format

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this code as a reference for your projects.
