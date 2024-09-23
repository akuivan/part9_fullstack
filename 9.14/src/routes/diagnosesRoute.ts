import express from 'express';
import { Response } from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;