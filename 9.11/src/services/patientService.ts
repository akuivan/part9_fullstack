import patients from '../../data/patients';
import { PatientEntry, PublicPatientEntry } from '../types';

const getPatients = (): PatientEntry[] => {
  return patients ;
};

const getPublicPatients = (): PublicPatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
  };

export default {
    getPatients,
    getPublicPatients
};