import { createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ChatData } from "../../../components/cards/chatCard";

export interface UserChatsState {
  value: { chats: ChatData[]; hasMore: boolean };
}

const initialState: UserChatsState = {
  value: { chats: [], hasMore: false },
};

const userChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action) {
      state.value = action.payload;
    },
    fetchMoreChats(state, action) {
      state.value.hasMore = action.payload.hasMore;
      state.value.chats = [...state.value.chats, ...action.payload.chats];
    },
    readChat(state, action) {
      const newChatsList = current(state.value).chats.map((chat) => {
        if (chat.id !== action.payload.chatId) {
          return chat;
        } else {
          const chatThatWasRead: ChatData = {
            ...chat,
            lastMessage: {
              ...chat.lastMessage,
              readers: [
                ...chat.lastMessage.readers,
                { id: action.payload.userId },
              ],
            },
          };

          return chatThatWasRead;
        }
      });
      state.value = { chats: newChatsList, hasMore: state.value.hasMore };
    },
    newMessageSentToChat(state, action) {
      const newMessage = action.payload.message;
      const otherChats = current(state.value).chats.filter(
        (obj) => obj.id !== newMessage.chatId
      );
      state.value = {
        chats: [
          {
            members: action.payload.chat.members,
            id: action.payload.chat.id,
            lastMessage: {
              ...newMessage,
              readers: [{ id: newMessage.senderId }],
            },
          },
          ...otherChats,
        ],
        hasMore: state.value.hasMore,
      };
    },
    newChatMessageReceived(state, action) {
      const otherChats = current(state.value).chats.filter(
        (obj) => obj.id !== action.payload.id
      );

      state.value.chats = [action.payload, ...otherChats];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      state.value = action.payload.chats.value;
    });
  },
});

export const {
  newChatMessageReceived,
  readChat,
  newMessageSentToChat,
  setChats,
  fetchMoreChats,
} = userChatsSlice.actions;
export default userChatsSlice.reducer;
