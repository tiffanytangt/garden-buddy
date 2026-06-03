'use client';

import { Button } from '@/app/(shared)/_components/Button';
import { Bell, NotebookPen, Plus } from 'lucide-react';
import AddPlantModal from '@/app/plants/_components/AddPlantModal';

export default function ActionButtons() {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 sm:w-auto gap-4 sm:gap-2">
      <AddPlantModal
        className="flex items-center justify-center rounded-full bg-emerald-800 p-2 font-medium text-white"
        trigger={
          <>
            <Plus className="inline mr-1 -ml-1" />
            <span>Add Plant</span>
          </>
        }
      />
      <Button variant="secondary" href="/journal">
        <NotebookPen className="inline mr-1 -ml-1" />
        <span>Add Journal</span>
      </Button>
      <Button variant="secondary" href="/reminder">
        <Bell className="inline mr-1 -ml-1" />
        <span>Set Reminder</span>
      </Button>
    </div>
  );
}
