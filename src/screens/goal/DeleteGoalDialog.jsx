import React from "react";
import { Formik, Form, Field } from "formik";
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
  Text,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { deleteGoal } from "../../utils/api-utils";
import { useNavigate } from "react-router-dom";

const DeleteGoalDialog = ({ id, goalTitle, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const deleteMutation = useMutation(deleteGoal, {
    onSuccess: () => {
      setIsOpen(false);
      navigate("/");
    },
  });

  const initialValues = {
    confirmFieldTitle: "",
  };

  const handleSubmit = () => {
    deleteMutation.mutate(id);
  };

  const validate = (values) => {
    const error = {};
    if (values.confirmFieldTitle != goalTitle) {
      error.confirmFieldTitle = "Titles do not match!";
    }

    return error;
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Goal</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          <Form>
            <ModalBody>
              <Text>
                Warning! This will permanently remove this goal. If you still
                wish to proceed, please type the name of the goal in the below
                input.
              </Text>
              <Box>
                <Box>
                  <Field name="confirmFieldTitle" type="text">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.confirmFieldTitle &&
                          form.touched.confirmFieldTitle
                        }
                      >
                        <FormLabel>Goal Title</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.confirmFieldTitle}
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
                disabled={deleteMutation.isLoading}
                colorScheme="red"
                isLoading={deleteMutation.isLoading}
                loadingText="Deleting"
                mr={3}
              >
                Delete
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default DeleteGoalDialog;
