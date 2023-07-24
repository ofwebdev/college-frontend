import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  List,
  ListItem,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import { AuthContext } from "../provider/AuthProvider";
import MainLayout from "../Layout/MainLayout";
import AdmissionEditForm from "./AdmissionEditForm";
import axios from "axios";
import Swal from "sweetalert2";

function Profile() {
  const [admissionData, setAdmissionData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmissionData, setSelectedAdmissionData] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/admission")
      .then((response) => response.json())
      .then((data) => setAdmissionData(data))
      .catch((error) => console.error("Error fetching admission data:", error));
  }, []);

  const handleEditClick = (data) => {
    setSelectedAdmissionData(data);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateData = async (admissionId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admission/${admissionId._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      // Check if the response is successful
      if (response.ok) {
        console.log("Admission data updated successfully");
        // Update the local state if needed
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to update admission data:", response.statusText);
        // Handle the error if needed
      }
    } catch (error) {
      console.error("Error updating admission data:", error);
      // Handle the error if needed
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <Box bg={useColorModeValue("gray.100", "gray.700")} py={16}>
        <Stack spacing={3} align="center">
          <Avatar size="xl" name={user.name} src={user.avatarSrc} />
          <Heading style={{ marginBottom: "5px" }}>{user.displayName}</Heading>
          <Text>Email: {user.email}</Text>
        </Stack>

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
                <Flex justifyContent="flex-end">
                  <Button
                    onClick={() => handleEditClick(data)}
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    mr={2}
                  >
                    Edit
                  </Button>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      {/* Edit Admission Data Popup */}
      {selectedAdmissionData && (
        <AdmissionEditForm
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          initialValues={selectedAdmissionData}
          onUpdateData={handleUpdateData}
        />
      )}
    </MainLayout>
  );
}

export default Profile;
