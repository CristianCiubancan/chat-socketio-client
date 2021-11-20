import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { MessageData } from "../../../components/cards/messageCard";

interface UserChatsState {
  value: { messages: MessageData[]; hasMore: boolean };
}

const initialState: UserChatsState = {
  value: { messages: [], hasMore: false },
};

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    setChatMessages(state, action) {
      state.value = action.payload;
    },
    fetchMoreChatMessages(state, action) {
      state.value.hasMore = action.payload.hasMore;
      state.value.messages = [
        ...state.value.messages,
        ...action.payload.messages,
      ];
    },
    sendNewMessage(state, action) {
      state.value.messages = [action.payload, ...state.value.messages];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      state.value = action.payload.chatMessages.value;
    });
  },
});

export const { sendNewMessage, setChatMessages, fetchMoreChatMessages } =
  chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
