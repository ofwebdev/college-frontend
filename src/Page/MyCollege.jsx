import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Divider,
  Button,
  Flex,
} from "@chakra-ui/react";
import MainLayout from "../Layout/MainLayout";
import { Link } from "react-router-dom";
import ReviewModal from "../components/ReviewModel";
import axios from "axios";
import Swal from "sweetalert2";

function MyCollege() {
  const [admissionData, setAdmissionData] = useState([]);

  useEffect(() => {
    // Fetch admission data from the backend
    fetch("http://localhost:5000/admission")
      .then((response) => response.json())
      .then((data) => setAdmissionData(data))
      .catch((error) => console.error("Error fetching admission data:", error));
  }, []);

  const handleReviewSubmit = async (data) => {
    try {
      // Send the review data to the backend using axios
      const response = await axios.post("http://localhost:5000/reviews", data);

      if (response.status === 200) {
        // Review submission successful
        console.log("Review submitted successfully:", response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review add successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to submit review:", response.data);
        // You can display an error message to the user here
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      // You can display an error message to the user here
    }
  };

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
              <Flex
                justifyContent={{ base: "center", md: "space-between" }}
                alignItems="center"
                flexWrap="wrap"
                mt={5}
              >
                <Link to={`/details/${data.collegeId}`}>
                  <Button
                    flex={{ base: "1", md: "auto" }}
                    fontSize={"sm"}
                    rounded={"full"}
                    bg={"blue.400"}
                    color={"white"}
                    px={{ base: 10, md: 20 }}
                    mb={{ base: 2, md: 0 }}
                    mr={{ base: 0, md: 0, sm: 3 }}
                    boxShadow={
                      "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                    }
                    _hover={{
                      bg: "blue.500",
                    }}
                    _focus={{
                      bg: "blue.500",
                    }}
                  >
                    Details
                  </Button>
                </Link>
                <ReviewModal onSubmitForm={handleReviewSubmit} />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </MainLayout>
  );
}

export default MyCollege;
