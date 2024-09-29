export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
  id: string;
  date: string;
  specialist: string;
  type: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
}

export interface HospitalEntry extends Entry {
  type: 'Hospital';
  discharge: {
        date: string;
        criteria: string;
        };
}   

export interface OccupationalHealthcareEntry extends Entry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
        startDate: string;
        endDate: string;
  };
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends Entry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: Array<HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry>;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

/*

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: string[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

*/