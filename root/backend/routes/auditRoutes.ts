import express from 'express';
import { submitAudit } from '../controllers/auditController';
const router = express.Router();

router.post('/submit', submitAudit);
export default router;
