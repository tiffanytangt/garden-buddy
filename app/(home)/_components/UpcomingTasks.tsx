'use client';

import { Checkbox, Label } from '@headlessui/react';
import { Check, Circle, CircleCheck, CircleCheckBig } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  reminders: {
    id: number;
    title: string;
    description: string | null;
    date: Date;
    isCompleted: boolean;
  }[];
};

export default function UpcomingReminders({ reminders }: Props) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-sm font-bold">Reminders</h2>
      <div className="flex flex-col gap-6 sm:gap-2">
        {reminders.map((r) => {
          return (
            <Checkbox
              key={r.id}
              checked={r.isCompleted}
              className="flex gap-2 items-start mb-1 justify-between"
            >
              {({ checked }) => (
                <>
                  <div className="flex gap-3 items-start">
                    <button>
                      {checked ? (
                        <CircleCheckBig className="text-emerald-500 size-7 sm:size-6" />
                      ) : (
                        <Circle className="text-gray-400 size-7 sm:size-6" />
                      )}
                    </button>
                    <div
                      className={checked ? 'line-through text-gray-400' : ''}
                    >
                      <div>{r.title}</div>
                      {!checked && (
                        <div className="text-sm italic">{r.description}</div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-400 whitespace-nowrap">
                    {r.date.toLocaleTimeString(undefined, {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>
                </>
              )}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
}
