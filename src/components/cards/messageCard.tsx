import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { UserData } from "./userCard";
import { useAppSelector } from "../../redux/hooks";

export interface MessageData {
  chatId: number;
  createdAt: string;
  id: number;
  readers: UserData[];
  senderId: number;
  text: string;
  cursor: string;
  updatedAt: string;
}

interface MessageCardProps {
  message: MessageData;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const router = useRouter();
  const { id: userId } = useAppSelector((state) => state.user.value);
  return (
    <Flex key={message.id}>
      {message.senderId === userId ? (
        <Text
          m={1}
          ml="auto"
          maxW="90%"
          borderWidth="1px"
          paddingY="3"
          paddingX="7"
          borderRadius={10}
          key={message.id}
          color="white"
          backgroundColor="teal.500"
          wordBreak="break-word">
          {message.text}
        </Text>
      ) : (
        <Text
          m={1}
          mr="auto"
          maxW="60%"
          borderWidth="1px"
          paddingY="3"
          paddingX="7"
          borderRadius={10}
          key={message.id}
          wordBreak="break-word">
          {message.text}
        </Text>
      )}
    </Flex>
  );
};

export default MessageCard;
