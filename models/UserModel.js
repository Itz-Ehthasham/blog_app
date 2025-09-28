import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  blogCount: {
    type: Number,
    default: 0
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create username from firstName and email
userSchema.virtual('username').get(function() {
  return `${this.firstName}_${this.email.split('@')[0]}`;
});

// Ensure virtual fields are included in JSON output
userSchema.set('toJSON', { virtuals: true });

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;
