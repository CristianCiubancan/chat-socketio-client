import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CookieState {
  value: string | null;
}

const initialState: CookieState = {
  value: "none",
};

const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    getCookie(state, action) {
      state.value = action.payload;
    },
    resetCookie(state) {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      if (action.payload.cookie) {
        state.value = action.payload.cookie.value;
      }
    });
  },
});

export const { resetCookie, getCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
