import React from "react";
import { useQuery } from "react-query";
import { Flex, Button, Spacer, Text } from "@chakra-ui/react";
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
        <div className="mt-2 grid md:grid-cols-3 gap-4">
          {goals.data.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
      )}

      <EditGoalDialog
        isOpen={isEditGoalDialogOpen}
        setIsOpen={setIsEditGoalDialogOpen}
      />
    </>
  );
};

export default Goals;
