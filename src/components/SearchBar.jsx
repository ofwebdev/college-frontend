import { SearchIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Box,
  Input,
} from "@chakra-ui/react";

function SearchBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <SearchIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={2} m={2}>
          <Box>
            <Input
              type="search"
              autoFocus // To automatically focus the input field when it appears
              placeholder="Search"
              size="md" // Use Chakra UI size props to adjust the input size
              bg="white" // Use Chakra UI color props to style the input field background
              boxShadow="md" // Use Chakra UI box shadow props for styling
              borderRadius="md" // Use Chakra UI border radius props for styling
            />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchBar;
