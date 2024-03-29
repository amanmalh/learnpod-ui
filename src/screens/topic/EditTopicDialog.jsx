import { Formik, Field, Form } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Textarea,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { postTopic, putTopic } from "../../utils/api-utils";
import {
  editGoalValidationSchema,
  editTopicValidationSchema,
} from "../../utils/validationSchemas";

const EditTopicDialog = ({ goalId, existingTopic, isOpen, setIsOpen }) => {
  const client = useQueryClient();

  const postMutation = useMutation(postTopic, {
    onSuccess: () => {
      client.invalidateQueries(["goal"]);
      setIsOpen(false);
    },
  });

  const putMutation = useMutation(putTopic, {
    onSuccess: () => {
      client.invalidateQueries(["goal"]);
      setIsOpen(false);
    },
  });

  let initialValues = {
    title: "",
    description: "",
  };

  if (existingTopic) {
    const { title, description } = existingTopic.attributes;
    initialValues = { title, description };
  }

  const handleSubmit = (values, { resetForm }) => {
    if (existingTopic) {
      putMutation.mutate({ id: existingTopic.id, body: values });
    } else {
      postMutation.mutate({ goalId, topic: values });
      resetForm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {existingTopic ? "Edit Topic" : "New Topic"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editTopicValidationSchema}
          enableReinitialize={true}
        >
          <Form>
            <ModalBody>
              <Box>
                <Box>
                  <Field name="title" type="text">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel>Title</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box mt="6">
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel>Description</FormLabel>
                        <Textarea {...field} />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                disabled={postMutation.isLoading || putMutation.isLoading}
                colorScheme="purple"
                isLoading={postMutation.isLoading || putMutation.isLoading}
                loadingText="Saving"
                mr={3}
              >
                Save
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditTopicDialog;
