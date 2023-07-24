import React, { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListIcon,
  Box,
  Divider,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import MainLayout from "../Layout/MainLayout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const schema = yup.object().shape({
  candidateName: yup.string().required("Candidate Name is required"),
  subject: yup.string().required("Subject is required"),
  candidateEmail: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  candidatePhone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  // Add validation rules for other fields here
});

function Admission() {
  const [colleges, setColleges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    // Fetch the list of colleges from your API
    fetch("http://localhost:5000/college")
      .then((response) => response.json())
      .then((data) => setColleges(data))
      .catch((error) => console.error("Error fetching colleges:", error));
  }, []);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCollegeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Find the selected college object based on the college name
      const selectedCollege = colleges.find(
        (college) => college.name === data.college
      );

      // Update the "college" field in the form data to include the college ID
      data.collegeId = selectedCollege?._id || "";
      // Make a POST request to the server with the form data
      const response = await fetch("http://localhost:5000/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Handle success or display error message based on the response
      if (response.ok) {
        console.log("Admission data added successfully:", result);
        // Show a success message using SweetAlert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Admission successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        // Close the modal after showing the success message
        handleCloseModal();
      } else {
        console.error("Failed to add admission data:", result.message);
        // You can display an error message to the user here
      }
    } catch (error) {
      console.error("Error adding admission data:", error);
      // You can display an error message to the user here
    }
  };

  return (
    <MainLayout>
      <Box maxW="600px" m="auto" py={20} px={10}>
        <Heading as={"h5"} size={"md"}>
          List of Colleges
        </Heading>
        <Divider my={5} />
        <List spacing={3}>
          {colleges.map((college) => (
            <ListItem
              key={college._id}
              onClick={handleCollegeClick}
              style={{ cursor: "pointer" }}
            >
              <ListIcon as={CheckIcon} color="green.500" />
              {/* <Link to={"/lol"}> */}
              {college.name}
              {/* </Link> */}
            </ListItem>
          ))}
        </List>
      </Box>

      {user ? (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>Admission Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isInvalid={errors.candidateName}>
                  <FormLabel>Candidate Name</FormLabel>
                  <Input type="text" {...register("candidateName")} />
                  {errors.candidateName && (
                    <Box color="red.500" mt={1}>
                      {errors.candidateName.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.subject}>
                  <FormLabel>Subject</FormLabel>
                  <Input type="text" {...register("subject")} />
                  {errors.subject && (
                    <Box color="red.500" mt={1}>
                      {errors.subject.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.candidateEmail}>
                  <FormLabel>Candidate Email</FormLabel>
                  <Input type="email" {...register("candidateEmail")} />
                  {errors.candidateEmail && (
                    <Box color="red.500" mt={1}>
                      {errors.candidateEmail.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.candidatePhone}>
                  <FormLabel>Candidate Phone Number</FormLabel>
                  <Input type="tel" {...register("candidatePhone")} />
                  {errors.candidatePhone && (
                    <Box color="red.500" mt={1}>
                      {errors.candidatePhone.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.address}>
                  <FormLabel>Address</FormLabel>
                  <Textarea {...register("address")} />
                  {errors.address && (
                    <Box color="red.500" mt={1}>
                      {errors.address.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.dateOfBirth}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" {...register("dateOfBirth")} />
                  {errors.dateOfBirth && (
                    <Box color="red.500" mt={1}>
                      {errors.dateOfBirth.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.image}>
                  <FormLabel>Image</FormLabel>
                  <Input type="file" accept="image/*" {...register("image")} />
                  {errors.image && (
                    <Box color="red.500" mt={1}>
                      {errors.image.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.college}>
                  <FormLabel>College</FormLabel>
                  <Select {...register("college")}>
                    {colleges.map((college) => (
                      <option key={college._id} value={college.name}>
                        {college.name}
                        {/* {college._id} */}
                      </option>
                    ))}
                  </Select>
                  {errors.college && (
                    <Box color="red.500" mt={1}>
                      {errors.college.message}
                    </Box>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  px={20}
                  mt={5}
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
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      ) : null}
    </MainLayout>
  );
}

export default Admission;
