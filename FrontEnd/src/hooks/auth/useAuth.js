import { create } from "zustand";
import { loginUser, registerUser } from "../../api";

const useAuth = create((set, get) => ({
    user: null,
    accessToken: null,

    loading: false,
    err: null,

    actions: {
        login: async (loginUserData) => {
            set({ loading: true });
            try {
                const res = await loginUser(loginUserData);
                console.log(res);
            } catch(err) { set({ err }); }
            finally { set({ loading: false }); }
        },

        register: async(registerUserData) => {
            set({ loading: true });
            try {
                const res = await registerUser(registerUserData);
                const { user, token } = res.data;
                set({
                    user,
                    accessToken: token                    
                })
            } catch(err) { set({ err }) } 
            finally { set({ loading: false });}
        }
    }
}))

export default useAuth;