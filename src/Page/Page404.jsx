import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Container } from "@chakra-ui/react";

function Page404() {
  return (
    <Container>
      <Box textAlign="center" my={7}>
        <Heading as="h1">Page not found</Heading>
        <img
          style={{
            textAlign: "center",
            margin: "auto",
            padding: "30px 0",
          }}
          textAlign="center"
          src="/public/illustration_404.svg"
          alt="404"
        />
        <Button>
          <Link to="/">Go to Home page</Link>
        </Button>
      </Box>
    </Container>
  );
}

export default Page404;
