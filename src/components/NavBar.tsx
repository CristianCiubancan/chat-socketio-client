import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import meOp from "../operations/me";
import logoutOp from "../operations/logout";
import { useRouter } from "next/dist/client/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const { data: meData, loading } = meOp();

  let body;
  if (loading) {
  } else if (!meData?.user) {
    body = (
      <Box color="white">
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </Box>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center" color="white">
        <Box mr={2}>{meData.user.username}</Box>
        <Button
          color="pink.400"
          onClick={async () => {
            const data = await logoutOp();
            console.log(data);
            if (data) {
              localStorage.removeItem("CurrentUser");
              router.reload();
            }
          }}
          variant="link">
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="teal" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading color="white">ChatApp</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
