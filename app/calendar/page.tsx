import * as React from 'react';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import UpcomingCalendar from './_components/UpcomingCalendar';
import db from '@/lib/db';

export default async function Journal() {
  const session = await auth();
  if (!session) redirect('/');

  const reminders = await db.reminder.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
        lte: new Date(new Date().setDate(new Date().getDate() + 14)),
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  return (
    <div className="flex flex-col h-full">
      <UpcomingCalendar reminders={reminders} />
    </div>
  );
}
