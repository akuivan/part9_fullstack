import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Patient, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";
import { apiBaseUrl } from "../../constants";
import { Typography, Container, List, Box } from "@mui/material";

interface PatientDetailPageProps {
  diagnoses: Diagnosis[];
}

// Helper function to render entry details
const renderEntryDetails = (
  entry: HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry, 
  diagnoses: Diagnosis[]
) => {
  // Helper function to get diagnosis name by code
  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : "Unknown diagnosis";
  };

  return (
    <Box key={entry.id} mb={2}>
      <Typography>Date: {entry.date}</Typography>
      <Typography>Description: {entry.description}</Typography>
      {entry.diagnosisCodes && (
        <div>
          <Typography variant="body1">Diagnosis codes:</Typography>
          <ul>
            {entry.diagnosisCodes.map(code => (
              <li key={code}>
                {code} - {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Typography>Specialist: {entry.specialist}</Typography>
      {entry.type === "Hospital" && (
        <>
          <Typography>Discharge Date: {entry.discharge.date}</Typography>
          <Typography>Discharge Criteria: {entry.discharge.criteria}</Typography>
        </>
      )}
      {entry.type === "OccupationalHealthcare" && entry.sickLeave && (
        <>
          <Typography>Sick Leave Start: {entry.sickLeave.startDate}</Typography>
          <Typography>Sick Leave End: {entry.sickLeave.endDate}</Typography>
        </>
      )}
      {entry.type === "HealthCheck" && (
        <Typography>Health Check Rating: {entry.healthCheckRating}</Typography>
      )}
    </Box>
  );
};


const PatientDetailPage = ({ diagnoses }: PatientDetailPageProps) => {
  const { id } = useParams<{ id: string }>(); // Get patient ID from URL
  const [patient, setPatient] = useState<Patient | null>(null);
  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
        
      } catch (e) {
        console.error(e);
      }
    };    
    void fetchPatient();
  }, [id]);

  return patient ? (
    <Container>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Date of Birth: {patient.dateOfBirth}</Typography>

      <Typography variant="h6">Entries:</Typography>
      <List>
        {patient.entries?.map(entry => renderEntryDetails(entry, diagnoses))}
      </List>
    </Container>
  ) : (
    <Typography>Patient not found</Typography>
  );
};
export default PatientDetailPage;
