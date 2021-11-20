import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";
import ChangePasswordOperation from "../../operations/user/changePassword";
import { setUser } from "../../redux/features/user/userSlice";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await ChangePasswordOperation({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });
          if (response.errors) {
            const errorMap = toErrorMap(response.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else {
            setUser(response);
            window.location.href = "/";
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="new password"
                label="New Password"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>get a new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
              mt={4}>
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;
