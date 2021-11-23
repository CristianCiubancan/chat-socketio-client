import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import fetchUserChats from "../operations/chat/userChats";
import FetchMessages from "../operations/message/fetchMessages";
import fetchUsers from "../operations/user/fetchUsers";
import { fetchMoreChatMessages } from "../redux/features/chatMessages/chatMessagesSlice";
import { setUserAsGuest } from "../redux/features/user/userSlice";
import { fetchMoreChats } from "../redux/features/userChats/userChatsSlice";
import { fetchMoreUsers } from "../redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ChatData } from "./cards/chatCard";
import { MessageData } from "./cards/messageCard";
import { UserData } from "./cards/userCard";

interface fetchMoreButtonProps {
  users?: { users: UserData[]; hasMore: boolean };
  chats?: { chats: ChatData[]; hasMore: boolean };
  chatMessages?: { messages: MessageData[]; hasMore: boolean };
}

const FetchMoreButton: React.FC<fetchMoreButtonProps> = ({
  chatMessages,
  users,
  chats,
}) => {
  const { id: chatId } = useAppSelector((state) => state.chat.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (users) {
    return users.hasMore === false ? null : (
      <Flex justifyContent="center" alignItems="center">
        <Button
          onClick={async () => {
            const response = await fetchUsers(
              null,
              users.users[users.users.length - 1].createdAt
            );
            dispatch(fetchMoreUsers(response));
          }}
          colorScheme="teal"
          my={4}>
          Load more
        </Button>
      </Flex>
    );
  } else if (chats) {
    return chats.hasMore === false ? null : (
      <Flex justifyContent="center" alignItems="center">
        <Button
          onClick={async () => {
            const response = await fetchUserChats(
              null,
              chats.chats[chats.chats.length - 1].lastMessage.cursor
            );
            if (response.error && response.error === "not authenticated") {
              dispatch(setUserAsGuest());
              router.push("/login");
            } else {
              dispatch(fetchMoreChats(response));
            }
          }}
          colorScheme="teal"
          my={4}>
          Load more
        </Button>
      </Flex>
    );
  } else if (chatMessages) {
    return chatMessages.hasMore === false ? null : (
      <Flex justifyContent="center" alignItems="center">
        <Button
          onClick={async () => {
            const response = await FetchMessages(
              null,
              chatId,
              chatMessages.messages[chatMessages.messages.length - 1].createdAt
            );
            dispatch(fetchMoreChatMessages(response));
          }}
          colorScheme="teal"
          my={4}>
          Load more
        </Button>
      </Flex>
    );
  } else {
    return null;
  }
};

export default FetchMoreButton;
