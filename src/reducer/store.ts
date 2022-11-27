import { ICityList, IForeCastWeather, IWeather } from "./../action/index";
import {
  configureStore,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import allReducers from ".";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: allReducers,
  middleware: [thunk],
  devTools: true,
});
type IPayloadAction =
  | { selectedCity: ICityList; name: string }
  | string
  | ICityList[]
  | ICityList
  | IForeCastWeather
  | IWeather;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<
  RootState,
  {},
  PayloadAction<IPayloadAction>
>;
