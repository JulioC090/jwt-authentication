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

    const { exp } = jwt.decode(token) as JwtPayload;
    Cookie.set('auth_token', token, { expires: new Date(exp! * 1000) });

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

    const { exp } = jwt.decode(token) as JwtPayload;
    Cookie.set('auth_token', token, { expires: new Date(exp! * 1000) });

    httpClient.defaults.headers['Authorization'] = `Bearer ${token}`;

    router.push('/home');
  }

  async function logout() {
    const response = await httpClient<{ token: string }>({
      method: 'post',
      url: '/logout',
    });

    Cookie.remove('auth_token');

    httpClient.defaults.headers['Authorization'] = '';

    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
