import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  Container,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CollegeCards() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    // Function to fetch college data from the server
    const fetchColleges = async () => {
      try {
        const response = await fetch("http://localhost:5000/college");
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    // Call the fetchColleges function when the component mounts
    fetchColleges();
  }, []);

  const threeColleges = colleges.slice(0, 3);
  return (
    <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
      <Stack spacing={0} align={"center"}>
        <Heading>Top Campus</Heading>
        <Text>We have been working with clients around the world</Text>
      </Stack>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing="30px"
        marginTop="5"
      >
        {threeColleges.map((college) => (
          <Box w="100%" key={college._id}>
            <Box
              borderRadius="lg"
              overflow="hidden"
              // style={{ height: "400px" }}
            >
              <Link to={`/details/${college._id}`}>
                <Image
                  transform="scale(1.0)"
                  src={college.image}
                  alt="some text"
                  objectFit="cover"
                  width="100%"
                  height={"200px"}
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Link>
            </Box>

            <Box>
              <Heading as="h4" size="md" textAlign={"center"} mt={2}>
                {college.name}
              </Heading>
            </Box>

            <Center>
              <Link to={`/details/${college._id}`}>
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
                  Details
                </Button>
              </Link>
            </Center>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default CollegeCards;
