import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import { Typography, Container } from "@mui/material";

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
    </Container>
  ) : (
    <Typography>Patient not found</Typography>
  );
};

export default PatientDetailPage;
