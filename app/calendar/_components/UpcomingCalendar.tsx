import { Button } from '@/app/(shared)/_components/Button';
import DeleteReminderButton from '@/app/reminder/_components/DeleteReminderButton';

type Props = {
  reminders: {
    id: number;
    title: string;
    description: string | null;
    date: Date;
  }[];
};

export default function UpcomingCalendar({ reminders }: Props) {
  const groupedReminders = reminders.reduce(
    (acc, reminder) => {
      const isToday =
        reminder.date.toDateString() === new Date().toDateString();
      let key = `${reminder.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}`;
      if (isToday) key = 'Today';
      if (!acc[key]) acc[key] = [];
      acc[key].push(reminder);
      return acc;
    },
    {} as Record<
      string,
      {
        id: number;
        title: string;
        description: string | null;
        date: Date;
      }[]
    >
  );

  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="text-2xl font-extralight sm:text-3xl">Upcoming</h1>
      {reminders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
            Nothing scheduled in the next two weeks.
          </p>
          <Button variant="primary" href="/reminder">
            Set a reminder
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {Object.keys(groupedReminders).map((dateLabel) => {
            return (
              <div key={dateLabel}>
                <h2 className="text-lg font-semibold mb-1">{dateLabel}</h2>
                <div className="flex flex-col gap-4 pl-2">
                  {groupedReminders[dateLabel].map((r) => {
                    return (
                      <div
                        key={r.id}
                        className="group flex items-start gap-2"
                      >
                        <div className="flex-1">
                          <div className="flex gap-2">
                            <div className="text-sm text-gray-400">
                              {r.date.toLocaleTimeString(undefined, {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </div>
                            <div>{r.title}</div>
                          </div>
                          <div className="text-sm italic">{r.description}</div>
                        </div>
                        <div className="opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                          <DeleteReminderButton id={r.id} title={r.title} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
