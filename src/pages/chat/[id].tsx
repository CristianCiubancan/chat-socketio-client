import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CardsList from "../../components/cardsList";
import CurrentChat from "../../components/currentChat";
import Layout from "../../components/Layout";
import FetchUserChat from "../../operations/chat/userChat";
import FetchUserChats from "../../operations/chat/userChats";
import FetchMessages from "../../operations/message/fetchMessages";
import ReadMessageOperation from "../../operations/message/readMessage";
import { setChatMessages } from "../../redux/features/chatMessages/chatMessagesSlice";
import { removeNotifications } from "../../redux/features/notifications/notificationsSlice";
import { setChat } from "../../redux/features/userChat/userChatSlice";
import {
  readChat,
  setChats,
} from "../../redux/features/userChats/userChatsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { wrapper } from "../../redux/store";
import { getScreenSize } from "../../utils/getScreenSize";

const Chat = () => {
  const windowSize = getScreenSize();
  const dispatch = useAppDispatch();
  const {
    chats: { value: chats },
    chat: { value: chatData },
    user: { value: currentUser },
    chatMessages: { value: chatMessages },
  } = useAppSelector((state) => state);

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
          ReadMessageOperation(chatMessages.messages[0].id);
          dispatch(readChat({ chatId: chatData.id, userId: currentUser.id }));
          dispatch(removeNotifications({ chatId: chatData.id }));
        }
      }
    }
  }, [chatData]);

  if (windowSize.width === 0 && windowSize.height === 0) {
    return <Layout></Layout>;
  }

  if (!currentUser || currentUser.id === 0) {
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
    const chatId = parseInt(context.query.id as string);
    const cookie = context.req.headers.cookie;

    const chatResponse = await FetchUserChat(cookie, chatId);
    if (!chatResponse.error) {
      await store.dispatch(setChat(chatResponse));
    }

    const messagesResponse = await FetchMessages(cookie, chatId);
    if (!messagesResponse.error) {
      await store.dispatch(setChatMessages(messagesResponse));
    }

    const response = await FetchUserChats(cookie ? cookie : null);
    if (!response.error) {
      await store.dispatch(setChats(response));
    }
    return { props: {} };
  }
);

export default Chat;