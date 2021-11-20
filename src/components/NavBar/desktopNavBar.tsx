import { AspectRatio, Box, Flex, Link, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import LogoutOperation from "../../operations/user/logout";
import { CurrentUser } from "../../redux/features/user/userSlice";

interface DesktopNavBarProps {
  me: CurrentUser;
  width: number;
}

export const DesktopNavBar: React.FC<DesktopNavBarProps> = ({ me, width }) => {
  return (
    <Box>
      {!me || me.id === 0 ? (
        <Box>
          <NextLink href="/login">
            <Link color="white" mr={2}>
              login
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link color="white">register</Link>
          </NextLink>
        </Box>
      ) : (
        <Box>
          <Flex>
            <NextLink href="/my-profile">
              <Button color="white" variant="link">
                <Text mr={1} fontSize="xl" my="auto">
                  {me.username}
                </Text>

                <Box boxSize="2em" mr={2}>
                  <AspectRatio ratio={1}>
                    <Image
                      borderRadius="full"
                      boxSize="2em"
                      src={me.profilePicUrl}
                    />
                  </AspectRatio>
                </Box>
              </Button>
            </NextLink>
            <Button
              onClick={async () => {
                localStorage.removeItem("CurrentUser");
                await LogoutOperation();
                router.reload();
              }}
              variant="link"
              color="pink.300">
              <Text fontSize="xl">logout</Text>
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
