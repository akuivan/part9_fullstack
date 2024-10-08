export enum Gender {
      female = 'female',
      male = 'male',
      other = 'other'
}

export interface Diagnose {
        code: string;
        name: string;
        latin?: string;
};

export interface Patient {
      id: string;
      name: string;
      dateOfBirth: string;
      ssn: string;
      gender: Gender;
      occupation: string;
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

