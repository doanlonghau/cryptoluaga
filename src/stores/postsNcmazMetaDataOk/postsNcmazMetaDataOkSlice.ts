import {
  NcmazFcPostMetaFullFieldsFragment,
  QueryGetPostsNcmazMetadataByIdsQuery,
} from "@/__generated__/graphql";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TState = Record<
  string,
  {
    databaseId: number;
    commentCount: number;
    ncPostMetaData: Partial<NcmazFcPostMetaFullFieldsFragment>;
  }
>;

const initialState: TState = {};

export const postsNcmazMetaDataOkSlice = createSlice({
  name: "postsNcmazMetaDataOk",
  initialState,
  reducers: {
    removeAllPostsNcmazMetaDataOk: (state) => {
      state = {};
      return state;
    },
    updatePostsNcmazMetaDataOk: (
      state,
      action: PayloadAction<QueryGetPostsNcmazMetadataByIdsQuery["posts"]>
    ) => {
      const nodes = action?.payload?.nodes || [];

      const newState = nodes.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.databaseId]: cur,
        };
      }, {} as TState);

      state = {
        ...state,
        ...newState,
      };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeAllPostsNcmazMetaDataOk, updatePostsNcmazMetaDataOk } =
  postsNcmazMetaDataOkSlice.actions;

export default postsNcmazMetaDataOkSlice.reducer;
