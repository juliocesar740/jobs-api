import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  remote: {
    type: Boolean,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  closed: {
    type: Boolean,
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

// Update the date every time a job entity is created or updated
jobSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default model('Job', jobSchema);
