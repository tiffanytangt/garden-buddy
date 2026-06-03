'use client';

import { Checkbox } from '@headlessui/react';
import { Circle, CircleCheckBig } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { toggleReminder } from '@/app/reminder/_actions/toggleReminder';

type Reminder = {
  id: number;
  title: string;
  description: string | null;
  date: Date;
  isCompleted: boolean;
};

type Props = {
  reminders: Reminder[];
};

export default function UpcomingReminders({ reminders }: Props) {
  const [optimisticReminders, setCompleted] = useOptimistic(
    reminders,
    (state, { id, isCompleted }: { id: number; isCompleted: boolean }) =>
      state.map((r) => (r.id === id ? { ...r, isCompleted } : r))
  );
  const [, startTransition] = useTransition();

  const toggle = (id: number, isCompleted: boolean) => {
    startTransition(async () => {
      setCompleted({ id, isCompleted });
      await toggleReminder(id, isCompleted);
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-sm font-bold">Reminders</h2>
      {optimisticReminders.length === 0 ? (
        <p className="text-sm font-extralight text-gray-500 dark:text-gray-400">
          Nothing due in the next few days.
        </p>
      ) : (
        <div className="flex flex-col gap-6 sm:gap-2">
          {optimisticReminders.map((r) => (
            <Checkbox
              key={r.id}
              checked={r.isCompleted}
              onChange={(checked) => toggle(r.id, checked)}
              className="flex cursor-pointer gap-2 items-start mb-1 justify-between"
            >
              {({ checked }) => (
                <>
                  <div className="flex gap-3 items-start">
                    {checked ? (
                      <CircleCheckBig className="text-emerald-500 size-7 sm:size-6 shrink-0" />
                    ) : (
                      <Circle className="text-gray-400 size-7 sm:size-6 shrink-0" />
                    )}
                    <div
                      className={checked ? 'line-through text-gray-400' : ''}
                    >
                      <div>{r.title}</div>
                      {!checked && r.description && (
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
          ))}
        </div>
      )}
    </div>
  );
}
