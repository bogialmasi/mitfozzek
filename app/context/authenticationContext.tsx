'use client'
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import cookie from 'cookie';

type User = {
  userId: number;
  username: string;
};

interface UserAuthenticationContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface UserAuthenticationProviderProps {
  children: React.ReactNode;
}

// Context
const UserAuthenticationContext = createContext<UserAuthenticationContextType | undefined>(undefined);

// Provider
export const UserAuthenticationProvider: React.FC<UserAuthenticationProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token: string): boolean => {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // seconds, convert to milliseconds
  };

  useEffect(() => {
    setLoading(true);
    const cookies = document.cookie ? cookie.parse(document.cookie) : {};
    const token = cookies.token;
  
    if (token) {
      if (isTokenExpired(token)) {
        console.log("Token has expired, logging out.");
        logout(); 
      } else {
        try {
          const decodedUser = jwtDecode<User>(token);
          setUser({
            userId: decodedUser.userId,
            username: decodedUser.username,
          });
        } catch (error) {
          console.error('Token is invalid', error);
          logout();
        }
      }
    } else {
      setUser(null);
    }
  
    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/logout',
        {
          method: 'POST',
          credentials: 'include'
        });

      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const login = async () => {
    try {
      const res = await fetch('/api/authcheck', { credentials: 'include' });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data after login:", error);
      setUser(null);
    }
  };


  return (
    <UserAuthenticationContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserAuthenticationContext.Provider>
  );
};

export const useAuthentication = (): UserAuthenticationContextType => {
  const context = useContext(UserAuthenticationContext);
  if (!context) {
    throw new Error('useAuthentication is missing AuthProvider');
  }
  return context;
};