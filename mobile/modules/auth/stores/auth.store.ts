import { create } from "zustand";
import { authLogin } from "../services/auth.service";
import { UserLogin } from "../types/auth.types";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { router } from "expo-router";
import { secureStore } from "../utils/secureStore";

interface AuthStore {
  authSession: {
    user: UserLogin | null;
    authenticated: boolean | null;
  };
  isLoading: boolean;
  error: string | null;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  checkSession: () => void;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  authSession: {
    user: {
      id: "",
      username: "",
      name: "",
      email: "",
      role: "",
    },
    authenticated: null,
  },
  isLoading: false,
  error: null,

  logIn: async (emailOrUsername: string, password: string) => {
    set({ isLoading: true });
    set({ error: null });
    try {
      const sessionAuth = await authLogin(emailOrUsername, password);
      set({
        authSession: {
          user: sessionAuth.user,
          authenticated: true,
        },
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${sessionAuth.accessToken}`;

      await secureStore.saveSession(sessionAuth);
      router.replace("/");
    } catch {
      set({ error: "Datos incorrectos" });
    } finally {
      set({ isLoading: false });
    }
  },

  logOut: async () => {
    try {
      await secureStore.deleteSession();

      axios.defaults.headers.common["Authorization"] = "";

      set({
        authSession: {
          user: null,
          authenticated: false,
        },
      });

      router.replace("/sign-in");
    } finally {
      set({ isLoading: false });
    }
  },

  checkSession: async () => {
    try {
      set({ isLoading: true });
      const session = await secureStore.getSession();
      if (!session) throw new Error("No session found");

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${session.accessToken}`;

      await axios.get(`${API_URL}/auth/verify-session`);

      // Update state with current session
      set({
        authSession: {
          user: session.user,
          authenticated: true,
        },
      });
    } catch (error) {
      // Refresh Token
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          const session = await secureStore.getSession();
          if (!session) throw new Error("No session found");

          const { data } = await axios.post(`${API_URL}/auth/refresh`, null, {
            headers: {
              Authorization: `Bearer ${session.refreshToken}`,
            },
          });

          set({
            authSession: {
              user: session.user,
              authenticated: true,
            },
          });

          // Update axios global headers and save new access token
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${data.newAccessToken}`;
          await secureStore.saveNewAccessToken(data.newAccessToken);
        } catch {
          get().logOut();
        }
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
