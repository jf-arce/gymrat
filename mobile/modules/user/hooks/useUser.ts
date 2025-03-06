import { API_URL } from "@/constants/api";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import axios from "axios";
import { useAuthStore } from "@/modules/auth/stores/auth.store";

export const useUser = () => {
  const [user, setUser] = useState<User>();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState("");
  const authSession = useAuthStore((state) => state.authSession);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsUserLoading(true);
        const res = await axios.get(`${API_URL}/users/${authSession.user?.id}`);
        const user = res.data;
        setUser(user);
      } catch (error) {
        if (error instanceof Error) {
          setUserError(error.message);
        }
      } finally {
        setIsUserLoading(false);
      }
    };
    fetchUser();
  }, [authSession.user?.id]);

  return { user, isUserLoading, userError };
};
