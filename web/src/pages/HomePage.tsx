'use client';

import Button from '@/components/Button';
import { AuthContext } from '@/contexts/AuthContext';
import getAxiosHttpClient from '@/infra/axiosHttpClient';
import { useContext, useEffect, useState } from 'react';

export default function HomePage() {
  const [userName, setUserName] = useState<string>();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    async function getName() {
      const axiosHttpClient = getAxiosHttpClient();
      const response = await axiosHttpClient({ method: 'get', url: '/name' });
      setUserName(response.data);
    }
    getName();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-violet-900 to-indigo-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bem-vindo, {userName}!
        </h1>
        <p className="text-lg md:text-xl">
          Esperamos que você tenha um ótimo dia.
        </p>
        <Button
          className="py-3 px-4 mt-8 bg-zinc-900 rounded font-semibold text-zinc-100 text-sm w-full hover:bg-zinc-800 focus:ring-2 ring-zinc-800 ring-offset-2 ring-offset-transparent"
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
