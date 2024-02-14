import React from "react";
import {
  Box,
  Checkbox,
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage,
  Textarea,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { newTaskValidationSchema } from "../../utils/validationSchemas";
import { useMutation } from "react-query";
import { postTask } from "../../utils/api-utils";

export default function TaskEditor({ topicId, tasks }) {
  const postTaskMutation = useMutation(postTask);
  const initialValues = {
    newTask: "",
  };
  const handleAddNewTask = async (values, { resetForm }) => {
    postTaskMutation.mutate(
      { topicId, title: values.newTask },
      {
        onSuccess: () => {
          resetForm();
          // invalidate tasks
          // show toast
        },
      }
    );
  };

  return (
    <>
      <h2>Edit Tasks</h2>
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
      <Box mt={3}>
        <Divider orientation="horizontal" />
        <Box mt={3}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleAddNewTask}
            validationSchema={newTaskValidationSchema}
          >
            <Form>
              <Field name="newTask">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.newTask && form.touched.newTask}
                  >
                    <Textarea {...field} />
                    <FormErrorMessage>{form.errors.newTask}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={3}
                colorScheme="purple"
                type="submit"
                loadingText="Adding"
                isLoading={postTaskMutation.isLoading}
              >
                Add new task
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </>
  );
}
