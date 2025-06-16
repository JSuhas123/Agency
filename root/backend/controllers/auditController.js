import axios from 'axios';
import twilio from 'twilio';
import Audit from '../models/Audit.js';
import { sendAuditNotification } from '../utils/email.js';

export const submitAudit = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges,
      revenue,
      teamSize
    } = req.body;

    // --- Feature Logic ---
    // 1. AI Opportunity Mapping
    const aiOpportunityMapping = [];
    if (challenges && challenges.toLowerCase().includes('manual')) {
      aiOpportunityMapping.push('Automate manual workflows');
    }
    if (industry && industry.toLowerCase().includes('retail')) {
      aiOpportunityMapping.push('AI-driven inventory management');
    }
    if (industry && industry.toLowerCase().includes('finance')) {
      aiOpportunityMapping.push('Automated fraud detection');
    }
    if (challenges && challenges.toLowerCase().includes('support')) {
      aiOpportunityMapping.push('AI-powered customer support');
    }
    if (aiOpportunityMapping.length === 0) {
      aiOpportunityMapping.push('General business process automation');
    }

    // 2. ROI Projection Analysis
    let roiProjectionAnalysis = 'Estimated 20-40% cost reduction possible.';
    if (revenue && Number(revenue.replace(/[^\d]/g, '')) > 1000000) {
      roiProjectionAnalysis = 'Potential for ₹10L+ annual savings with AI.';
    }
    if (teamSize && Number(teamSize.replace(/[^\d]/g, '')) > 50) {
      roiProjectionAnalysis += ' Large team: high automation impact.';
    }

    // 3. Custom AI Strategy Blueprint
    const customAIStrategyBlueprint = [
      'Phase 1: Data collection & assessment (Weeks 1-2)',
      'Phase 2: AI model selection & prototyping (Weeks 3-5)',
      'Phase 3: Pilot deployment (Weeks 6-8)',
      'Phase 4: Full rollout & training (Weeks 9-12)'
    ];

    // 4. Risk Assessment & Mitigation
    const riskAssessmentMitigation = [];
    if (challenges && challenges.toLowerCase().includes('data')) {
      riskAssessmentMitigation.push('Risk: Data quality. Mitigation: Data cleaning pipeline.');
    }
    if (industry && industry.toLowerCase().includes('health')) {
      riskAssessmentMitigation.push('Risk: Compliance. Mitigation: HIPAA/GDPR checks.');
    }
    if (riskAssessmentMitigation.length === 0) {
      riskAssessmentMitigation.push('Standard project risks: change management, user adoption.');
    }

    // 5. Team Readiness Evaluation
    let teamReadinessEvaluation = 'Team size sufficient for pilot.';
    if (teamSize && Number(teamSize.replace(/[^\d]/g, '')) < 5) {
      teamReadinessEvaluation = 'Small team: recommend external support or training.';
    }

    // 6. Priority Implementation Plan
    const priorityImplementationPlan = [
      '1. Quick-win automation (1-2 months)',
      '2. AI analytics dashboard (2-3 months)',
      '3. Advanced AI integrations (3+ months)'
    ];

    // Save to MongoDB
    const audit = new Audit({
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges,
      revenue,
      teamSize,
      aiOpportunityMapping,
      roiProjectionAnalysis,
      customAIStrategyBlueprint,
      riskAssessmentMitigation,
      teamReadinessEvaluation,
      priorityImplementationPlan
    });
    await audit.save();

    // Send email notification to client and admin with recommendations
    await sendAuditNotification({
      fullName,
      companyName,
      email,
      website,
      industry,
      challenges,
      recommendations: {
        aiOpportunityMapping,
        roiProjectionAnalysis,
        customAIStrategyBlueprint,
        riskAssessmentMitigation,
        teamReadinessEvaluation,
        priorityImplementationPlan
      }
    });

    // WhatsApp notification (using Twilio API)
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    await client.messages.create({
      body: `New AI Audit for ${fullName} (${companyName}):\nAI Opportunities: ${aiOpportunityMapping.join(', ')}\nROI: ${roiProjectionAnalysis}`,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+919036329838'
    });

    // Slack notification
    if (process.env.SLACK_WEBHOOK_URL) {
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `🧠 *New AI Audit Request*\n*Name:* ${fullName}\n*Company:* ${companyName}\n*Email:* ${email}\n*Industry:* ${industry}\n*Challenges:* ${challenges.slice(0, 100)}...`
      });
    }

    // Zapier webhook for CRM integration
    if (process.env.ZAPIER_WEBHOOK_URL) {
      await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
        ...req.body,
        audit_value: 1375000,
        source: 'AI Audit Landing Page'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Audit request submitted successfully!',
      recommendations: {
        aiOpportunityMapping,
        roiProjectionAnalysis,
        customAIStrategyBlueprint,
        riskAssessmentMitigation,
        teamReadinessEvaluation,
        priorityImplementationPlan
      }
    });
  } catch (error) {
    console.error('Error submitting audit:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      details: error && error.message ? error.message : String(error)
    });
  }
};
