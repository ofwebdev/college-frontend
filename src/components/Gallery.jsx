import React from "react";
import {
  Grid,
  GridItem,
  Container,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

function Gallery() {
  return (
    <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
      <Stack spacing={0} align={"center"}>
        <Heading>Our Top Campus & Students </Heading>
        <Text>We have been working with clients around the world</Text>
      </Stack>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/3776165/pexels-photo-3776165.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/3755760/pexels-photo-3755760.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/1699414/pexels-photo-1699414.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/901962/pexels-photo-901962.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
        <GridItem w="100%">
          <img
            src="https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Img"
            style={{ borderRadius: "5px" }}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Gallery;
