import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface CookieState {
  value: string | null;
}

const initialState: CookieState = {
  value: null,
};

const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    getCookie(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(HYDRATE, (state, action: any) => {
      state.value = action.payload.cookie.value;
    });
  },
});

export const { getCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
