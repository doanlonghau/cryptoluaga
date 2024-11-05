import { ViewerType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MyQueryGetCmsUserQuery } from "@/__generated__/graphql";

type MyViewerT = ViewerType & MyQueryGetCmsUserQuery["user"];
export interface ViewerState {
  viewer: Partial<MyViewerT> | null;
  viewerReactionPosts?:
    | {
        __typename?: "UserReactionPost" | undefined;
        id: string;
        title?: string | null | undefined;
        isNewAddedFromClient?: boolean | null | undefined;
        isNewUnLikeFromClient?: boolean | null | undefined;
        newLikedCount?: number | null | undefined;
      }[]
    | null;
  authorizedUser: {
    isAuthenticated: boolean | null;
    isReady: boolean;
    loginUrl: string | null;
  };
}

const initialState: ViewerState = {
  viewer: null,
  viewerReactionPosts: null,
  authorizedUser: {
    isAuthenticated: null,
    isReady: false,
    loginUrl: null,
  },
};

export const viewerSlice = createSlice({
  name: "viewer",
  initialState,
  reducers: {
    updateAuthorizedUser: (
      state,
      action: PayloadAction<ViewerState["authorizedUser"]>
    ) => {
      state.authorizedUser = action.payload;
      return state;
    },
    removeAll: (state) => {
      state.viewer = null;
      state.viewerReactionPosts = null;
      return state;
    },
    updateAll: (state, action: PayloadAction<ViewerState>) => {
      state = action.payload;
      return state;
    },
    updateViewer: (state, action: PayloadAction<ViewerState["viewer"]>) => {
      state.viewer = action.payload
        ? {
            ...(state.viewer || {}),
            ...(action.payload || {}),
          }
        : null;
      return state;
    },
    updateViewerAllReactionPosts: (
      state,
      action: PayloadAction<ViewerState["viewerReactionPosts"]>
    ) => {
      state = {
        ...state,
        viewerReactionPosts: action.payload,
      };
      return state;
    },
    addViewerReactionPosts: (
      state,
      action: PayloadAction<ViewerState["viewerReactionPosts"]>
    ) => {
      state = {
        ...state,
        viewerReactionPosts: [
          ...(state.viewerReactionPosts || []),
          ...(action.payload || []),
        ],
      };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removeAll,
  updateAll,
  updateViewer,
  updateViewerAllReactionPosts,
  addViewerReactionPosts,
  updateAuthorizedUser,
} = viewerSlice.actions;

export default viewerSlice.reducer;
