import React, { useState } from "react";
import {
  Flex,
  Box,
  Button,
  Spacer,
  Alert,
  AlertIcon,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { getGoal } from "../../utils/api-utils";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EditGoalDialog from "./EditGoalDialog";
import EditTopicDialog from "../topic/EditTopicDialog";
import GoalSideBar from "./GoalSideBar";
import ConfirmDeleteTopicDialog from "../topic/ConfirmDeleteTopicDialog";
import WarningIcon from "../common/WarningIcon";

const Goal = () => {
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isEditTopicDialogOpen, setIsEditTopicDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [isEditGoalDialogOpen, setIsEditGoalDialogOpen] = useState(false);

  const { id } = useParams();
  const query = useQuery(["goal", id, true], getGoal);

  const addTopicClickHandler = () => {
    setSelectedTopic(null);
    document.getElementById("edit-topic-modal").showModal();
  };

  const topicClickHandler = (topic) => {
    return () => {
      console.log(topic);
      setShowTaskPanel(true);
      setSelectedTopic(topic);
    };
  };

  const closeTasksHandler = () => {
    setShowTaskPanel(false);
  };

  const deleteGoalClickHandler = () => {
    document.getElementById("confirm-delete-goal").showModal();
  };

  const editGoalClickHandler = () => {
    document.getElementById("edit-goal-modal").showModal();
  };

  const editTopicClickHandler = () => {
    document.getElementById("edit-topic-modal").showModal();
  };

  const deleteTopicClickHandler = () => {
    document.getElementById("confirm-delete-topic").showModal();
  };

  return (
    <>
      {query.isSuccess && (
        <div className="flex">
          <div className={`${showTaskPanel ? "basis-3/5" : "basis-full"}`}>
            <Flex>
              <Text as="h1" fontSize="2xl">
                {query.data.attributes.title}
              </Text>
              <Spacer />
              <Menu>
                <MenuButton>
                  <Icon as={FaEllipsisV} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <span onClick={editGoalClickHandler}>Edit</span>
                  </MenuItem>
                  <MenuItem>
                    <Text color="tomato">Delete</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Text mt="2">{query.data.attributes.description}</Text>
            <Text as="h2" fontSize="xl" mt="3">
              Topics
            </Text>

            {(!query.data.attributes.topics ||
              query.data.attributes.topics.data.length === 0) && (
              <Box mt="3">
                <Alert status="info">
                  <AlertIcon />
                  No topics present. Click on the below button to add one!
                </Alert>
              </Box>
            )}

            <Box mt="3">
              {query.data.attributes.topics &&
                query.data.attributes.topics.data.map((topic) => (
                  <Box
                    key={topic.id}
                    onClick={topicClickHandler(topic)}
                    bgColor="gray.50"
                    mt="2"
                    p="3"
                    rounded="md"
                    cursor="pointer"
                    _hover={{ bgColor: "gray.100" }}
                  >
                    <span>{topic.attributes.title}</span>
                  </Box>
                ))}
            </Box>
            <Button mt="3" colorScheme="purple" onClick={addTopicClickHandler}>
              Add topic
            </Button>
          </div>
          {showTaskPanel && (
            <>
              <div className="basis-2/5 ml-10 shadow-xl p-10">
                <GoalSideBar
                  topic={selectedTopic}
                  closeTasksHandler={closeTasksHandler}
                  editTopicClickHandler={editTopicClickHandler}
                  deleteTopicClickHandler={deleteTopicClickHandler}
                />
              </div>
            </>
          )}

          <ConfirmDeleteDialog
            id={query.data.id}
            goalTitle={query.data.attributes.title}
          />
          <EditGoalDialog existingGoal={query.data} />
          <EditTopicDialog
            goalId={query.data.id}
            existingTopic={selectedTopic}
          />
          <ConfirmDeleteTopicDialog id={selectedTopic && selectedTopic.id} />
        </div>
      )}
    </>
  );
};

export default Goal;
