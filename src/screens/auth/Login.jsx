import React from "react";
import {
  Input,
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Center,
  Text,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { loginValidationSchema } from "../../utils/validationSchemas";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postLogin } from "../../utils/api-utils";
import { useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  let from = "/";
  if (location.state && location.state.from && location.state.from.pathname) {
    from = location.state.from.pathname;
  }

  const initialValues = {
    id: "",
    password: "",
  };

  const { updateUser } = useAuth();

  const postLoginMutation = useMutation(postLogin, {
    onSuccess: (data) => {
      updateUser(data.data.user.id, data.data.jwt);
      navigate(from, { replace: true });
    },
  });

  const handleSubmit = (values) => {
    postLoginMutation.mutate(values);
  };

  return (
    <Box pt="32" w="100%" h="100vh" bgColor="gray.50">
      <Center>
        <Card w="96">
          <CardHeader>
            <Center>
              <Text as="h2" fontSize="lg" color="blackAlpha.600">
                LEARN POD
              </Text>
            </Center>
          </CardHeader>
          <CardBody>
            <Text as="h2" fontSize="2xl" align="center" color="blackAlpha.800">
              Welcome back!
            </Text>
            <Text as="h2" fontSize="sm" align="center" color="blackAlpha.800">
              Please sign in to continue.
            </Text>
            <Box mt="8">
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Box mt="4">
                    <Field name="id">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.id && form.touched.id}
                        >
                          <FormLabel color="blackAlpha.800">Email</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box mt="4">
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel color="blackAlpha.800">Password</FormLabel>
                          <Input {...field} type="password" />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Button
                    type="submit"
                    colorScheme="purple"
                    loadingText="Sign in.."
                    mt={4}
                  >
                    Sign in
                  </Button>
                </Form>
              </Formik>
              {postLoginMutation.error && (
                <>
                  <br />
                  <Alert status="error">
                    <AlertIcon />
                    {postLoginMutation.error.message}
                  </Alert>
                </>
              )}
            </Box>
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}
