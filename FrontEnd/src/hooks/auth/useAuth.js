import { create } from 'zustand';
import {
  loginUser,
  registerUser,
  sendVerificationCode,
  verifyEmail,
  forgotPassword,
  verifyResetCode,
  resetPassword
} from '../../api';
import { LOCAL_STORAGE } from '../../constants';

const useAuth = create((set) => {
  const savedToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  const savedUserData = localStorage.getItem(LOCAL_STORAGE.USER);
  let savedUser = null;

  try {
    savedUser = savedUserData ? JSON.parse(savedUserData) : null;
  } catch (error) {
    console.error("Error parsing saved user:", error);
  }

  return {
    user: savedUser,
    accessToken: savedToken || null,
    pendingVerificationEmail: null,
    pendingResetEmail: null,
    loading: false,
    err: null,

    actions: {
      login: async (data) => {
        set({ loading: true, err: null });
        try {
          const response = await loginUser(data);
          const { token, user } = response;

          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
          localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));

          set({
            user,
            accessToken: token,
            err: null,
            pendingVerificationEmail: null
          });

          return { success: true };
        } catch (err) {
          const errorData = err.response?.data || { message: err.message };
          set({ err: errorData });
          throw errorData;
        } finally {
          set({ loading: false });
        }
      },

      register: async (data) => {
        set({ loading: true, err: null });
        try {
          const response = await registerUser(data);

          if (response.requiresVerification) {
            set({
              pendingVerificationEmail: response.user.email,
              err: null
            });
            return {
              requiresVerification: true,
              email: response.user.email,
              message: response.message
            };
          }

          const { token, user } = response;
          if (token) {
            localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
            localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));
            set({
              user,
              accessToken: token,
              err: null,
              pendingVerificationEmail: null
            });
          }

          return { success: true };
        } catch (err) {
          const errorData = err.response?.data || { message: err.message };
          set({ err: errorData });
          throw errorData;
        } finally {
          set({ loading: false });
        }
      },

      sendVerificationCode: async (email) => {
        set({ loading: true, err: null });
        try {
          return await sendVerificationCode(email);
        } catch (err) {
          const errorData = err.response?.data || { message: err.message };
          set({ err: errorData });
          throw errorData;
        } finally {
          set({ loading: false });
        }
      },

      verifyEmail: async (email, code) => {
        set({ loading: true, err: null });
        try {
          const response = await verifyEmail(email, code);
          const { token, user } = response;

          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
          localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));

          set({
            user,
            accessToken: token,
            err: null,
            pendingVerificationEmail: null
          });

          return { success: true, message: response.message };
        } catch (err) {
          const errorData = err.response?.data || { message: err.message };
          set({ err: errorData });
          throw errorData;
        } finally {
          set({ loading: false });
        }
      },

      forgotPassword: async (email) => {
        set({ loading: true, err: null });
        try {
          const response = await forgotPassword(email);
          set({
            pendingResetEmail: email,
            err: null
          });
          return { success: true, message: response.message };
        } catch (err) {
          const errorData = err.response?.data || { message: err.message };
          set({ err: errorData });
          throw errorData;
        } finally {
          set({ loading: false });
        }
      },

      verifyResetCode: async (email, code) => {
        set({ loading: true, err: null });
        try {
          const response = await verifyResetCode({ email, code });
          return { success: true, token: response.token };
        } catch (err) {
          const errorData = err.response?.data || { message: err.message };
          set({ err: errorData });
          throw errorData;
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, email, newPassword) => {
        set({ loading: true, err: null });
        try {
          const response = await resetPassword({ token, email, newPassword });
          set({
            pendingResetEmail: null,
            err: null
          });
          return { success: true, message: response.message };
        } catch (err) {
          const errorData = err.response?.data || { message: err.message };
          set({ err: errorData });
          throw errorData;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.USER);
        set({
          user: null,
          accessToken: null,
          pendingVerificationEmail: null,
          pendingResetEmail: null,
          err: null
        });
      },

      clearError: () => set({ err: null }),
      clearPendingVerification: () => set({ pendingVerificationEmail: null }),
      clearPendingReset: () => set({ pendingResetEmail: null })
    }
  };
});

export default useAuth;