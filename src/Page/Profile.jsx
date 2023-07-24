import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

function Profile() {
  // Replace the dummy user data with actual user data fetched from your API
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    university: "Sample University",
    address: "Sample Address",
    avatarSrc:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")} py={16}>
      <Stack spacing={8} align="center">
        <Avatar size="xl" name={user.name} src={user.avatarSrc} />
        <Heading>{user.name}</Heading>
        <Text>Email: {user.email}</Text>
        <Text>University: {user.university}</Text>
        <Text>Address: {user.address}</Text>
      </Stack>
    </Box>
  );
}

export default Profile;
