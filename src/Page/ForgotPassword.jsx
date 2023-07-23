import { useContext, useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";

export default function ForgotPassword() {
  const [resetSuccess, setResetSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { recoverPassword } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await recoverPassword(email);
      setResetSuccess(true);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        {resetSuccess ? ( // Conditionally render the success message
          <>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Reset Email Sent!
            </Heading>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              Please check your email for the password reset link.
            </Text>
          </>
        ) : (
          // Render the password reset form
          <>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Forgot your password?
            </Heading>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              You&apos;ll get an email with a reset link
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" isInvalid={!!errors.email} mb={3}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                  _placeholder={{ color: "gray.500" }}
                />
                {errors.email && (
                  <FormErrorMessage>Email is required</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={6}>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Request Reset
                </Button>
              </Stack>
            </form>
          </>
        )}
      </Stack>
    </Flex>
  );
}
