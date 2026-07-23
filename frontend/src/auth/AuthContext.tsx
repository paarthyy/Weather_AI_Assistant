import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getCurrentUser } from "./authService";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext =
  createContext<AuthContextType>(null!);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
  setTimeout(() => {
    setLoading(false);
  }, 0);
  return;
}

    getCurrentUser()

      .then((data) => {

        setUser(data);

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

      })

      .catch(() => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

      })

      .finally(() => {

        setLoading(false);

      });

  }, []);

  const login = (user: User) => {

    setUser(user);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

  };

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};