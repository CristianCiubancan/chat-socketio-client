import { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { wrapper } from "../redux/store";
import { getCookie } from "../redux/features/cookie/cookieSlice";
import fetchAndStoreUser from "../utils/fetchAndStoreUser";
import React from "react";
import { Global, css } from "@emotion/react";
import FetchUserNotifications from "../operations/user/fetchNotifications";
import { setNotifications } from "../redux/features/notifications/notificationsSlice";
import { SocketContext, socket } from "../utils/SocketContext";
import NextNprogress from "nextjs-progressbar";

const GlobalStyle = ({ children }: any) => {
  return (
    <>
      <Global
        styles={css`
          html {
            height: 100%;
          }
          body {
            height: 100%;
          }
          #__next {
            height: 100%;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalStyle>
        <SocketContext.Provider value={socket}>
          <Head>
            <title>ChatApp - Happy Octopus</title>
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
          </Head>
          <NextNprogress
            color="#F387B3"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </SocketContext.Provider>
      </GlobalStyle>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context: any) => {
    const user = store.getState().user;
    const notifications = store.getState().notifications;
    if (context.ctx.req) {
      const cookie = context.ctx.req.cookies.qid;
      const actualCookie = cookie === undefined ? null : `qid=${cookie}`;
      store.dispatch(getCookie(actualCookie));

      if (cookie) {
        if (notifications.value[0]?.chatId === 0) {
          const notificationsResponse = await FetchUserNotifications(
            actualCookie
          );
          store.dispatch(setNotifications(notificationsResponse));
        }
      }

      if (user.value.id === null) {
        await fetchAndStoreUser(store, actualCookie);
      }
    } else {
      if (user.value.id === null) {
        await fetchAndStoreUser(store);
      }
    }
  }
);

export default wrapper.withRedux(MyApp);
