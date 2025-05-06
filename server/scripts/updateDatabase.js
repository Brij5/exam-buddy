import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user/User.js';
import ExamCategory from '../models/category/ExamCategory.js';
import Exam from '../models/exam/Exam.js';

// Load environment variables
dotenv.config({ path: '../../.env' });

// Default MongoDB URI
const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/exam-buddy-dev';

// Database connection
const connectDB = async () => {
  try {
    // Use environment variable if available, otherwise use default
    const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGO_URI;
    
    console.log('🔌 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    
    console.log(`✅ MongoDB Connected successfully to ${mongoUri}`);
    
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

// Enhanced user data with secure passwords and additional fields
const users = [
  {
    name: 'Admin User',
    email: 'admin@exambuddy.com',
    password: 'Admin@Secure123',
    role: 'Admin',
    isVerified: true,
    profilePictureUrl: '/default_avatar.png',
    phoneNumber: '+911234567890',
    preferredLanguage: 'English',
    subscriptionTier: 'Premium',
    targetExams: []
  },
  {
    name: 'Exam Manager',
    email: 'manager@exambuddy.com',
    password: 'Manager@Secure456',
    role: 'ExamManager',
    isVerified: true,
    profilePictureUrl: '/default_avatar.png',
    phoneNumber: '+911234567891',
    preferredLanguage: 'English',
    subscriptionTier: 'Premium',
    targetExams: []
  },
  {
    name: 'Priya Sharma',
    email: 'priya@exambuddy.com',
    password: 'Student@Secure789',
    role: 'Student',
    isVerified: true,
    profilePictureUrl: '/default_avatar.png',
    phoneNumber: '+911234567892',
    preferredLanguage: 'Hindi',
    subscriptionTier: 'Free',
    targetExams: ['UPSC', 'Banking']
  },
  {
    name: 'Rahul Kumar',
    email: 'rahul@exambuddy.com',
    password: 'Student@Secure101',
    role: 'Student',
    isVerified: true,
    profilePictureUrl: '/default_avatar.png',
    phoneNumber: '+911234567893',
    preferredLanguage: 'English',
    subscriptionTier: 'Premium',
    targetExams: ['JEE', 'NEET']
  },
  {
    name: 'Anjali Patel',
    email: 'anjali@exambuddy.com',
    password: 'Student@Secure202',
    role: 'Student',
    isVerified: true,
    profilePictureUrl: '/default_avatar.png',
    phoneNumber: '+911234567894',
    preferredLanguage: 'Gujarati',
    subscriptionTier: 'Free',
    targetExams: ['SSC', 'Banking']
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
    // Fetch some category IDs to assign to the Exam Manager
    const civilServicesCategory = await ExamCategory.findOne({ name: 'Civil Services' });
    const sscCategory = await ExamCategory.findOne({ name: 'SSC' });

    const managerAssignedCategoryIds = [];
    if (civilServicesCategory) managerAssignedCategoryIds.push(civilServicesCategory._id);
    if (sscCategory) managerAssignedCategoryIds.push(sscCategory._id);

    for (const user of users) {
      console.log(`Updating user: ${user.email}`);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      let userData = { ...user, password: hashedPassword };

      if (user.email === 'manager@exambuddy.com') {
        userData.managedCategoryIds = managerAssignedCategoryIds;
        console.log(`Assigning categories to Exam Manager: ${managerAssignedCategoryIds.join(', ')}`);
      }

      await User.findOneAndUpdate(
        { email: user.email },
        userData,
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
    
    // Run updates in sequence: Categories first, then Users
    console.log('\n🔄 Updating exam categories...');
    await updateExamCategories();

    console.log('\n🔄 Updating users...');
    await updateUsers();
    
    console.log('\n✅ Database update completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating database:', error);
    process.exit(1);
  }
};

// Run the update
updateDatabase();
