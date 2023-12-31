import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600} textTransform={"capitalize"}>
          {name}
        </Text>
        <Text
          textTransform={"capitalize"}
          fontSize={"sm"}
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch testimonials from the backend API
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // You can display an error message to the user here
      }
    };

    fetchTestimonials();
  }, []);
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Our Clients Speak</Heading>
          <Text>We have been working with clients around the world</Text>
        </Stack>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }} // Three columns for md and larger screens
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          {testimonials.map((testimonial) => (
            <Testimonial key={testimonial._id}>
              <TestimonialContent>
                <TestimonialHeading>{testimonial.title}</TestimonialHeading>
                <TestimonialText>{testimonial.comment}</TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={testimonial.avatarSrc}
                name={testimonial.name}
                title={testimonial.role}
              />
            </Testimonial>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
