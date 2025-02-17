import {
  Input as HeadlessInput,
  InputProps as HeadlessInputProps,
} from '@headlessui/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends HeadlessInputProps {
  className?: string;
}

const _Input = forwardRef<HTMLInputElement>(
  ({ className, ...rest }: InputProps, ref) => {
    return (
      <HeadlessInput
        ref={ref}
        className={twMerge([
          `bg-gray-100 border border-gray-300 rounded-full px-3`,
          'dark:bg-zinc-700/40 dark:border-transparent dark:text-gray-200',
          rest.type === 'file' ? 'rounded-l-sm px-0 border-l-0' : '',
          className,
        ])}
        {...rest}
      />
    );
  }
);

export default _Input;
