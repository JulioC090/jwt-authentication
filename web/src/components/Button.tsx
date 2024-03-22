import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="py-3 px-4 bg-violet-600 rounded font-semibold text-zinc-100 text-sm w-full transition-colors hover:bg-violet-500 focus:ring-2 ring-violet-800 ring-offset-2 ring-offset-zinc-900"
      {...rest}
    >
      {children}
    </button>
  );
}
