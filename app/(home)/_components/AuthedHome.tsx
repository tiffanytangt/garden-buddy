'use server';

import TodGreeting from '@/app/(shared)/_components/TodGreeting';
import UpcomingReminders from './UpcomingTasks';
import { Session } from 'next-auth';
import db from '@/lib/db';
import { getPlants } from '@/app/plants/_actions/getPlants';
import MyPlants from './MyPlants';
import ActionButtons from './ActionButtons';
import { twMerge } from 'tailwind-merge';

const EMOJIS = [
  '🌻',
  '🌱',
  '🌿',
  '🌺',
  '🌼',
  '🌸',
  '🌹',
  '🌷',
  '🌵',
  '🌴',
  '☀️',
  '🪻',
  '🌲',
  '🌳',
  '🪷',
  '🪴',
];
const DAYS_TO_SHOW = 3;

export default async function AuthedHome({ session }: { session: Session }) {
  const reminders = await db.reminder.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
        lte: new Date(new Date().setDate(new Date().getDate() + DAYS_TO_SHOW)),
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      isCompleted: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  const plants = await getPlants(session.user.id, {
    sortBy: 'createdAt',
    limit: 6,
  });
  const todaysEmoji = EMOJIS[new Date().getDate() % EMOJIS.length];
  const cardStyles =
    'bg-white border dark:border-transparent dark:bg-zinc-800 p-2 sm:p-4 rounded-sm';

  return (
    <>
      <div className="flex items-center">
        <div className="text-xl sm:text-xl flex gap-2">
          <span className="font-black text-emerald-800/70 dark:text-stone-300/30">
            <TodGreeting name={session.user.username} />
          </span>
          <span>{todaysEmoji}</span>
        </div>
      </div>
      <div className="flex items-center sm:justify-start">
        <ActionButtons />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 grid-flow-row-dense">
        <div className="sm:col-span-2 sm:row-start-1">
          <MyPlants plants={plants} />
        </div>
        <div className={twMerge(cardStyles, 'row-start-1')}>
          <UpcomingReminders reminders={reminders} />
        </div>
        <div className={twMerge(cardStyles, 'sm:col-start-3 hidden sm:block')}>
          Journal Entries
        </div>
      </div>
    </>
  );
}
