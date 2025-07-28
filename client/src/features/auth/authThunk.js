import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios.js';




// user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/user/login', userData);
      return res.data;
    } catch (err) {
      console.error(err)
      console.log(err.response.data.message)
      return rejectWithValue(err.response.data.message || 'User Login failed');
    }
  }
);

// user signup
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/user/signup', userData);
      return res.data;
    } catch (err) {
      console.error(err)
      return rejectWithValue(err.response.data.message || 'User registration failed');
    }
  }
);



// admin login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/admin/login', credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Admin login failed');
    }
  }
);




// refresh token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/token/refresh-token');
      return res.data;
    } catch (err) {
      return rejectWithValue('Refresh token failed');
    }
  }
);
