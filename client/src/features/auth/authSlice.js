import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, loginAdmin, refreshToken } from '../auth/authThunk.js';

const initialState = {
  user: null,
  admin: null,
  accessToken: localStorage.getItem('accessToken') || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.admin = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      state.isAuthenticated = false;
      state.isCheckingAuth = false;
      window.history.replaceState(null, '', '/');
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthCheckComplete: (state) => {
      state.isCheckingAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // User Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })

      // User Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })

      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })

      .addCase(refreshToken.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        
        if (action.payload.user) {
          state.user = action.payload.user;
        }
        if (action.payload.admin) {
          state.admin = action.payload.admin;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.admin = null;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
        localStorage.removeItem('accessToken');
      });
  },
});

export const { logout, clearError, setAuthCheckComplete } = authSlice.actions;
export default authSlice.reducer;