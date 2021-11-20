import { Flex } from "@chakra-ui/react";
import React from "react";
import { WindowSizeState } from "../../utils/getScreenSize";
import MessageInput from "./MessageInput";
import ChatInfo from "./chatInfo";
import CardsList from "../cardsList";
import { MessageData } from "../cards/messageCard";

interface CurrentChatProps {
  windowSize: WindowSizeState;
  chatId: number;
  chatMessages: { messages: MessageData[]; hasMore: boolean };
}
const CurrentChat: React.FC<CurrentChatProps> = ({
  chatMessages,
  windowSize,
  chatId,
}) => {
  return (
    <Flex w="100%" flex={1} h="100%" flexDirection="column">
      <ChatInfo windowSize={windowSize} />
      <CardsList chatMessages={chatMessages} windowSize={windowSize} />
      <MessageInput />
    </Flex>
  );
};

export default CurrentChat;
