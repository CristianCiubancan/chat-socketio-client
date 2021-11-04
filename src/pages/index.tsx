import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Image,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import router from "next/dist/client/router";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import useSocket from "../utils/useSocket";
import usersOp from "../operations/users";
import { isServer } from "../utils/isServer";

const Index = () => {
  const socket = useSocket();
  const { data, loading } = usersOp();
  const server = isServer();

  let currentUser = !server
    ? JSON.parse(localStorage.getItem("CurrentUser")!)
    : undefined;

  return (
    <Layout>
      {!data && loading ? (
        <Flex
          flex={1}
          height={"81vh"}
          justifyContent="center"
          alignItems="center">
          <Spinner color="teal.800" />
        </Flex>
      ) : (
        <Stack spacing={8}>
          {data?.map((p: any) =>
            !p ? null : (
              <Flex
                flex={1}
                key={p.id}
                mt={8}
                p={5}
                shadow="md"
                borderWidth="1px">
                <Box flex={1} overflow="hidden">
                  <Flex>
                    <Box boxSize="2.5em" mr={2}>
                      <AspectRatio ratio={1}>
                        <Image
                          borderRadius="full"
                          backgroundColor="blackAlpha.600"
                          src={p.profilePicUrl}
                        />
                      </AspectRatio>
                    </Box>
                    <Heading
                      fontSize="large"
                      mt={2}
                      color="pink.300"
                      display="inline">
                      {p.username.length > 20
                        ? ` ${p.username.slice(0, 20)}...`
                        : ` ${p.username}`}
                    </Heading>
                  </Flex>
                </Box>
                {currentUser ? (
                  p.id === currentUser.id ? null : (
                    <Button
                      colorScheme="teal"
                      ml="auto"
                      onClick={async () => {
                        // startChat({
                        //   variables: {
                        //     initiatorId: currentUser.id,
                        //     otherMemberId: p.id,
                        //   },
                        // });
                      }}>
                      <ChatIcon />
                    </Button>
                  )
                ) : (
                  <Button
                    colorScheme="teal"
                    ml="auto"
                    onClick={() => {
                      //go to login page
                      router?.push(`/register`);
                    }}>
                    <ChatIcon />
                  </Button>
                )}
              </Flex>
            )
          )}
        </Stack>
      )}
    </Layout>
  );
};

export default Index;
