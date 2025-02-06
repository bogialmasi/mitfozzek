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
        logout();
      } else {
        try {
          const decodedUser = jwtDecode<User>(token);
          setUser({
            userId: decodedUser.userId,
            username: decodedUser.username,
          })
          console.log("Decoded User:", decodedUser, "\n userId:", decodedUser.userId, "\n username:", decodedUser.username);
        } catch (error) {
          console.error('Token is invalid', error);
          logout();
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
        localStorage.removeItem('token');
        setUser(null); // Clear the user state
      }
    }, 5000); // Check every 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session');
    setUser(null);
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('session', 'true') // session has started when user logged in
    const decodedUser = jwtDecode<User>(token);
    if (isTokenExpired(token)) {
      console.log("Token expired on login, logging out.");
      logout();
    } else {
      setUser(decodedUser);
    };
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