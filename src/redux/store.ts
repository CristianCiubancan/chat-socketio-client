import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import cookieReducer from "./features/cookie/cookieSlice";
import usersReducer from "./features/users/usersSlice";
import userReducer from "./features/user/userSlice";
import userChatsReducer from "./features/userChats/userChatsSlice";
import userChatReducer from "./features/userChat/userChatSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
import chatMessagesReducer from "./features/chatMessages/chatMessagesSlice";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      cookie: cookieReducer,
      users: usersReducer,
      user: userReducer,
      chats: userChatsReducer,
      chat: userChatReducer,
      chatMessages: chatMessagesReducer,
      notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          maxAge: 1000 * 30,
          // maxAge:  60 * 60 * 24 * 10,
          subtrees: [
            `cookie`,
            `users`,
            `user`,
            `chats`,
            `chat`,
            `chatMessages`,
            `notifications`,
          ],
        })
      ),
  })
);

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
