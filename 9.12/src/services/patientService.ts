import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients ;
};

const getPublicPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatient): Patient => {
  const newPatient= {
    id: uuid(),
    ... entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    getPublicPatients,
    addPatient
};