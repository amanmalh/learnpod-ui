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
import { postGoal, putGoal } from "../../utils/api-utils";
import { editGoalValidationSchema } from "../../utils/validationSchemas";

const EditGoal = ({ existingGoal, isOpen, setIsOpen }) => {
  const client = useQueryClient();

  const postMutation = useMutation(postGoal, {
    onSuccess: () => {
      client.invalidateQueries(["goals"]);
      setIsOpen(false);
    },
  });

  const putMutation = useMutation(putGoal, {
    onSuccess: () => {
      client.invalidateQueries(["goals"]);
      client.invalidateQueries(["goal"]);
      setIsOpen(false);
    },
  });

  let initialValues = {
    title: "",
    description: "",
  };

  if (existingGoal) {
    const { title, description } = existingGoal.attributes;
    initialValues = { title, description };
  }

  const handleSubmit = (values, { resetForm }) => {
    if (existingGoal) {
      putMutation.mutate({ id: existingGoal.id, body: values });
    } else {
      postMutation.mutate(values);
      resetForm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Goal</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editGoalValidationSchema}
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

export default EditGoal;
