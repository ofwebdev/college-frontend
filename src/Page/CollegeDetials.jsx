import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Center,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

function CollegeDetails() {
  const { id } = useParams();
  const [collegeDetails, setCollegeDetails] = useState(null);

  useEffect(() => {
    // Fetch college details from the API
    fetch(`http://localhost:5000/college/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched college details
        setCollegeDetails(data);
      })
      .catch((error) => {
        console.log("Error fetching college details:", error);
      });
  }, [id]);

  if (!collegeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 1 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={collegeDetails.image}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {collegeDetails.name}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                Admission date : {collegeDetails.admissionDate}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Events
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  {collegeDetails.events.map((event, index) => (
                    <List key={index} spacing={2}>
                      <ListItem>{event.name}</ListItem>
                      <ListItem>{event.date}</ListItem>
                      <ListItem>{event.location}</ListItem>
                      <ListItem>{event.description}</ListItem>
                    </List>
                  ))}
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Sports Facilities
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  {collegeDetails.sportsFacilities.map((event, index) => (
                    <List key={index} spacing={2}>
                      <ListItem>{event.name}</ListItem>
                      <ListItem>{event.date}</ListItem>
                      <ListItem>{event.location}</ListItem>
                      <ListItem>{event.description}</ListItem>
                    </List>
                  ))}
                </SimpleGrid>
              </Box>
            </Stack>

            <Center>
              <Link to={"/"}>
                <Button
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
                  Admission now
                </Button>
              </Link>
            </Center>
          </Stack>
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
}

export default CollegeDetails;
