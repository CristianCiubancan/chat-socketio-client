import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link } from "@chakra-ui/react";
import InputField from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";
import Layout from "../components/Layout";
import LoginOperation from "../operations/user/login";
import { setUser } from "../redux/features/user/userSlice";
import { ResetStore } from "../utils/resetStore";
import { useAppDispatch } from "../redux/hooks";

const Login: React.FC<{}> = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const data = await LoginOperation(values);

          if (data.errors) {
            setErrors(toErrorMap(data.errors));
          } else if (data.user) {
            ResetStore(dispatch);
            dispatch(setUser(data.user));
            window.location.href = "/";
          }
        }}>
        {({ isSubmitting }) => (
          <Box padding={5}>
            <Form>
              <Box mt={4}>
                <InputField
                  name="usernameOrEmail"
                  placeholder="username or email"
                  label="Username or Email"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Box mt={2}>
                <NextLink href="/forgot-password">
                  <Link>forgot password?</Link>
                </NextLink>
              </Box>
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
                mt={4}>
                Login
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
