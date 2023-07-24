import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Box,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SearchBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeTitles, setCollegeTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the form submission
    try {
      setLoading(true); // Set loading state to true before making the request

      const response = await fetch(
        `http://localhost:5000/colleges?search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log("Response data:", data);

      // Set collegeTitles array with id, name, and imageUrl properties
      setCollegeTitles(
        data.map((college) => ({
          id: college._id,
          name: college.name,
          imageUrl: college.image, // Modify this line according to your data structure
        }))
      );

      setLoading(false); // Set loading state to false after the data is fetched
    } catch (error) {
      console.error("Error fetching college titles:", error);
      setLoading(false); // Set loading state to false in case of an error
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <SearchIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2} m={2}>
          <Box>
            <form onSubmit={handleSearch} style={{ display: "flex" }}>
              <Input
                type="search"
                autoFocus
                placeholder="Search"
                size="md"
                bg="white"
                boxShadow="md"
                borderRadius="md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" ml={2}>
                <SearchIcon />
              </Button>
            </form>
          </Box>

          {loading ? (
            <p>Loading...</p>
          ) : collegeTitles.length > 0 ? (
            <List mt={4}>
              {collegeTitles.map((college) => (
                <Link key={college.id} to={`/details/${college.id}`}>
                  <ListItem
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <img
                      src={college.imageUrl}
                      alt={college.name}
                      style={{
                        marginBottom: "8px",
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    {college.name}
                  </ListItem>
                </Link>
              ))}
            </List>
          ) : (
            // If collegeTitles is empty and loading is false, show "No colleges found."
            loading && <p>No colleges found.</p>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchBar;
