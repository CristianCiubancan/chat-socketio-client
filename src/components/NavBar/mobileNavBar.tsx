import { Box, Text } from "@chakra-ui/layout";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  useDisclosure,
  DrawerFooter,
} from "@chakra-ui/react";
import router from "next/router";
import React, { LegacyRef, useRef } from "react";
import NextLink from "next/link";
import LogoutOperation from "../../operations/user/logout";
import { CurrentUser } from "../../redux/features/user/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ResetStore } from "../../utils/resetStore";

interface MobileNavBarProps {
  me: CurrentUser;
  width: number;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ me, width }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const btnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <Box>
      {!me.id || me.id === 0 ? (
        <Box>
          <Button
            ref={btnRef as LegacyRef<HTMLButtonElement>}
            colorScheme="teal"
            onClick={onOpen}>
            Menu
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>
                <DrawerBody>
                  <Flex flexDirection="column">
                    <NextLink href="/login">
                      <Button colorScheme="pink" mt={2}>
                        login
                      </Button>
                    </NextLink>
                    <NextLink href="/register">
                      <Button colorScheme="teal" mt={2}>
                        register
                      </Button>
                    </NextLink>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
      ) : (
        <Box>
          <Flex alignItems="center">
            <Button
              ref={btnRef as LegacyRef<HTMLButtonElement>}
              colorScheme="teal"
              onClick={onOpen}>
              Menu
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader color="black" fontSize="xl">
                    <Flex>
                      {`Hi, `}
                      <Text mx={2} color="teal" fontSize="xl">
                        {me.username}
                      </Text>
                    </Flex>
                  </DrawerHeader>

                  <DrawerBody>
                    <Flex flexDirection="column" alignItems="start">
                      <NextLink href="/my-profile">
                        <Button mt={4} variant="link" color="black">
                          <Text fontSize="lg">My Profile</Text>
                        </Button>
                      </NextLink>
                      <Button
                        mt={4}
                        onClick={async () => {
                          localStorage.removeItem("CurrentUser");
                          await LogoutOperation();
                          ResetStore(dispatch);
                          router.reload();
                        }}
                        variant="link"
                        color="pink.300">
                        <Text fontSize="lg">Logout</Text>
                      </Button>
                    </Flex>
                  </DrawerBody>

                  <DrawerFooter mr="auto"></DrawerFooter>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
