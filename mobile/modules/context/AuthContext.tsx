import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useStorageState } from "../auth/hooks/useStorageState";
import { authLogin } from "../auth/services/auth.service";
import { SessionAuth } from "../auth/types/auth.types";
import { router } from "expo-router";
import { API_URL } from "@/constants/api";

const AuthContext = createContext<{
  signIn: (emailOrUsername: string, password: string) => void;
  signOut: () => void;
  session?: SessionAuth | null;
  isLoading: boolean;
  error: string;
  validateSessionLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  error: "",
  validateSessionLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [error, setError] = useState<string>("");
  const [validateSessionLoading, setValidateSessionLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (session) {
      try {
        setValidateSessionLoading(true);
        const sessionAuth = JSON.parse(session);
        const response = await fetch(`${API_URL}/auth/verify-session`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${sessionAuth.access_token}`,
          },
        });
        if (!response.ok) {
          const refreshToken = await fetch(`${API_URL}/auth/refresh`, {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${sessionAuth.refresh_token}`,
            },
          });
          if (!refreshToken.ok) {
            setSession(null);
          } else {
            const newSession = await refreshToken.json();
            setSession(JSON.stringify(newSession));
          }
        }
      } catch {
        setSession(null);
        router.replace("/sign-in");
      } finally {
        setValidateSessionLoading(false);
      }
    }
  };

  const singIn = async (emailOrUsername: string, password: string) => {
    try {
      const sessionAuth = await authLogin(emailOrUsername, password);
      setSession(JSON.stringify(sessionAuth));
      router.replace("/");
    } catch {
      setError("Datos incorrectos");
    }
  };

  const singOut = () => {
    setSession(null);
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: singIn,
        signOut: singOut,
        isLoading,
        session: session ? JSON.parse(session) : null,
        error,
        validateSessionLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
