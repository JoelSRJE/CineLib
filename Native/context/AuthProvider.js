import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import logoutUser from "../api/LoginUser";

const AuthContext = createContext(null);
const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = user !== null;

  useEffect(() => {
    let isStillActive = true;

    const restoreSession = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");

        if (!token) {
          return;
        }

        const response = await fetch(`${BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();

          if (isStillActive) {
            setUser(userData);
            setAuthToken(token);
          }
        } else if (response.status === 401 || response.status === 403) {
          await SecureStore.deleteItemAsync("authToken");
        }
      } catch (error) {
        console.error("Could not restore session: ", error);
      } finally {
        if (isStillActive) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isStillActive = false;
    };
  }, []);

  const login = async (userData, token) => {
    await SecureStore.setItemAsync("authToken", token);

    setUser(userData);
    setAuthToken(token);
  };

  const logout = async () => {
    let dbLogout = false;

    try {
      if (user && authToken) {
        await logoutUser({
          userId: user.userId,
          authToken,
        });

        dbLogout = true;
      }
    } catch (error) {
      console.error("DB logout failed: ", error);
    } finally {
      await SecureStore.deleteItemAsync("authToken");

      setUser(null);
      setAuthToken(null);
    }

    return dbLogout;
  };

  const updateUserData = (updatedUser) => {
    setUser((currentUser) => ({
      ...currentUser,
      ...updatedUser,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        isLoggedIn,
        isLoading,
        login,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
