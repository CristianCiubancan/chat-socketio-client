import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface CurrentUser {
  id: number | null;
  profilePicUrl: string;
  username: string;
}

interface UsersState {
  value: CurrentUser;
}

const initialState: UsersState = {
  value: { id: null, profilePicUrl: "none", username: "none" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.value = action.payload;
    },
    setUserAsGuest(state) {
      state.value = {
        id: 0,
        profilePicUrl:
          "https://socketio-backend.s3.eu-north-1.amazonaws.com/0/profilePic/load.jpg",
        username: "guest",
      };
    },
    setUserProfilePic(state, action) {
      state.value.profilePicUrl = action.payload;
    },
    resetUser(state) {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      if (action.payload.user) {
        state.value = action.payload.user.value;
      }
    });
  },
});

export const { resetUser, setUserProfilePic, setUser, setUserAsGuest } =
  userSlice.actions;
export default userSlice.reducer;
