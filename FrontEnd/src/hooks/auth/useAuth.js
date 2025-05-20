import { create } from 'zustand';
import { loginUser, registerUser } from '../../api';
import { LOCAL_STORAGE } from '../../constants';

const useAuth = create((set) => {
  const savedToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

  const savedUserData = localStorage.getItem(LOCAL_STORAGE.USER);
  let savedUser = null;
  try {
    savedUser = savedUserData ? JSON.parse(savedUserData) : null;
  } catch (error) {
    console.error("Erreur lors du parsing de l'utilisateur :", error);
    savedUser = null;
  }

  return {
    user: savedUser,
    accessToken: savedToken || null,

    loading: false,
    err: null,

    actions: {
      login: async (loginUserData) => {
        set({ loading: true, err: null });
        try {
          const { token } = await loginUser(loginUserData);

          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);

          set({
            accessToken: token,
            err: null
          });
        } catch (err) {
          set({ err });
        } finally {
          set({ loading: false });
        }
      },

      register: async (registerUserData) => {
        set({ loading: true, err: null });
        try {
          const { user, token } = await registerUser(registerUserData);

          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
          localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));

          set({
            user,
            accessToken: token,
            err: null,
          });
        } catch (err) {
          set({ err });
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
          err: null,
        });
      },
    },
  };
});

export default useAuth;
