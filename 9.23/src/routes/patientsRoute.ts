import express from 'express';
import { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient, Patient } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req,res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient= patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
  res.status(400).send(errorMessage);
  }
});

export default router;