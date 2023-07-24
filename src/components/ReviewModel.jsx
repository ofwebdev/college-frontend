import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  role: yup.string().required("Role is required"),
  title: yup.string().required("Title is required"),
  comment: yup.string().required("Comment is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be greater than 5")
    .required("Rating is required"),
});

const ReviewModal = ({ onSubmitForm }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultValues = {
    name: "",
    role: "",
    title: "",
    comment: "",
    rating: "",
  };
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues, // Add the defaultValues option here
  });

  const onSubmit = (data) => {
    const rating = parseInt(data.rating);

    if (rating < 1 || rating > 5) {
      // Show an error toast
      toast({
        title: "Invalid Rating",
        description: "Please enter a rating between 1 and 5.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      if (onSubmitForm) {
        onSubmitForm(data);
        onClose();
      }
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        fontSize={"sm"}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
        px={20}
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
        Add Review
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.name && (
                  <Box color="red.500" mt={1}>
                    {errors.name.message}
                  </Box>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.role}>
                <FormLabel>Role</FormLabel>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="student">Student</option>
                      <option value="guardian">Guardian</option>
                    </Select>
                  )}
                />
                {errors.role && (
                  <Box color="red.500" mt={1}>
                    {errors.role.message}
                  </Box>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.title && (
                  <Box color="red.500" mt={1}>
                    {errors.title.message}
                  </Box>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.comment}>
                <FormLabel>Comment</FormLabel>
                <Controller
                  name="comment"
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
                {errors.comment && (
                  <Box color="red.500" mt={1}>
                    {errors.comment.message}
                  </Box>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.rating}>
                <FormLabel>Rating</FormLabel>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => <Input {...field} type="number" />}
                />
                {errors.rating && (
                  <Box color="red.500" mt={1}>
                    {errors.rating.message}
                  </Box>
                )}
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit(onSubmit)}
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
