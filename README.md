# Exam Buddy

A comprehensive exam preparation platform that helps students study more effectively.

## 🚀 Features

- **User Authentication** - Secure login with JWT and OAuth
- **Exam Management** - Create, update, and manage exams
- **Question Bank** - Extensive collection of practice questions
- **Performance Analytics** - Track progress and identify weak areas
- **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Project Structure

```
exam-buddy/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── assets/        # Images, fonts, etc.
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── services/      # API services
│       └── store/         # State management
│
├── server/               # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── middleware/       # Express middleware
│
├── docker/              # Docker configuration
│   ├── nginx/           # Nginx configuration
│   └── mongo/           # MongoDB configuration
│
├── docs/                # Documentation
│   ├── api/             # API documentation
│   └── architecture/    # Architecture decisions
│
├── .env.example        # Example environment variables
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🛠️ Prerequisites

- Node.js (v18+)
- npm (v9+)
- MongoDB (v6+)
- Docker (optional, for containerization)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/exam-buddy.git
cd exam-buddy
```

### 2. Set up environment variables

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

### 3. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 4. Start the development servers

#### Option 1: Using Docker (Recommended)

```bash
docker-compose up --build
```

#### Option 2: Manual Setup

Backend:
```bash
cd server
npm run dev
```

Frontend (in a new terminal):
```bash
cd client
npm run dev
```

## 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MongoDB:** mongodb://localhost:27017/exam-buddy

## 🧪 Running Tests

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd ../client
npm test
```

## 🐳 Docker Commands

- Build and start containers:
  ```bash
  docker-compose up --build
  ```

- Stop containers:
  ```bash
  docker-compose down
  ```

- View logs:
  ```bash
  docker-compose logs -f
  ```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Material-UI](https://mui.com/)
