
import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js';

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/user/dashboard')
      return res.data.user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load profile')
    }
  }
)

// Upload profile image
export const uploadProfileImage = createAsyncThunk(
  'user/uploadImage',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/user/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data.user // assuming backend returns updated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Image upload failed')
    }
  }
)
