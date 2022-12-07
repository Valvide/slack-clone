import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: "twVewS3Q2NjHouvnI36o",
  messages: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { enterRoom, setMessages } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;
export const selectMessages = (state) => state.app.messages;

export default appSlice.reducer;
