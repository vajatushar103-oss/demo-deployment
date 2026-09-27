import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true 
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String, 
      enum: ['admin', 'staff'], 
      default: 'staff', 
      required: true 
    },

    isActive: { 
      type: Boolean, 
      default: true 
    },

    lastLoginAt: { 
      type: Date, 
      default: null 
    }
  },
  { 
    timestamps: true 
  }
);

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('User', userSchema);
