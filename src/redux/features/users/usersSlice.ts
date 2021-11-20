import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { UserData } from "../../../components/cards/userCard";

interface UsersState {
  value: { users: UserData[]; hasMore: boolean };
}

const initialState: UsersState = {
  value: { users: [], hasMore: false },
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
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      state.value = action.payload.users.value;
    });
  },
});

export const { setUsers, fetchMoreUsers } = usersSlice.actions;
export default usersSlice.reducer;
