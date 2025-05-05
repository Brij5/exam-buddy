import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../server/models/User.js';
import ExamCategory from '../server/models/ExamCategory.js';
import Exam from '../server/models/Exam.js';

dotenv.config();

// Default MongoDB connection string
const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/exam-buddy';

// Database connection
const connectDB = async () => {
  try {
    // Use environment variable if available, otherwise use default
    const mongoUri = 'mongodb://localhost:27017/exam-buddy';
    
    console.log('🔌 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    
    console.log('✅ MongoDB Connected successfully');
    
    // Verify the connection
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('🔗 Established MongoDB connection');
    });
    
    return db;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
};

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'Admin',
    isVerified: true
  },
  {
    name: 'Exam Manager',
    email: 'exammanager@example.com',
    password: 'manager123',
    role: 'ExamManager',
    isVerified: true
  },
  {
    name: 'Priya',
    email: 'priya@example.com',
    password: 'priya123',
    role: 'Student',
    isVerified: true
  },
  {
    name: 'Rahul',
    email: 'rahul@example.com',
    password: 'rahul123',
    role: 'Student',
    isVerified: true
  }
];

const examCategories = [
  {
    name: 'Civil Services',
    description: 'Exams for civil services and government jobs'
  },
  {
    name: 'SSC',
    description: 'Staff Selection Commission exams'
  },
  {
    name: 'Banking',
    description: 'Banking sector recruitment exams'
  },
  {
    name: 'University Entrance',
    description: 'Entrance exams for universities and colleges'
  }
];

// Update or create users
const updateUsers = async () => {
  try {
    for (const user of users) {
      console.log(`Updating user: ${user.email}`);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      await User.findOneAndUpdate(
        { email: user.email },
        { ...user, password: hashedPassword },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log('✅ Users updated successfully');
  } catch (error) {
    console.error('❌ Error updating users:', error);
    throw error;
  }
};

// Update or create exam categories
const updateExamCategories = async () => {
  try {
    for (const category of examCategories) {
      console.log(`Updating category: ${category.name}`);
      await ExamCategory.findOneAndUpdate(
        { name: category.name },
        category,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log('✅ Exam categories updated successfully');
  } catch (error) {
    console.error('❌ Error updating categories:', error);
    throw error;
  }
};

// Main function to run all updates
const updateDatabase = async () => {
  try {
    console.log('🚀 Starting database update...');
    
    await connectDB();
    
    // Run updates in sequence
    console.log('\n🔄 Updating users...');
    await updateUsers();
    
    console.log('\n🔄 Updating exam categories...');
    await updateExamCategories();
    
    console.log('\n✅ Database update completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating database:', error);
    process.exit(1);
  }
};

// Run the update
updateDatabase();
