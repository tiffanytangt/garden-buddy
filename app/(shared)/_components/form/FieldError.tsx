import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { twMerge } from 'tailwind-merge';

type Props = {
  message: string | undefined;
  level?: 'error' | 'warning';
};
export default function FieldError({ message, level }: Props) {
  if (!message) return null;
  return (
    <div
      className={twMerge([
        'text-sm flex items-center gap-1 py-2 ',
        level === 'error' ? 'text-red-600' : 'text-yellow-600',
      ])}
    >
      <ExclamationCircleIcon className="size-4" />
      {message}
    </div>
  );
}
