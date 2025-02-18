import { Button } from '@/app/(shared)/_components/Button';
import TodGreeting from '@/app/(shared)/_components/TodGreeting';
import { auth } from '@/lib/auth';
import { Bell, Plus } from 'lucide-react';
const EMOJIS = ['🌻', '🌱', '🌿', '🌺', '🌼', '🌸', '🌹', '🌷', '🌵', '🌴'];

export default async function AuthedHome() {
  const session = await auth();
  return (
    <>
      <div className="flex items-center">
        <div className="text-xl sm:text-xl flex gap-2">
          <span className="font-black text-emerald-800/70 dark:text-stone-300/30">
            <TodGreeting name={session?.user.username ?? undefined} />
          </span>
          <span>{EMOJIS[new Date().getDate() % EMOJIS.length]}</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 w-full sm:max-w-sm gap-6">
          <Button variant="primary" href="/plants">
            <Plus className="inline mr-1 -ml-1" />
            <span>Add Plant</span>
          </Button>
          <Button variant="secondary" href="/reminder">
            <Bell className="inline mr-1 -ml-1" />
            <span>Set Reminder</span>
          </Button>
        </div>
      </div>
    </>
  );
}
