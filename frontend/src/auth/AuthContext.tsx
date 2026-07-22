import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

  }, []);

  const login = (user: User) => {

    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

  };

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);