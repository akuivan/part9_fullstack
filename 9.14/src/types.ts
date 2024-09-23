import { z } from 'zod';
import { NewPatientSchema } from './utils';

export enum Gender {
      female = 'female',
      male = 'male',
      other = 'other'
}

export interface Diagnose {
        code: string;
        name: string;
        latin?: string;
}

//export type NewPatient = Omit<Patient, 'id'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
      id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

