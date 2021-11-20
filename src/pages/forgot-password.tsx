import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputField from "../components/InputField";
import NextLink from "next/link";
import Layout from "../components/Layout";
import ForgotPasswordOperation from "../operations/user/forgotPassword";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await ForgotPasswordOperation(values);
          setComplete(true);
        }}>
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              <Box mt={4}>
                if an account with that email exists, we sent you an email
              </Box>
              <NextLink href="/">
                <Button type="submit" colorScheme="teal" mt={4}>
                  Go back home
                </Button>
              </NextLink>
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
              </Box>
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
                mt={4}>
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};
export default ForgotPassword;
