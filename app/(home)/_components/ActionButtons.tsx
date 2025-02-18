import { Button } from '@/app/(shared)/_components/Button';
import { Bell, Plus } from 'lucide-react';

export default function ActionButtons() {
  return (
    <div className="w-full grid grid-cols-2 sm:w-auto gap-4 sm:gap-2">
      <Button variant="primary" href="/plants">
        <Plus className="inline mr-1 -ml-1" />
        <span>Add Plant</span>
      </Button>
      <Button variant="secondary" href="/reminder">
        <Bell className="inline mr-1 -ml-1" />
        <span>Set Reminder</span>
      </Button>
    </div>
  );
}
