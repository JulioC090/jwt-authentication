'use client';

import Button from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { Envelope, Lock, User } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function SignUpPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Entrando na conta');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-zinc-100 mt-6 text-center text-3xl font-extrabold">
          Criar uma conta
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="name" className="flex flex-col gap-3">
            <span className="text-zinc-100 font-semibold">Seu nome</span>
            <TextInput.Root>
              <TextInput.Icon>
                <User />
              </TextInput.Icon>
              <TextInput.Input
                type="text"
                id="name"
                placeholder="Digite seu nome"
                required
              />
            </TextInput.Root>
          </label>

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

          <Button type="submit">Criar conta</Button>
        </form>

        <div className="text-center text-white">
          <p className="mt-2">
            Já tem uma conta?{' '}
            <Link
              href="/login"
              className="font-medium text-violet-600 rounded hover:text-violet-500 focus:ring-2 ring-violet-800 ring-offset-2 ring-offset-zinc-900"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
