"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isHealthCheckEntry = (entry) => {
    return entry.type === 'HealthCheck' &&
        isString(entry.date) &&
        isString(entry.specialist) &&
        isString(entry.description) &&
        entry.healthCheckRating in types_1.HealthCheckRating;
};
const isHospitalEntry = (entry) => {
    var _a, _b;
    return entry.type === 'Hospital' &&
        isString(entry.date) &&
        isString(entry.specialist) &&
        isString(entry.description) &&
        isString((_a = entry.discharge) === null || _a === void 0 ? void 0 : _a.date) &&
        isString((_b = entry.discharge) === null || _b === void 0 ? void 0 : _b.criteria);
};
const isOccupationalHealthcareEntry = (entry) => {
    return entry.type === 'OccupationalHealthcare' &&
        isString(entry.date) &&
        isString(entry.specialist) &&
        isString(entry.description) &&
        isString(entry.employerName) &&
        (entry.sickLeave === undefined || (isString(entry.sickLeave.startDate) &&
            isString(entry.sickLeave.endDate)));
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseEntries = (entries) => {
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
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatient = {
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
exports.toNewPatient = toNewPatient;
exports.default = exports.toNewPatient;
