import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function GoalItem({ goal }) {
  const navigate = useNavigate();

  const openGoal = (goalId) => {
    return () => {
      navigate(`/goal/${goalId}`);
    };
  };
  return (
    <Box
      rounded="md"
      boxShadow="xl"
      p="8"
      minHeight="300px"
      h="300px"
      overflow="ellipsis"
    >
      <Button onClick={openGoal(goal.id)}>{goal.attributes.title}</Button>
      <Text mt="2">{goal.attributes.description}</Text>
    </Box>
  );
}
