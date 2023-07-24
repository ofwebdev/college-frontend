// CollegesList.js
import React from "react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const CollegesList = ({ colleges, onCollegeClick }) => {
  return (
    <List spacing={3}>
      {colleges.map((college) => (
        <ListItem
          key={college._id}
          onClick={() => onCollegeClick(college)}
          style={{ cursor: "pointer" }}
        >
          <ListIcon as={CheckIcon} color="green.500" />
          {college.name}
        </ListItem>
      ))}
    </List>
  );
};

export default CollegesList;
