import { Box, Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import FetchUserChats from "../operations/chat/userChats";
import { setUserAsGuest } from "../redux/features/user/userSlice";
import { setChats } from "../redux/features/userChats/userChatsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
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
  const dispatch = useAppDispatch();
  const currentState = useAppSelector((state) => state);
  const router = useRouter();

  const handleChatsUpdate = async () => {
    const response = await FetchUserChats();
    if (response.error && response.error === "not authenticated") {
      dispatch(setUserAsGuest());
      router.push("/login");
    } else if (
      response.chats[0].id !== currentState.chats.value.chats[0].id &&
      response.chats[0].lastMessage.text !==
        currentState.chats.value.chats[0].lastMessage.text
    ) {
      dispatch(setChats(response));
    }
    // else if (
    //   JSON.stringify(response.chats[0]) !==
    //   JSON.stringify(currentState.chats.value.chats[0])
    // ) {
    //   dispatch(setChats(response));
    // }
  };

  if (users) {
    return (
      <Stack spacing={8}>
        {users?.map((user: UserData) => {
          if (user.id === 0) {
            return null;
          } else {
            return <UserCard key={user.id} user={user} />;
          }
        })}
      </Stack>
    );
  } else if (chats) {
    if (!windowSize) {
      return null;
    }

    useEffect(() => {
      handleChatsUpdate();
    }, []);

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
