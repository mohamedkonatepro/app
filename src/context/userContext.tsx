import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  username: string;
  email: string;
  role?: any;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  logout: () => void;
  login: (user: User) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    setUser(null);
    router.push('/login');
  };

  const login = (user: User) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, loading, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
