import { NewPatient, Gender, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  return entry.type === 'HealthCheck' && 
    isString(entry.date) && 
    isString(entry.specialist) &&
    isString(entry.description) &&
    entry.healthCheckRating in HealthCheckRating 
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  return entry.type === 'Hospital' && 
    isString(entry.date) && 
    isString(entry.specialist) &&
    isString(entry.description) &&
    isString(entry.discharge?.date) &&
    isString(entry.discharge?.criteria);
};

const isOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
  return entry.type === 'OccupationalHealthcare' && 
    isString(entry.date) && 
    isString(entry.specialist) &&
    isString(entry.description) &&
    isString(entry.employerName) &&
    (entry.sickLeave === undefined || (
      isString(entry.sickLeave.startDate) && 
      isString(entry.sickLeave.endDate)
    ));
};


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      throw new Error('Incorrect or missing date of birth');
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const isGender = (param:string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseEntries = (entries: unknown): Array<HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry> => {
  if (!Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }

  return entries.map(entry => {
    if (isHospitalEntry(entry)) {
      return entry;
    }
    if (isOccupationalHealthcareEntry(entry)) {
      return entry;
    }
    if (isHealthCheckEntry(entry)) {
      return entry;
    }
    throw new Error('Incorrect entry type');
  });
};

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
  }
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
      const newPatient :NewPatient = {
          name: parseName(object.name),
          dateOfBirth: parseDateOfBirth(object.dateOfBirth),
          ssn: parseSsn(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseOccupation(object.occupation),
          entries: parseEntries(object.entries),
      };
      return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
