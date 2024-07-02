import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { TOKEN_EXPIRED, UNAUTHORIZED } from "../constants";

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  isForgotPassword: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,

  registrationRequest: false,
  registrationFailed: false,

  token: null,

  loginRequest: false,
  loginFailed: false,

  sendUserInfoRequest: false,
  sendUserInfoFailed: false,

  userInfo: null,

  logoutRequest: false,
  logoutFailed: false,

  getUserInfoRequest: false,
  getUserInfoFailed: false,

  refreshTokenRequest: false,
  refreshTokenFailed: false,
};

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { dispatch }) => {
    try {
      await axiosInstance.post("/password-reset", { email });
      dispatch(setForgotPasswordSuccess());
      dispatch(setForgotPasswordState(true));
    } catch (error) {
      dispatch(setForgotPasswordFailed());
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ password, token }, { dispatch }) => {
    try {
      await axiosInstance.post("/password-reset/reset", { password, token });
      dispatch(setResetPasswordSuccess());
      dispatch(setForgotPasswordState(false));
    } catch (error) {
      dispatch(setResetPasswordFailed());
    }
  },
);

export const registration = createAsyncThunk(
  "user/registration",
  async ({ email, name, password }, { dispatch }) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        email,
        name,
        password,
      });
      dispatch(registrationUserSuccess(response.data.accessToken));
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error) {
      dispatch(registrationUserFailed());
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      dispatch(setLoginSuccess(response.data));
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error) {
      dispatch(setLoginFailed());
      console.log(error);
    }
  },
);

export const sendUserData = createAsyncThunk(
  "user/sendUserData",
  async ({ token, name, email, password }, { dispatch }) => {
    try {
      const response = await axiosInstance.patch(
        "/auth/user",
        { name, email, password },
        {
          headers: { Authorization: token },
        },
      );
      dispatch(sendUserInfoSuccess(response.data.user));
    } catch (error) {
      if (error.response.status === TOKEN_EXPIRED) {
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
      }
      dispatch(sendUserInfoFailed());
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (refreshToken, { dispatch }) => {
    try {
      await axiosInstance.post("/auth/logout", { token: refreshToken });
      localStorage.removeItem("refreshToken");
      dispatch(setLogoutSuccess());
    } catch (error) {
      dispatch(setLogoutFailed());
    }
  },
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (token, { dispatch }) => {
    try {
      const response = await axiosInstance.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setGetUserInfoSuccess(response.data.user));
    } catch (error) {
      if (
        error.response.status === TOKEN_EXPIRED ||
        error.response.status === UNAUTHORIZED
      ) {
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
      }
      dispatch(setGetUserInfoFailed());
    }
  },
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (refreshToken, { dispatch }) => {
    try {
      const response = await axiosInstance.post("/auth/token", {
        token: refreshToken,
      });
      localStorage.setItem("refreshToken", response.data.refreshToken);
      dispatch(setRefreshTokenSuccess(response.data.accessToken));
    } catch (error) {
      dispatch(setRefreshTokenFailed());
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setForgotPasswordState(state, action) {
      state.isForgotPassword = action.payload;
    },
    setForgotPassword(state) {
      state.forgotPasswordRequest = true;
      state.forgotPasswordFailed = false;
    },
    setForgotPasswordSuccess(state) {
      state.forgotPasswordRequest = false;
    },
    setForgotPasswordFailed(state) {
      state.forgotPasswordFailed = true;
      state.forgotPasswordRequest = false;
    },
    setResetPassword(state) {
      state.resetPasswordRequest = true;
      state.resetPasswordFailed = false;
    },
    setResetPasswordSuccess(state) {
      state.resetPasswordRequest = false;
    },
    setResetPasswordFailed(state) {
      state.resetPasswordFailed = true;
      state.resetPasswordRequest = false;
    },
    registrationUser(state) {
      state.registrationRequest = true;
      state.registrationFailed = false;
    },
    registrationUserSuccess(state, action) {
      state.registrationRequest = false;
      state.token = action.payload;
    },
    registrationUserFailed(state) {
      state.registrationRequest = false;
      state.registrationFailed = true;
    },
    setLogin(state) {
      state.loginRequest = true;
      state.loginFailed = false;
    },
    setLoginSuccess(state, action) {
      state.loginRequest = false;
      state.token = action.payload.accessToken;
      state.userInfo = action.payload.user;
    },
    setLoginFailed(state) {
      state.loginRequest = false;
      state.loginFailed = true;
    },
    sendUserInfo(state) {
      state.sendUserInfoRequest = true;
      state.sendUserInfoFailed = false;
    },
    sendUserInfoSuccess(state, action) {
      state.sendUserInfoRequest = false;
      state.userInfo = action.payload;
    },
    sendUserInfoFailed(state) {
      state.sendUserInfoRequest = false;
      state.sendUserInfoFailed = true;
    },
    setLogout(state) {
      state.logoutRequest = true;
      state.logoutFailed = false;
    },
    setLogoutSuccess(state) {
      state.logoutRequest = false;
      state.token = null;
      state.userInfo = null;
    },
    setLogoutFailed(state) {
      state.logoutRequest = false;
      state.logoutFailed = true;
    },
    setGetUserInfo(state) {
      state.getUserInfoRequest = true;
      state.getUserInfoFailed = false;
    },
    setGetUserInfoSuccess(state, action) {
      state.getUserInfoRequest = false;
      state.userInfo = action.payload;
    },
    setGetUserInfoFailed(state) {
      state.getUserInfoRequest = false;
      state.getUserInfoFailed = true;
    },
    setRefreshToken(state) {
      state.refreshTokenRequest = true;
      state.refreshTokenFailed = false;
    },
    setRefreshTokenSuccess(state, action) {
      state.refreshTokenRequest = false;
      state.token = action.payload;
    },
    setRefreshTokenFailed(state) {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = true;
    },
  },
});

export const {
  setForgotPasswordState,
  setForgotPassword,
  setForgotPasswordSuccess,
  setForgotPasswordFailed,
  setResetPassword,
  setResetPasswordSuccess,
  setResetPasswordFailed,
  registrationUser,
  registrationUserSuccess,
  registrationUserFailed,
  setLogin,
  setLoginSuccess,
  setLoginFailed,
  sendUserInfo,
  sendUserInfoSuccess,
  sendUserInfoFailed,
  setLogout,
  setLogoutSuccess,
  setLogoutFailed,
  setGetUserInfo,
  setGetUserInfoSuccess,
  setGetUserInfoFailed,
  setRefreshToken,
  setRefreshTokenSuccess,
  setRefreshTokenFailed,
} = userSlice.actions;

export default userSlice.reducer;
