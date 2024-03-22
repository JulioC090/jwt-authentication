import { Check } from '@phosphor-icons/react/dist/ssr';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {}

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className="h-6 w-6 rounded bg-zinc-800 p-[2px] data-[state=checked]:bg-violet-600 hover:bg-zinc-700 focus:ring-2 ring-violet-800 ring-offset-2 ring-offset-zinc-900"
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check weight="bold" className="h-5 w-5 text-zinc-100" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
