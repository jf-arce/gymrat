import { API_URL } from "@/constants/api";
import { SessionAuth } from "../types/auth.types";

export const authLogin = async (
  emailOrUsername: string,
  password: string,
): Promise<SessionAuth> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailOrUsername, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  const session: SessionAuth = await res.json();

  return session;
};
