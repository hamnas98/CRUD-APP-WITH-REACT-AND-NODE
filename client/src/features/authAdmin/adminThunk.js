import api from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/admin/users');
      return res.data.users;
    } catch (err) {
      return rejectWithValue('Failed to fetch users');
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


// createUser
export const createUserByAdmin = createAsyncThunk(
  "admin/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/create-user", userData); // changed from axiosInstance to api
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

//  updateUser
export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, updatedData); // changed from axiosInstance to api
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);