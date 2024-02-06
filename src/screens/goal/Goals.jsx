import React from "react";
import { useQuery } from "react-query";
import { Flex, Button, Spacer, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { getGoals } from "../../utils/api-utils";
import EditGoalDialog from "./EditGoalDialog";
import GoalItem from "./GoalItem";
import { useState } from "react";

const Goals = () => {
  const goals = useQuery(["goals"], getGoals);
  const [isEditGoalDialogOpen, setIsEditGoalDialogOpen] = useState(false);
  const handleNewGoalClick = () => {
    setIsEditGoalDialogOpen(true);
  };

  return (
    <>
      <Flex>
        <Text as="h1" fontSize="2xl">
          Goals
        </Text>
        <Spacer />
        <Button
          colorScheme="purple"
          variant="outline"
          onClick={handleNewGoalClick}
        >
          New Goal
        </Button>
      </Flex>
      {goals.isSuccess && (
        <SimpleGrid columns="3" minChildWidth="400px">
          {goals.data.map((goal) => (
            <Box w="96" key={goal.id}>
              <GoalItem goal={goal} />
            </Box>
          ))}
        </SimpleGrid>
      )}

      <EditGoalDialog
        isOpen={isEditGoalDialogOpen}
        setIsOpen={setIsEditGoalDialogOpen}
      />
    </>
  );
};

export default Goals;
