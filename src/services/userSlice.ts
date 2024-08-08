import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { TOKEN_EXPIRED, UNAUTHORIZED } from "../constants";
import { RootState } from "./store";

interface UserState {
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  isForgotPassword: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;

  registrationRequest: boolean;
  registrationFailed: boolean;

  token: string;

  loginRequest: boolean;
  loginFailed: boolean;

  sendUserInfoRequest: boolean;
  sendUserInfoFailed: boolean;

  userInfo: UserInfo | null;

  logoutRequest: boolean;
  logoutFailed: boolean;

  getUserInfoRequest: boolean;
  getUserInfoFailed: boolean;

  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
}

interface UserInfo {
  email: string;
  name: string;
}

interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}

export const initialState: UserState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  isForgotPassword: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,

  registrationRequest: false,
  registrationFailed: false,

  token: localStorage.getItem("accessToken") || "",

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

export const forgotPassword = createAsyncThunk<void, string>(
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

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string }
>("user/resetPassword", async ({ password, token }, { dispatch }) => {
  try {
    await axiosInstance.post("/password-reset/reset", { password, token });
    dispatch(setResetPasswordSuccess());
    dispatch(setForgotPasswordState(false));
  } catch (error) {
    dispatch(setResetPasswordFailed());
  }
});

export const registration = createAsyncThunk<
  void,
  { email: string; name: string; password: string }
>("user/registration", async ({ email, name, password }, { dispatch }) => {
  try {
    const response = await axiosInstance.post<RegistrationResponse>(
      "/auth/register",
      {
        email,
        name,
        password,
      },
    );
    dispatch(registrationUserSuccess(response.data.accessToken));
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (error) {
    dispatch(registrationUserFailed());
  }
});

export const login = createAsyncThunk<
  void,
  { email: string; password: string }
>("user/login", async ({ email, password }, { dispatch }) => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    dispatch(setLoginSuccess(response.data));
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (error) {
    dispatch(setLoginFailed());
    console.log(error);
  }
});

export const sendUserData = createAsyncThunk<
  void,
  { token: string; name: string; email: string; password: string }
>(
  "user/sendUserData",
  async ({ token, name, email, password }, { dispatch }) => {
    try {
      const response = await axiosInstance.patch<{ user: UserInfo }>(
        "/auth/user",
        { name, email, password },
        {
          headers: { Authorization: token },
        },
      );
      dispatch(sendUserInfoSuccess(response.data.user));
    } catch (error) {
      const axiosError = error as any;
      if (axiosError.response?.status === TOKEN_EXPIRED) {
        dispatch(refreshToken(localStorage.getItem("refreshToken") as string));
      }
      dispatch(sendUserInfoFailed());
    }
  },
);

export const logout = createAsyncThunk<void, string>(
  "user/logout",
  async (refreshToken, { dispatch }) => {
    try {
      await axiosInstance.post("/auth/logout", { token: refreshToken });
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      dispatch(setLogoutSuccess());
    } catch (error) {
      dispatch(setLogoutFailed());
    }
  },
);

export const getUserData = createAsyncThunk<void, string>(
  "user/getUserData",
  async (token, { dispatch }) => {
    try {
      const response = await axiosInstance.get<{ user: UserInfo }>(
        "/auth/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      dispatch(setGetUserInfoSuccess(response.data.user));
    } catch (error) {
      const axiosError = error as any;
      if (
        axiosError.response?.status === TOKEN_EXPIRED ||
        axiosError.response?.status === UNAUTHORIZED
      ) {
        dispatch(refreshToken(localStorage.getItem("refreshToken") as string));
      }
      dispatch(setGetUserInfoFailed());
    }
  },
);

export const refreshToken = createAsyncThunk<void, string>(
  "user/refreshToken",
  async (refreshToken, { dispatch }) => {
    try {
      const response = await axiosInstance.post<{
        accessToken: string;
        refreshToken: string;
      }>("/auth/token", {
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
    setForgotPasswordState(state, action: PayloadAction<boolean>) {
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
    registrationUserSuccess(state, action: PayloadAction<string>) {
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
    setLoginSuccess(state, action: PayloadAction<LoginResponse>) {
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
    sendUserInfoSuccess(state, action: PayloadAction<UserInfo>) {
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
      state.token = "";
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
    setGetUserInfoSuccess(state, action: PayloadAction<UserInfo>) {
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
    setRefreshTokenSuccess(state, action: PayloadAction<string>) {
      state.refreshTokenRequest = false;
      state.token = action.payload;
    },
    setRefreshTokenFailed(state) {
      state.refreshTokenRequest = false;
      state.refreshTokenFailed = true;
    },
  },
});

export const selectIsForgotPassword = (state: RootState) => {
  return state.user.isForgotPassword;
};

export const selectAccessToken = (state: RootState) => {
  return state.user.token;
};

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
