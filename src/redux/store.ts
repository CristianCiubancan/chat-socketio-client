import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import cookieReducer from "./features/cookie/cookieSlice";
import usersReducer from "./features/users/usersSlice";
import userReducer from "./features/user/userSlice";
import userChatsReducer from "./features/userChats/userChatsSlice";
import userChatReducer from "./features/userChat/userChatSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
import chatMessagesReducer from "./features/chatMessages/chatMessagesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      cookie: cookieReducer,
      users: usersReducer,
      user: userReducer,
      chats: userChatsReducer,
      chat: userChatReducer,
      chatMessages: chatMessagesReducer,
      notifications: notificationsReducer,
    },
  });
}

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
