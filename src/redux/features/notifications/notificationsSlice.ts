import { createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface Notification {
  chatId: number;
  userId: number;
  messageId: number;
  senderId: number;
}

interface NotificationsState {
  value: Notification[];
}

const initialState: NotificationsState = {
  value: [{ chatId: 0, senderId: 0, messageId: 0, userId: 0 }],
};

const cookieSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.value = action.payload;
    },
    removeNotifications(state, action) {
      const newNotificationsList = current(state.value).filter(
        (notification) => notification.chatId !== action.payload.chatId
      );
      state.value = newNotificationsList;
    },
    newNotification(state, action) {
      const newNotificationsList = current(state.value).filter(
        (notification) =>
          notification.chatId !== action.payload.message.message.chatId
      );
      state.value = [
        ...newNotificationsList,
        {
          chatId: action.payload.message.chat.id,
          userId: action.payload.CurrentUserId,
          senderId: action.payload.message.message.senderId,
          messageId: action.payload.message.message.id,
        },
      ];
    },
    resetNotifications(state) {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      if (action.payload.notifications) {
        state.value = action.payload.notifications.value;
      }
    });
  },
});

export const {
  resetNotifications,
  newNotification,
  removeNotifications,
  setNotifications,
} = cookieSlice.actions;
export default cookieSlice.reducer;
