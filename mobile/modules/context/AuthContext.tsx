import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { router } from "expo-router";
import { API_URL } from "@/constants/api";
import { SessionAuth } from "../auth/types/auth.types";
import { useStorageState } from "../auth/hooks/useStorageState";
import { authLogin } from "../auth/services/auth.service";

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session: SessionAuth | null;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => {},
  session: null,
  isLoading: true,
  error: null,
});

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, storedSession], setStoredSession] =
    useStorageState("session");
  const [error, setError] = useState<string | null>(null);

  // Parsear la sesión almacenada
  const session = storedSession
    ? (JSON.parse(storedSession) as SessionAuth)
    : null;

  // Verificar sesión al cargar
  useEffect(() => {
    if (!isLoading && session) {
      const verifySession = async () => {
        try {
          const response = await fetch(`${API_URL}/auth/verify-session`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          });
          if (!response.ok) throw new Error("Invalid session");
        } catch {
          try {
            const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
              method: "POST",
              headers: { Authorization: `Bearer ${session.refreshToken}` },
            });

            if (!refreshResponse.ok) throw new Error("Refresh failed");

            const newSession = await refreshResponse.json();
            setStoredSession(JSON.stringify(newSession));
          } catch {
            setStoredSession(null);
            router.replace("/sign-in");
          }
        }
      };

      verifySession();
    }
  }, [isLoading, session]);

  const signIn = async (email: string, password: string) => {
    try {
      const newSession = await authLogin(email, password);
      setStoredSession(JSON.stringify(newSession));
      router.replace("/");
      setError(null);
    } catch {
      setError("Credenciales inválidas");
    }
  };

  const signOut = () => {
    setStoredSession(null);
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        error,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
