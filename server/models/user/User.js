import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false, // Do not return password by default when querying users
  },
  role: {
    type: String,
    enum: ['Student', 'Admin', 'ExamManager'],
    default: 'Student',
  },
  profilePictureUrl: {
    type: String,
    default: '/default_avatar.png', // Placeholder path
  },
  targetExams: {
    type: [String], // Consider changing to [mongoose.Schema.Types.ObjectId] later if linking to an Exam collection
    default: [],
  },
  phoneNumber: {
    type: String,
    // Add validation if needed
  },
  preferredLanguage: {
    type: String,
    default: 'English',
  },
  subscriptionTier: {
    type: String,
    default: 'Free',
    // Could add enum later if needed: ['Free', 'Premium']
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  passwordResetToken: String,
  passwordResetTokenExpiry: Date,
  lastLogin: {
    type: Date,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  // Consider adding fields for tracking progress later
  // testAttempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestAttempt' }]
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Middleware: Hash password before saving user
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method: Compare entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method: Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to passwordResetToken field
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time (e.g., 10 minutes)
  this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 mins

  // Return the unhashed token (to be sent to the user, e.g., via email)
  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
