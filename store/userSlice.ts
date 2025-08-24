import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@react-native-google-signin/google-signin";

interface UserState {
  user: User | null;
  accessToken: string | null;
  idToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  idToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        idToken: string;
      }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
    },
    clearUser(state) {
      state.user = null;
      state.accessToken = null;
      state.idToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
