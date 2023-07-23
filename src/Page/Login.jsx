import { useContext, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GmailLogin from "../components/Login/GmailLogin";
import GithubLogin from "../components/Login/GithubLogin";
import FacebookLogin from "../components/Login/FacebookLogin";

export default function Login() {
  // Add a state to manage the "Remember me" checkbox
  const [rememberMe, setRememberMe] = useState(false);

  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        reset(); // Reset the form after successful submission

        // Navigate to the desired location
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          console.log("Firebase Error:", error.message);
          // Display a generic error message or handle other Firebase errors
        }
      });
  };

  // Handle the "Remember me" checkbox change
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <FormErrorMessage>Email is required</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <FormErrorMessage>First name is required</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                  mt={2}
                >
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  >
                    Remember me
                  </Checkbox>
                  <Link to={"/forgot"} color={"blue.400"}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>

                {/* Social login  */}
                <GmailLogin />
                <GithubLogin />
                {/* <FacebookLogin /> */}

                <Text fontSize={"lg"}>
                  New to our application? <Link to={"/register"}>Register</Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
