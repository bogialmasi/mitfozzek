'use client'
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

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

  // Helper function to check if the token is expired
  const isTokenExpired = (token: string): boolean => {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Expiration time is in seconds, convert to milliseconds
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token is expired, log out the user
      if (isTokenExpired(token)) {
        console.log("Token has expired, logging out.");
        localStorage.removeItem('token');
        setUser(null);
      } else {
        try {
          const decodedUser = jwtDecode<User>(token);
          setUser(decodedUser);
        } catch (error) {
          console.error('Token is invalid', error);
        }
      }
    }
    setLoading(false);
  }, []);

  // Run expiration check every 5 seconds to see if the token has expired
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        console.log("Token expired after 1 minute, logging out.");
        localStorage.removeItem('token');
        setUser(null); // Clear the user state
      }
    }, 5000); // Check every 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode<User>(token);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
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