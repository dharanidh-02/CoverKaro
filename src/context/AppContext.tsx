import React, { createContext, useContext, useState, useCallback } from "react";

interface UserProfile {
  phone: string;
  platform: string;
  city: string;
  zone: string;
  weeklyEarnings: number;
  isOnboarded: boolean;
  policyActive: boolean;
  premium: number;
}

interface AppContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  setUser: (u: UserProfile | null) => void;
  setIsAdmin: (v: boolean) => void;
  updateUser: (partial: Partial<UserProfile>) => void;
  logout: () => void;
}

const defaultUser: UserProfile = {
  phone: "",
  platform: "",
  city: "",
  zone: "",
  weeklyEarnings: 0,
  isOnboarded: false,
  policyActive: false,
  premium: 0,
};

const AppContext = createContext<AppContextType>({
  user: null,
  isAdmin: false,
  setUser: () => {},
  setIsAdmin: () => {},
  updateUser: () => {},
  logout: () => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("coverkaro_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const persistUser = useCallback((u: UserProfile | null) => {
    setUser(u);
    if (u) localStorage.setItem("gigshield_user", JSON.stringify(u));
    else localStorage.removeItem("gigshield_user");
  }, []);

  const updateUser = useCallback((partial: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...(prev || defaultUser), ...partial };
      localStorage.setItem("gigshield_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("gigshield_user");
  }, []);

  return (
    <AppContext.Provider value={{ user, isAdmin, setUser: persistUser, setIsAdmin, updateUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};
