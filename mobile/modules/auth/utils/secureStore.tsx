import * as SecureStore from "expo-secure-store";
import { SessionAuth } from "../types/auth.types";

export const secureStore = {
  async getSession(): Promise<SessionAuth | null> {
    try {
      const session = await SecureStore.getItemAsync("session");
      if (session) {
        return JSON.parse(session) as SessionAuth;
      }
      return null;
    } catch {
      return null;
    }
  },
  async saveSession(sessionAuth: SessionAuth) {
    try {
      return await SecureStore.setItemAsync(
        "session",
        JSON.stringify(sessionAuth),
      );
    } catch {
      return;
    }
  },

  async deleteSession() {
    try {
      return await SecureStore.deleteItemAsync("session");
    } catch {
      return;
    }
  },

  async saveNewAccessToken(newAccessToken: string) {
    try {
      const session = await this.getSession();
      if (!session) return;
      await SecureStore.setItemAsync(
        "session",
        JSON.stringify({
          accessToken: newAccessToken,
          refreshToken: session.refreshToken,
          user: session.user,
        }),
      );
    } catch {
      return;
    }
  },
};
