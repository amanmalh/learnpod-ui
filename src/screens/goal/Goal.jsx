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
import DeleteGoalDialog from "./DeleteGoalDialog";
import EditGoalDialog from "./EditGoalDialog";
import EditTopicDialog from "../topic/EditTopicDialog";
import GoalSideBar from "./GoalSideBar";
import DeleteTopicDialog from "../topic/DeleteTopicDialog";

const Goal = () => {
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isEditTopicDialogOpen, setIsEditTopicDialogOpen] = useState(false);
  const [isDeleteGoalDialogOpen, setIsDeleteGoalDialogOpen] = useState(false);
  const [isEditGoalDialogOpen, setIsEditGoalDialogOpen] = useState(false);
  const [isDeleteTopicDialogOpen, setIsDeleteTopicDialogOpen] = useState(false);

  const { id } = useParams();
  const query = useQuery(["goal", id, true], getGoal);

  const addTopicClickHandler = () => {
    setSelectedTopic(null);
    setIsEditTopicDialogOpen(true);
  };

  const topicClickHandler = (topic) => {
    return () => {
      setShowTaskPanel(true);
      setSelectedTopic(topic);
    };
  };

  const deleteGoalClickHandler = () => {
    setIsDeleteGoalDialogOpen(true);
  };

  const editGoalClickHandler = () => {
    setIsEditGoalDialogOpen(true);
  };

  const editTopicClickHandler = () => {
    setIsEditTopicDialogOpen(true);
  };

  const deleteTopicClickHandler = () => {
    setIsDeleteTopicDialogOpen(true);
  };

  return (
    <>
      {query.isSuccess && (
        <>
          <>
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
                    <Text w="100%" onClick={editGoalClickHandler}>
                      Edit
                    </Text>
                  </MenuItem>
                  <MenuItem>
                    <Text
                      w="100%"
                      color="tomato"
                      onClick={deleteGoalClickHandler}
                    >
                      Delete
                    </Text>
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
          </>

          <DeleteGoalDialog
            id={query.data.id}
            goalTitle={query.data.attributes.title}
            isOpen={isDeleteGoalDialogOpen}
            setIsOpen={setIsDeleteGoalDialogOpen}
          />
          <EditGoalDialog
            isOpen={isEditGoalDialogOpen}
            setIsOpen={setIsEditGoalDialogOpen}
            existingGoal={query.data}
          />
          <EditTopicDialog
            goalId={query.data.id}
            existingTopic={selectedTopic}
            isOpen={isEditTopicDialogOpen}
            setIsOpen={setIsEditTopicDialogOpen}
          />
          <DeleteTopicDialog
            id={selectedTopic && selectedTopic.id}
            isOpen={isDeleteTopicDialogOpen}
            setIsOpen={setIsDeleteTopicDialogOpen}
          />
          {selectedTopic && (
            <GoalSideBar
              topic={selectedTopic}
              editTopicClickHandler={editTopicClickHandler}
              deleteTopicClickHandler={deleteTopicClickHandler}
              isOpen={showTaskPanel}
              setIsOpen={setShowTaskPanel}
            />
          )}
        </>
      )}
    </>
  );
};

export default Goal;
