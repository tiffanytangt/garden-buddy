import {
  Textarea as HeadlessTextarea,
  TextareaProps as HeadlessTextareaProps,
} from '@headlessui/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends HeadlessTextareaProps {
  className?: string;
}

const _Input = forwardRef<HTMLTextAreaElement>(
  ({ className, ...rest }: InputProps, ref) => {
    return (
      <HeadlessTextarea
        ref={ref}
        className={twMerge([
          `bg-gray-100 border border-gray-300 rounded-xl`,
          'dark:bg-zinc-700/40 dark:border-none dark:text-gray-200',
          className,
        ])}
        {...rest}
      />
    );
  }
);

export default _Input;
