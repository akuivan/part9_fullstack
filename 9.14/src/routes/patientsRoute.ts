import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewPatient, NonSensitivePatient } from '../types';
import {NewPatientSchema} from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getPublicPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>,res: Response<NewPatient>) => {
    const addedPatient= patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;