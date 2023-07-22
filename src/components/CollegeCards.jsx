import React from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

// Sample data for college cards
const collegeCardsData = [
  {
    name: "College A",
    imageSrc:
      "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600",
    admissionDates: "August 2023",
    events: 10,
    researchHistory: "Established in 1990",
    sports: "Football, Basketball",
    detailsUrl: "/college-a",
  },
  {
    name: "College B",
    imageSrc:
      "https://images.pexels.com/photos/5538592/pexels-photo-5538592.jpeg?auto=compress&cs=tinysrgb&w=600",
    admissionDates: "September 2023",
    events: 15,
    researchHistory: "Founded in 1985",
    sports: "Cricket, Tennis",
    detailsUrl: "/college-b",
  },
  {
    name: "College C",
    imageSrc:
      "https://images.pexels.com/photos/6209356/pexels-photo-6209356.jpeg?auto=compress&cs=tinysrgb&w=600",
    admissionDates: "October 2023",
    events: 8,
    researchHistory: "Inaugurated in 2000",
    sports: "Volleyball, Swimming",
    detailsUrl: "/college-c",
  },
];

function CollegeCards() {
  return (
    <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
      <Stack spacing={0} align={"center"}>
        <Heading>Top Campus</Heading>
        <Text>We have been working with clients around the world</Text>
      </Stack>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={12}>
        {collegeCardsData.map((college, index) => (
          <Box
            key={index}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image src={college.imageSrc} alt={college.name} />

            <Box p={4}>
              <Heading size="md">{college.name}</Heading>
              <Text mt={2}>Admission Dates: {college.admissionDates}</Text>
              <Text>Events: {college.events}</Text>
              <Text>Research History: {college.researchHistory}</Text>
              <Text>Sports: {college.sports}</Text>

              <Button
                mt={4}
                colorScheme="blue"
                onClick={() => {
                  // Implement your logic to navigate to the details page
                  window.location.href = college.detailsUrl;
                }}
              >
                Details
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default CollegeCards;
