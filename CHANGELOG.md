# Changelog

All notable changes to the Exam Buddy project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Project initialization with basic structure
- Authentication system with JWT
- User model and authentication controllers
- Error handling middleware
- Input validation middleware
- Configuration management
- Database connection utility
- Server startup script
- API documentation setup

### Changed
- Updated project dependencies
- Improved error handling in authentication flow
- Enhanced validation middleware
- Refactored configuration management

### Fixed
- Fixed environment variable loading
- Resolved circular dependencies
- Fixed JWT token verification
- Fixed error handling in async routes

## [0.1.0] - 2025-05-05
### Added
- Initial project setup
- Basic Express server configuration
- MongoDB connection setup
- Basic folder structure
- Git repository initialization

### Changed
- Updated README with project information
- Configured ESLint and Prettier
- Set up development environment

## [0.2.0] - 2025-05-05
### Added
- User authentication system
  - Register new users
  - Login with email/password
  - JWT token generation
  - Protected routes
  - Password reset flow
  - Email verification
- Error handling middleware
- Input validation
- API documentation
- Test environment setup

### Changed
- Improved project structure
- Updated dependencies
- Enhanced security configurations

### Fixed
- Environment variable loading issues
- Database connection problems
- API response formatting

## [0.3.0] - 2025-05-05
### Added
- Exam management system
  - Create and manage exams
  - Add/remove questions
  - Set time limits
  - Configure passing scores
- Question bank
  - CRUD operations for questions
  - Categorization
  - Difficulty levels
- User progress tracking
  - Exam history
  - Performance analytics
  - Score tracking

### Changed
- Improved API structure
- Enhanced error messages
- Optimized database queries

### Fixed
- Authentication token handling
- Input validation edge cases
- Database connection issues

[Unreleased]: https://github.com/yourusername/exam-buddy/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/yourusername/exam-buddy/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/yourusername/exam-buddy/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yourusername/exam-buddy/releases/tag/v0.1.0
