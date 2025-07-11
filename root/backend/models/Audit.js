import mongoose from 'mongoose';

const AuditSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  website: String,
  industry: { type: String, required: true },
  challenges: { type: String, required: true },
  revenue: String,
  teamSize: String,
  // AI Audit Features (now store recommendations/outputs)
  aiOpportunityMapping: { type: [String], default: [] },
  roiProjectionAnalysis: { type: String, default: '' },
  customAIStrategyBlueprint: { type: [String], default: [] },
  riskAssessmentMitigation: { type: [String], default: [] },
  teamReadinessEvaluation: { type: String, default: '' },
  priorityImplementationPlan: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Audit = mongoose.model('Audit', AuditSchema);
export default Audit;
