import React from "react";
import { Box, Checkbox, Alert, AlertIcon } from "@chakra-ui/react";

export default function TaskViewer({ tasks }) {
  return (
    <>
      {tasks.length === 0 && (
        <Box mt="3">
          <Alert status="info">
            <AlertIcon />
            No tasks present.
          </Alert>
        </Box>
      )}
      {tasks.map((task) => (
        <Box
          key={task.id}
          bgColor="gray.50"
          mt="2"
          p="3"
          rounded="md"
          _hover={{ bgColor: "gray.100" }}
        >
          <Checkbox size="lg" colorScheme="purple">
            <span>{task.attributes.title}</span>
          </Checkbox>
        </Box>
      ))}
    </>
  );
}
