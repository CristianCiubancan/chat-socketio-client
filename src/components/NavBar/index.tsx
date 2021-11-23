import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import React, { useContext, useEffect } from "react";
import NextLink from "next/link";
import { getScreenSize } from "../../utils/getScreenSize";
import { DesktopNavBar } from "./desktopNavBar";
import { MobileNavBar } from "./mobileNavBar";
import { Notifications } from "./notifications";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SocketContext } from "../../utils/SocketContext";
import {
  newNotification,
  Notification,
  setNotifications,
} from "../../redux/features/notifications/notificationsSlice";
import { useRouter } from "next/router";
import ReadMessageOperation from "../../operations/message/readMessage";
import { sendNewMessage } from "../../redux/features/chatMessages/chatMessagesSlice";
import { newChatMessageReceived } from "../../redux/features/userChats/userChatsSlice";
import { RefetchOnIdle } from "../../utils/refetchOnIdle";
import FetchUserNotifications from "../../operations/user/fetchNotifications";
import { setUserAsGuest } from "../../redux/features/user/userSlice";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();

  const width = getScreenSize().width;
  const dispatch = useAppDispatch();
  const socketClient = useContext(SocketContext);

  const {
    user: { value: currentUser },
    notifications: { value: notifications },
  } = useAppSelector((state) => state);

  RefetchOnIdle(async () => {
    if (router.query.id) {
    } else {
      if (currentUser.id && currentUser.id !== 0) {
        const notifications = await FetchUserNotifications();
        if (
          notifications.error &&
          notifications.error === "not authenticated"
        ) {
          dispatch(setUserAsGuest());
          router.push("/login");
        }
        dispatch(setNotifications(notifications));
      }
    }
  });

  const actualNotifications =
    notifications && currentUser.id && currentUser.id !== 0
      ? notifications.filter(
          (notification: Notification) => notification.chatId !== 0
        )
      : [];

  useEffect(() => {
    socketClient?.on("new-message", async (message) => {
      if (
        router.query.id &&
        parseInt(router.query.id as string) === message.message.message.chatId
      ) {
        // on the chat that received message
        const readMessage = await ReadMessageOperation(
          message.message.message.id
        );

        if (readMessage.error && readMessage.error === "not authenticated") {
          dispatch(setUserAsGuest());
          router.push("/login");
        } else {
          const messageWithReaders = {
            id: readMessage.messageId,
            createdAt: readMessage.createdAt,
            updatedAt: readMessage.updatedAt,
            chatId: message.message.chat.id,
            text: message.message.message.text,
            senderId: message.message.message.senderId,
            readers: [
              { id: currentUser.id },
              { id: message.message.message.senderId },
            ],
          };

          dispatch(sendNewMessage(messageWithReaders));

          dispatch(
            newChatMessageReceived({
              ...message.message.chat,
              lastMessage: {
                text: message.message.message.text,
                chatId: message.message.chat.id,
                senderId: message.message.message.senderId,
                createdAt: message.message.message.createdAt,
                readers: [
                  { id: currentUser.id },
                  { id: message.message.message.senderId },
                ],
              },
            })
          );
        }
      } else {
        // outside of the chat that received message
        dispatch(
          newNotification({ ...message, currentUserId: currentUser.id })
        );
        dispatch(
          newChatMessageReceived({
            ...message.message.chat,
            lastMessage: {
              text: message.message.message.text,
              chatId: message.message.chat.id,
              senderId: message.message.message.senderId,
              createdAt: message.message.message.createdAt,
              readers: [{ id: message.message.message.senderId }],
            },
          })
        );
      }
    });

    return () => {
      socketClient?.off("new-message");
    };
  });

  return (
    <Flex
      justifyContent="center"
      zIndex={1}
      position="fixed"
      width="100%"
      height="5em"
      top={0}
      bg="teal"
      p={4}>
      <Flex flex={1} alignItems="center" maxW={800}>
        <Box mr={"auto"} color="white">
          <NextLink href="/">
            <Link>
              <Heading lineHeight="40px" fontSize="xl">
                ChatApp
              </Heading>
            </Link>
          </NextLink>
        </Box>

        <Box ml={"auto"}>
          {width > 600 ? (
            <Flex alignItems="center">
              {currentUser.id === 0 || !currentUser.id ? null : (
                <Notifications notificationsData={actualNotifications} />
              )}
              <DesktopNavBar me={currentUser} width={width} />
            </Flex>
          ) : (
            <Flex alignItems="center">
              {currentUser.id === 0 || !currentUser.id ? null : (
                <Notifications notificationsData={actualNotifications} />
              )}
              <MobileNavBar me={currentUser} width={width} />
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
