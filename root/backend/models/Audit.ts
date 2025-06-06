import mongoose, { Document, Schema } from 'mongoose';

export interface IAudit extends Document {
  fullName: string;
  companyName: string;
  email: string;
  website?: string;
  industry: string;
  challenges: string;
  revenue?: string;
  teamSize?: string;
  createdAt: Date;
}

const AuditSchema = new Schema<IAudit>({
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  website: String,
  industry: { type: String, required: true },
  challenges: { type: String, required: true },
  revenue: String,
  teamSize: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAudit>('Audit', AuditSchema);