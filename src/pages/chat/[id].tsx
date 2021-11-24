import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CardsList from "../../components/cardsList";
import CurrentChat from "../../components/currentChat";
import Layout from "../../components/Layout";
import FetchUserChat from "../../operations/chat/userChat";
import FetchUserChats from "../../operations/chat/userChats";
import FetchMessages from "../../operations/message/fetchMessages";
import ReadMessageOperation from "../../operations/message/readMessage";
import FetchUserNotifications from "../../operations/user/fetchNotifications";
import { setChatMessages } from "../../redux/features/chatMessages/chatMessagesSlice";
import {
  removeNotifications,
  setNotifications,
} from "../../redux/features/notifications/notificationsSlice";
import { setUserAsGuest } from "../../redux/features/user/userSlice";
import { setChat } from "../../redux/features/userChat/userChatSlice";
import {
  readChat,
  setChats,
} from "../../redux/features/userChats/userChatsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { wrapper } from "../../redux/store";
import { getScreenSize } from "../../utils/getScreenSize";
import { RefetchOnIdle } from "../../utils/refetchOnIdle";

const Chat = () => {
  const windowSize = getScreenSize();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    chats: { value: chats },
    chat: { value: chatData },
    user: { value: currentUser },
    chatMessages: { value: chatMessages },
  } = useAppSelector((state) => state);

  RefetchOnIdle(async () => {
    if (!currentUser || currentUser.id === 0) {
    } else {
      const messages = await FetchMessages(null, chatData.id);
      dispatch(setChatMessages(messages));

      const response = await ReadMessageOperation(messages.messages[0].id);
      if (response.error && response.error === "not authenticated") {
        dispatch(setUserAsGuest());
        router.push("/login");
      } else {
        const notifications = await FetchUserNotifications();
        if (
          notifications.error &&
          notifications.error === "not authenticated"
        ) {
          dispatch(setUserAsGuest());
          router.push("/login");
        }
        dispatch(setNotifications(notifications));

        const chatsResponse = await FetchUserChats();
        if (
          chatsResponse.error &&
          chatsResponse.error === "not authenticated"
        ) {
          dispatch(setUserAsGuest());
          router.push("/login");
        } else {
          if (
            chats.chats[0].lastMessage.cursor !==
            chatsResponse.chats[0].lastMessage.cursor
          ) {
            dispatch(setChats(chatsResponse));
          }
        }
      }
    }
  });

  const handleReadMessage = async (messageId: number) => {
    const response = await ReadMessageOperation(messageId);
    if (response.error && response.error === "not authenticated") {
      dispatch(setUserAsGuest());
      router.push("/login");
    } else {
      dispatch(readChat({ chatId: chatData.id, userId: currentUser.id }));
      dispatch(removeNotifications({ chatId: chatData.id }));
    }
  };

  useEffect(() => {
    if (currentUser.id && currentUser.id !== 0) {
      if (chatMessages.messages[0]) {
        let isChatRead = false;
        for (let reader of chatMessages.messages[0].readers) {
          if (reader.id === currentUser.id) {
            isChatRead = true;
          }
        }
        if (isChatRead === false) {
          handleReadMessage(chatMessages.messages[0].id);
        }
      }
    }
  }, [chatData]);

  if (windowSize.width === 0 && windowSize.height === 0) {
    return <Layout></Layout>;
  }

  if (!currentUser.id || currentUser.id === 0) {
    return (
      <Layout>
        <Box textAlign="center">
          You need to be logged in in order to view this page.
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box height="100%">
        {windowSize.width > 600 ? (
          <Flex h="100%">
            <CardsList
              chats={chats}
              singleItemOnPage={false}
              windowSize={windowSize}
            />
            <Flex
              flex={1}
              borderWidth="1px"
              m="2"
              flexDirection="column"
              alignItems="center">
              <CurrentChat
                chatMessages={chatMessages}
                windowSize={windowSize}
                chatId={chatData.id}
              />
            </Flex>
          </Flex>
        ) : (
          <Flex
            flex={1}
            borderWidth="1px"
            p="2"
            h="100%"
            flexDirection="column"
            alignItems="center">
            <CurrentChat
              chatMessages={chatMessages}
              windowSize={windowSize}
              chatId={chatData.id}
            />
          </Flex>
        )}
      </Box>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const currentState = store.getState();
    const chatId = parseInt(context.query.id as string);
    const cookie = context.req.headers.cookie;

    const currentChat = currentState.chats?.value?.chats?.filter(
      (chat) => chat.id === chatId
    )[0];

    const data =
      currentChat && isNaN(chatId)
        ? currentChat
        : await FetchUserChat(null, chatId);

    await store.dispatch(setChat(data));

    const messagesResponse = await FetchMessages(cookie, chatId);
    if (!messagesResponse.error) {
      await store.dispatch(setChatMessages(messagesResponse));
    }

    if (
      currentState.chats.value.chats &&
      currentState.chats.value.chats[0] &&
      currentState.chats.value.chats[0].id === 0
    ) {
      const response = await FetchUserChats(cookie ? cookie : null);
      if (response.error && response.error === "not authenticated") {
        store.dispatch(setUserAsGuest());
      } else {
        await store.dispatch(setChats(response));
      }
    }
    return { props: {} };
  }
);

export default Chat;
