import { API_URL } from "@/constants/api";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useSession } from "@/modules/context/AuthContext";

export const useUser = () => {
  const { session } = useSession();
  const [user, setUser] = useState<User>();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsUserLoading(true);
        const response = await fetch(`${API_URL}/users/${session?.user.id}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const user = await response.json();
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
  }, [session?.user]);

  return { user, isUserLoading, userError };
};
