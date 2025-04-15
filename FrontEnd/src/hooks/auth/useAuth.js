import { create } from "zustand";
import { loginUser, registerUser } from "../../api";

const useAuth = create((set) => {
  const savedToken = localStorage.getItem("accessToken");

  const savedUserData = localStorage.getItem("user");
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
          const { user, token } = await loginUser(loginUserData);

          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(user));

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

      register: async (registerUserData) => {
        set({ loading: true, err: null });
        try {
          const { user, token } = await registerUser(registerUserData);

          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(user));

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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

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