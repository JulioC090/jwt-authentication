'use client';

import getAxiosHttpClient from '@/infra/axiosHttpClient';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
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
  isAuthenticated: boolean;
  signIn(data: SignInData): void;
  signUp(data: SignUpData): void;
  logout(): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

const httpClient = getAxiosHttpClient();

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const isAuthenticated = !!parseCookies()['nextauth.token'];

  async function signIn({ email, password }: SignInData) {
    const response = await httpClient<{ token: string }>({
      method: 'post',
      url: '/auth',
      data: {
        email,
        password,
      },
    });

    const { token } = response.data;

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1,
    });

    httpClient.defaults.headers['Authorization'] = `Bearer ${token}`;

    router.push('/home');
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

    const { token } = response.data;

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1,
    });

    httpClient.defaults.headers['Authorization'] = `Bearer ${token}`;

    router.push('/home');
  }

  async function logout() {
    const response = await httpClient<{ token: string }>({
      method: 'post',
      url: '/logout',
    });

    destroyCookie(undefined, 'nextauth.token');

    httpClient.defaults.headers['Authorization'] = '';

    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
