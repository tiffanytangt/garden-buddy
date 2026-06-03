'use client';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
} from '@headlessui/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, TextArea } from '@/app/(shared)/_components/form';
import { Button } from '@/app/(shared)/_components/Button';
import { updateJournalEntry } from '@/app/journal/_actions/updateJournalEntry';
import { toLocalDateValue } from '@/lib/util/localDate';

type Entry = {
  id: number;
  description: string;
  entryDate: Date;
};

export default function EditJournalEntryModal({ entry }: { entry: Entry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        aria-label="Edit journal entry"
        onClick={() => setIsOpen(true)}
        className="text-gray-400 transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
      >
        <Pencil className="size-4" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-zinc-900">
            <DialogTitle className="text-lg font-medium">
              Edit journal entry
            </DialogTitle>
            <form
              className="mt-4 flex flex-col gap-4"
              action={async (formData) => {
                setError(null);
                setSubmitting(true);
                try {
                  await updateJournalEntry(entry.id, formData);
                } catch {
                  setError(
                    'Something went wrong while saving. Please try again.'
                  );
                  setSubmitting(false);
                  return;
                }
                setSubmitting(false);
                setIsOpen(false);
                router.refresh();
              }}
            >
              <Field disabled={submitting}>
                <Label>Date</Label>
                <Input
                  name="timestamp"
                  type="date"
                  required
                  defaultValue={toLocalDateValue(entry.entryDate)}
                  className="block w-full text-black"
                />
              </Field>
              <Field disabled={submitting}>
                <Label>Note</Label>
                <TextArea
                  name="description"
                  defaultValue={entry.description}
                  className="block h-32 w-full"
                />
              </Field>
              {error && <p className="text-sm text-yellow-600">{error}</p>}
              <div className="flex flex-col gap-2">
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting ? 'Saving…' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={submitting}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
