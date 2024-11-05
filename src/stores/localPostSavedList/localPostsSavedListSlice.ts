import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocalPostsSavedListState {
  localSavedPosts: number[];
}

const initialState: LocalPostsSavedListState = {
  localSavedPosts: [],
};

export const localPostsSavedListSlice = createSlice({
  name: "localPostsSavedList",
  initialState,
  reducers: {
    initLocalPostsSavedListFromLocalstored: (
      state,
      action: PayloadAction<number[]>
    ) => {
      state.localSavedPosts = action.payload;
      if (typeof window !== "undefined") {
        localStorage?.setItem(
          "localSavedPosts",
          JSON.stringify(state.localSavedPosts)
        );
      }

      return state;
    },
    updateLocalPostsSavedList: (state, action: PayloadAction<number>) => {
      if (state.localSavedPosts.includes(action.payload)) {
        state.localSavedPosts = state.localSavedPosts.filter(
          (item) => item !== action.payload
        );
      } else {
        state.localSavedPosts.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage?.setItem(
          "localSavedPosts",
          JSON.stringify(state.localSavedPosts)
        );
      }

      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateLocalPostsSavedList,
  initLocalPostsSavedListFromLocalstored,
} = localPostsSavedListSlice.actions;

export default localPostsSavedListSlice.reducer;
