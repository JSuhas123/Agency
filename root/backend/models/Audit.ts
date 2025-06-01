import { Document, model, Schema } from 'mongoose';

// 1. Define a TypeScript interface for type safety
export interface IAudit extends Document {
  fullName: string;
  email: string;
  company: string;
  website?: string;
  industry: string;
  challenges?: string;
  submittedAt: Date;
}

// 2. Create Mongoose schema
const AuditSchema: Schema = new Schema<IAudit>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    required: true,
  },
  challenges: {
    type: String,
    maxlength: 1000,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Export the model
export const AuditModel = model<IAudit>('Audit', AuditSchema);
