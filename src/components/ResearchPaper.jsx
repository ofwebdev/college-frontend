import React from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Container,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Sample data for research papers
const researchPapers = [
  {
    title: "Research Paper 1",
    url: "https://example.com/research-paper-1",
  },
  {
    title: "Research Paper 2",
    url: "https://example.com/research-paper-2",
  },
  {
    title: "Research Paper 3",
    url: "https://example.com/research-paper-3",
  },
  {
    title: "Research Paper 4",
    url: "https://example.com/research-paper-4",
  },
  // Add more research papers as needed
];

function ResearchPaper() {
  return (
    <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
      <Box className="research-papers-section">
        <Heading as="h2" size="md" mb={4}>
          Recommended Research Papers
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={4}>
          {researchPapers.map((paper, index) => (
            <Card key={index}>
              <CardBody>
                <Link to={paper.url}>{paper.title}</Link>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

export default ResearchPaper;
