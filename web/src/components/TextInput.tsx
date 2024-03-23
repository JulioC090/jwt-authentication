import { Slot } from '@radix-ui/react-slot';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface TextInputRootProps {
  children: ReactNode;
}

function TextInputRoot(props: TextInputRootProps) {
  return (
    <div className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-zinc-800 w-full focus-within:ring-2 ring-violet-800 ring-offset-2 ring-offset-zinc-900">
      {props.children}
    </div>
  );
}

export interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon(props: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-zinc-400">{props.children}</Slot>;
}

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInputInput = forwardRef<HTMLInputElement, TextInputInputProps>(
  (props, ref) => (
    <input
      className="bg-transparent flex-1 text-zinc-100 text-sm placeholder:text-zinc-400 outline-none"
      ref={ref}
      {...props}
    />
  ),
);

TextInputInput.displayName = 'TextInputInput';

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
