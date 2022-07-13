import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: Number,
    required: true
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  jobs_applies: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  auth_token: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
});

// Update the date every time a job entity is created or updated
userSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default model('User', userSchema);
