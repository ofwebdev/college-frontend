import React, { useState, useEffect } from "react";
import {
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
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const AdmissionEditForm = ({
  isOpen,
  onClose,
  initialValues,
  onUpdateData,
}) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    // Fetch the list of colleges from your API
    fetch("http://localhost:5000/college")
      .then((response) => response.json())
      .then((data) => setColleges(data))
      .catch((error) => console.error("Error fetching colleges:", error));
  }, []);

  // Set initial form values when the popup is opened
  useEffect(() => {
    if (isOpen && initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setValue(key, initialValues[key]);
      });
    }
  }, [isOpen, initialValues, setValue]);

  const handleFormSubmit = (data) => {
    onUpdateData(data); // Call the function to update the admission data
    onClose(); // Close the popup after submitting
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
  );
};

export default AdmissionEditForm;
