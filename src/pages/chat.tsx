import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import CardsList from "../components/cardsList";
import Layout from "../components/Layout";
import FetchUserChats from "../operations/chat/userChats";
import { setChats } from "../redux/features/userChats/userChatsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { wrapper } from "../redux/store";
import { getScreenSize } from "../utils/getScreenSize";
import { RefetchOnIdle } from "../utils/refetchOnIdle";

const Chat = ({}: any) => {
  const windowSize = getScreenSize();
  const dispatch = useAppDispatch();

  const {
    user: { value: currentUser },
    chats: { value: chats },
  } = useAppSelector((state) => state);

  RefetchOnIdle(async () => {
    const chats = await FetchUserChats();
    dispatch(setChats(chats));
  });

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
        <Flex h="100%">
          <CardsList chats={chats} singleItemOnPage windowSize={windowSize} />
          {windowSize.width > 800 ? (
            <Flex
              flex={1}
              borderWidth="1px"
              m="2"
              flexDirection="column"
              alignItems="center">
              <Heading>Welcome to ChatApp</Heading>
            </Flex>
          ) : null}
        </Flex>
      </Box>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const currentState = store.getState();
    const cookie = context.req.headers.cookie;

    if (
      currentState.chats.value.chats &&
      currentState.chats.value.chats[0].id === 0
    ) {
      const response = await FetchUserChats(cookie ? cookie : null);
      if (!response.error) {
        await store.dispatch(setChats(response));
      }
    }

    return { props: {} };
  }
);

export default Chat;
