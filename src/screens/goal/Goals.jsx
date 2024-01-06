import React from "react";
import { useQuery } from "react-query";
import { Flex, Button, Spacer, Text } from "@chakra-ui/react";
import { getGoals } from "../../utils/api-utils";
import EditGoalDialog from "./EditGoalDialog";
import GoalItem from "./GoalItem";

const Goals = () => {
  const goals = useQuery(["goals"], getGoals);

  const handleNewGoalClick = () => {
    document.getElementById("edit-goal-modal").showModal();
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

      <EditGoalDialog />
    </>
  );
};

export default Goals;
