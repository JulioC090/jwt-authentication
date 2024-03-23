'use client';

import getAxiosHttpClient from '@/infra/axiosHttpClient';
import Cookie from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

interface AuthContextType {
  signIn(data: SignInData): Promise<false | undefined>;
  signUp(data: SignUpData): void;
  logout(): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const httpClient = getAxiosHttpClient(router);

  function setToken(token: string) {
    const { exp } = jwt.decode(token) as JwtPayload;
    Cookie.set('auth_token', token, { expires: new Date(exp! * 1000) });
    router.push('/home');
  }

  function removeToken() {
    Cookie.remove('auth_token');
    router.push('/login');
  }

  async function signIn({ email, password }: SignInData) {
    const response = await httpClient<{ token: string }>({
      method: 'post',
      url: '/auth',
      data: {
        email,
        password,
      },
    });

    if (response.status === 401) return false;

    setToken(response.data.token);
  }

  async function signUp({ name, email, password }: SignUpData) {
    const response = await httpClient<{ token: string }>({
      method: 'post',
      url: '/signup',
      data: {
        name,
        email,
        password,
      },
    });

    setToken(response.data.token);
  }

  async function logout() {
    const response = await httpClient<{ token: string }>({
      method: 'post',
      url: '/logout',
    });

    removeToken();
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
