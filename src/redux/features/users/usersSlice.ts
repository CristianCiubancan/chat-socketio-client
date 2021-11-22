import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { UserData } from "../../../components/cards/userCard";

interface UsersState {
  value: { users: UserData[]; hasMore: boolean };
}

const initialState: UsersState = {
  value: {
    users: [
      { createdAt: "0000", id: 0, profilePicUrl: "none", username: "Guest" },
    ],
    hasMore: false,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.value = action.payload;
    },
    fetchMoreUsers(state, action) {
      state.value.hasMore = action.payload.hasMore;
      state.value.users = [...state.value.users, ...action.payload.users];
    },
    resetUsers(state) {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      if (action.payload.users) {
        state.value = action.payload.users.value;
      }
    });
  },
});

export const { resetUsers, setUsers, fetchMoreUsers } = usersSlice.actions;
export default usersSlice.reducer;
