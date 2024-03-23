'use client';

import Button from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { AuthContext } from '@/contexts/AuthContext';
import { Envelope, Lock } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISignInFields {
  name: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<ISignInFields>();
  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<ISignInFields> = async (data) => {
    signIn(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-zinc-100 mt-6 text-center text-3xl font-extrabold">
          Entrar na sua conta
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <label htmlFor="email" className="flex flex-col gap-3">
            <span className="text-zinc-100 font-semibold">
              Endereço de e-mail
            </span>
            <TextInput.Root>
              <TextInput.Icon>
                <Envelope />
              </TextInput.Icon>
              <TextInput.Input
                {...register('email')}
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
                {...register('password')}
                type="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </TextInput.Root>
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
