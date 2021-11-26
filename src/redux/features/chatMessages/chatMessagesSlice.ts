import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { MessageData } from "../../../components/cards/messageCard";

interface UserChatsState {
  value: { messages: MessageData[]; hasMore: boolean };
}

const initialState: UserChatsState = {
  value: {
    messages: [
      {
        chatId: 0,
        cursor: "0000",
        createdAt: "0000",
        id: 0,
        readers: [
          {
            createdAt: "0000",
            id: 0,
            profilePicUrl: "none",
            username: "Guest",
          },
        ],
        senderId: 0,
        text: "none",
        updatedAt: "0000",
      },
    ],
    hasMore: false,
  },
};

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    setChatMessages(state, action) {
      state.value = action.payload;
    },
    fetchMoreChatMessages(state, action) {
      alert("fetched more chats");
      state.value.hasMore = action.payload.hasMore;
      state.value.messages = [
        ...state.value.messages,
        ...action.payload.messages,
      ];
    },
    sendNewMessage(state, action) {
      alert("sendNewMessage");
      state.value.messages = [action.payload, ...state.value.messages];
    },
    resetMessages(state) {
      alert("resetMessages");
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      if (action.payload.chatMessages) {
        state.value = action.payload.chatMessages.value;
      }
    });
  },
});

export const {
  resetMessages,
  sendNewMessage,
  setChatMessages,
  fetchMoreChatMessages,
} = chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
