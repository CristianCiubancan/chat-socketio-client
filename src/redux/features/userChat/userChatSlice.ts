import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ChatData } from "../../../components/cards/chatCard";

interface UserChatState {
  value: ChatData;
}

const initialState: UserChatState = {
  value: {
    id: 0,
    lastMessage: {
      senderId: 0,
      cursor: "0000",
      text: "",
      chatId: 0,
      createdAt: "00-00-0000",
      readers: [{ id: 0 }],
    },
    members: [{ id: 0, username: "", profilePicUrl: "", createdAt: "" }],
  },
};

const userChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      if (action.payload.chat) {
        state.value = action.payload.chat.value;
      }
    });
  },
});

export const { setChat } = userChatSlice.actions;
export default userChatSlice.reducer;
