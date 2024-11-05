import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import viewerSlice from "./viewer/viewerSlice";
import logger from "redux-logger";
import generalSettingsSlice from "./general-settings/generalSettingsSlice";
import localPostsSavedListSlice from "./localPostSavedList/localPostsSavedListSlice";
import postsNcmazMetaDataOkSlice from "./postsNcmazMetaDataOk/postsNcmazMetaDataOkSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  viewer: viewerSlice,
  generalSettings: generalSettingsSlice,
  localPostsSavedList: localPostsSavedListSlice,
  postsNcmazMetaDataOk: postsNcmazMetaDataOkSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  //
  middleware:
    process.env.NODE_ENV !== "production"
      ? // @ts-ignore
        (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : undefined,
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
