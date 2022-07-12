import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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

// Update the date every time a company entity is created or updated
companySchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model('Company', companySchema);
