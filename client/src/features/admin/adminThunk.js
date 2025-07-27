import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';


export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/admin/dashboard');
      return res.data.users;
    } catch (err) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const editUser = createAsyncThunk(
  'admin/editUser',
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue('Failed to edit user');
    }
  }
);


export const createUserByAdmin = createAsyncThunk(
  "admin/createUserByAdmin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/admin/create-user", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);


export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue('Failed to delete user');
    }
  }
);
