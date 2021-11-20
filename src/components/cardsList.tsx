import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { WindowSizeState } from "../utils/getScreenSize";
import ChatCard, { ChatData } from "./cards/chatCard";
import MessageCard, { MessageData } from "./cards/messageCard";
import UserCard, { UserData } from "./cards/userCard";
import FetchMoreButton from "./fetchMoreButton";

interface CardsListProps {
  users?: UserData[];
  chats?: { chats: ChatData[]; hasMore: boolean };
  chatMessages?: { messages: MessageData[]; hasMore: boolean };
  windowSize?: WindowSizeState;
  singleItemOnPage?: boolean;
}

const CardsList: React.FC<CardsListProps> = ({
  users,
  chats,
  singleItemOnPage,
  windowSize,
  chatMessages,
}) => {
  if (users) {
    return (
      <Stack spacing={8}>
        {users?.map((user: UserData) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Stack>
    );
  } else if (chats) {
    if (!windowSize) {
      return null;
    }
    return (
      <Box
        py={2}
        minW={
          windowSize.width > 800
            ? "300"
            : singleItemOnPage === true
            ? "100%"
            : "120"
        }>
        <Stack h="100%" spacing={2} w="100%" px={2} overflowY="scroll">
          {chats.chats?.map((chat: ChatData) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              singleItemOnPage={singleItemOnPage}
              windowSize={windowSize}
            />
          ))}

          <FetchMoreButton chats={chats} />
        </Stack>
      </Box>
    );
  } else if (chatMessages) {
    if (!windowSize) {
      return null;
    }
    return (
      <Flex
        flex={1}
        flexDirection="column-reverse"
        overflowX="hidden"
        overflowY="scroll"
        height="100%"
        width="100%">
        {chatMessages.messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
        <FetchMoreButton chatMessages={chatMessages} />
      </Flex>
    );
  } else {
    return null;
  }
};

export default CardsList;
