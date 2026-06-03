'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deleteReminder } from '../_actions/deleteReminder';

export default function DeleteReminderButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label={`Delete reminder "${title}"`}
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete "${title}"?`)) return;
        startTransition(() => deleteReminder(id));
      }}
      className="text-gray-400 transition-colors hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 className="size-4" />
    </button>
  );
}
