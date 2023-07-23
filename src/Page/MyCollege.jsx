import React, { useEffect, useState } from "react";
import { Box, Heading, List, ListItem, Text, Divider } from "@chakra-ui/react";
import MainLayout from "../Layout/MainLayout";

function MyCollege() {
  const [admissionData, setAdmissionData] = useState([]);

  useEffect(() => {
    // Fetch admission data from the backend
    fetch("http://localhost:5000/admission")
      .then((response) => response.json())
      .then((data) => setAdmissionData(data))
      .catch((error) => console.error("Error fetching admission data:", error));
  }, []);

  return (
    <MainLayout>
      <Box maxW="600px" m="auto" py={20} px={10}>
        <Heading as="h2" size="lg" mb={4}>
          Admission Data
        </Heading>
        <Divider my={2} />
        <List spacing={4} mt={4}>
          {admissionData.map((data, index) => (
            <ListItem key={index} boxShadow="base" p={4} rounded="md">
              <Text fontWeight="bold">Candidate Name: </Text>
              <Text>{data.candidateName}</Text>
              <Text fontWeight="bold">Subject: </Text>
              <Text>{data.subject}</Text>
              <Text fontWeight="bold">Candidate Email: </Text>
              <Text>{data.candidateEmail}</Text>
              <Text fontWeight="bold">Candidate Mobile: </Text>
              <Text>{data.candidatePhone}</Text>
              <Text fontWeight="bold">University select : </Text>
              <Text>{data.college}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </MainLayout>
  );
}

export default MyCollege;
