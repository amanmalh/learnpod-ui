import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { useAuth } from "../auth/Auth";
import TaskEditor from "../task/TaskEditor";
import TaskViewer from "../task/TaskViewer";
import { useQuery } from "react-query";
import { getTasks } from "../../utils/api-utils";
export default function GoalSideBar({
  topic,
  editTopicClickHandler,
  deleteTopicClickHandler,
  isOpen,
  setIsOpen,
}) {
  const { user } = useAuth();
  const [isOwner, setIsOwner] = useState();
  const tasksQuery = useQuery(["tasks", { topicId: topic.id }], getTasks);

  useEffect(() => {
    if (
      user.username === topic?.attributes?.owner?.data?.attributes?.username
    ) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [topic]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => setIsOpen(false)}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{topic.attributes.title}</DrawerHeader>

        <DrawerBody>
          <>
            <Flex justifyContent="right">
              <div>
                <Menu>
                  <MenuButton>
                    <Icon as={FaEllipsisV} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Text w="100%" onClick={editTopicClickHandler}>
                        Edit
                      </Text>
                    </MenuItem>
                    <MenuItem>
                      <Text
                        w="100%"
                        color="tomato"
                        onClick={deleteTopicClickHandler}
                      >
                        Delete
                      </Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </Flex>
            {tasksQuery.isSuccess && isOwner && (
              <TaskEditor topicId={topic.id} tasks={tasksQuery.data} />
            )}
            {tasksQuery.isSuccess && !isOwner && (
              <TaskViewer tasks={tasksQuery.data} />
            )}
          </>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
