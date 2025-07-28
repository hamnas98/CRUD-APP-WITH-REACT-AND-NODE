import { createSlice } from "@reduxjs/toolkit";

import {fetchAllUsers,createUserByAdmin,deleteUser,updateUser} from '../admin/adminThunk.js'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      })
      .addCase(createUserByAdmin.pending, (state) => {
          state.loading = true;
      })
      .addCase(createUserByAdmin.fulfilled, (state, action) => {
          state.loading = false;
          state.users.push(action.payload.user);
     })
     .addCase(createUserByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload.user._id);
        if (index !== -1) {
            state.users[index] = action.payload.user;
        }
    })
  },
});

export default adminSlice.reducer;