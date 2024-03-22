'use client';

import Button from '@/components/Button';
import { Checkbox } from '@/components/CheckBox';
import { TextInput } from '@/components/TextInput';
import { Envelope, Lock } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function LoginPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Entrando na conta');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-zinc-100 mt-6 text-center text-3xl font-extrabold">
          Entrar na sua conta
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="flex flex-col gap-3">
            <span className="text-zinc-100 font-semibold">
              Endereço de e-mail
            </span>
            <TextInput.Root>
              <TextInput.Icon>
                <Envelope />
              </TextInput.Icon>
              <TextInput.Input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                required
              />
            </TextInput.Root>
          </label>

          <label htmlFor="password" className="flex flex-col gap-3">
            <span className="text-zinc-100 font-semibold">Sua senha</span>
            <TextInput.Root>
              <TextInput.Icon>
                <Lock />
              </TextInput.Icon>
              <TextInput.Input
                type="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </TextInput.Root>
          </label>

          <label htmlFor="remember" className="flex items-center gap-2">
            <Checkbox id="remember" />
            <span className="text-zinc-200 text-sm">
              Lembrar-me de mim por 30 dias
            </span>
          </label>

          <Button type="submit">Entrar</Button>
        </form>

        <div className="text-center text-white">
          <p className="mt-2">
            Não tem uma conta?{' '}
            <Link
              href="/signup"
              className="font-medium text-violet-600 rounded hover:text-violet-500 focus:ring-2 ring-violet-800 ring-offset-2 ring-offset-zinc-900"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
