import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(oauth_provider: string, idToken: string): Promise<void>;
  signOut(): void;
}
interface ResponseSignInUser {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const [storagedToken, storagedUser] = await AsyncStorage.multiGet([
        '@reportai:token',
        '@reportai:user',
      ]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (storagedToken[1] && storagedUser[1]) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`;
        setUser(JSON.parse(storagedUser[1]));
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = async (oauth_provider: string, idToken: string) => {
    try {
      console.log('abc');
      const response = await api.post<ResponseSignInUser>('/session/mobile', {
        oauth_provider,
        idToken,
      });

      const {token, user} = response.data;

      await AsyncStorage.multiSet([
        ['@reportai:token', token],
        ['@reportai:user', JSON.stringify(user)],
      ]);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove(['@reportai:user', '@reportai:token']);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{user: user, signIn, signOut, signed: !!user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used from within an AuthProvider');
  }

  return context;
}
