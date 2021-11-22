import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import InputField from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import Layout from "../components/Layout";
import RegisterOperation from "../operations/user/register";
import { setUser } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { ResetStore } from "../utils/resetStore";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const data = await RegisterOperation(values);
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
                  name="username"
                  placeholder="username"
                  label="Username"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
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
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
                mt={4}>
                Register
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default Register;
