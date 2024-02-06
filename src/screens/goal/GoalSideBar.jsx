import React from "react";
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
  Box,
  Alert,
  AlertIcon,
  Checkbox,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
export default function GoalSideBar({
  topic,
  editTopicClickHandler,
  deleteTopicClickHandler,
  isOpen,
  setIsOpen,
}) {
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
            {topic.attributes.tasks.data.length === 0 && (
              <Box mt="3">
                <Alert status="info">
                  <AlertIcon />
                  No tasks present.
                </Alert>
              </Box>
            )}
            {topic.attributes.tasks.data.map((task) => (
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
