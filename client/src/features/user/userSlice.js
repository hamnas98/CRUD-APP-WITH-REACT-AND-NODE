// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { fetchUserProfile, uploadProfileImage } from './userThunk'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH PROFILE
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // UPLOAD IMAGE
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default userSlice.reducer
