import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Patient, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";
import { apiBaseUrl } from "../../constants";
import { Typography, Container, List, Box } from "@mui/material";


const renderEntryDetails = (entry: HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box key={entry.id}>
          <Typography variant="h6">Hospital Entry</Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Diagnosis codes: {entry.diagnosisCodes?.join(", ")}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Discharge Date: {entry.discharge.date}</Typography>
          <Typography>Discharge Criteria: {entry.discharge.criteria}</Typography>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box key={entry.id}>
          <Typography variant="h6">Occupational Healthcare Entry</Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Diagnosis codes: {entry.diagnosisCodes?.join(", ")}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <>
              <Typography>Sick Leave Start: {entry.sickLeave.startDate}</Typography>
              <Typography>Sick Leave End: {entry.sickLeave.endDate}</Typography>
            </>
          )}
        </Box>
      );

    case "HealthCheck":
      return (
        <Box key={entry.id}>
          <Typography variant="h6">Health Check Entry</Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Diagnosis codes: {entry.diagnosisCodes?.join(", ")}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Health Check Rating: {entry.healthCheckRating}</Typography>
        </Box>
      );
    default:
      return null; // Handle unexpected entry types
  }
};


const PatientDetailPage = () => {
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
        {patient.entries?.map(renderEntryDetails)}
      </List>
    </Container>
  ) : (
    <Typography>Patient not found</Typography>
  );
};
export default PatientDetailPage;
