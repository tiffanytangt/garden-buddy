import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

interface Props extends HeadlessButtonProps {
  className?: string;
  variant: 'primary' | 'secondary' | 'error' | 'link' | 'outline';
}
export const Button = ({ className, variant, ...rest }: Props) => {
  const BUTTON_COLORS = {
    primary: 'bg-emerald-800 text-white',
    secondary: 'bg-slate-700 text-white',
    error: 'bg-red-700 text-white',
    link: 'bg-transparent text-gray-950 dark:text-white underline',
    outline:
      'border border-gray-300 dark:border-gray-600 text-gray-950 dark:text-white',
  };
  return (
    <HeadlessButton
      className={twMerge([
        BUTTON_COLORS[variant],
        'rounded-full p-2 disabled:text-gray-400 font-medium',
        className,
      ])}
      {...rest}
    />
  );
};
