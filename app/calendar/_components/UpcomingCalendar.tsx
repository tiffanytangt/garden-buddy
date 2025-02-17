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
    <div className="flex flex-col h-full gap-2">
      {Object.keys(groupedReminders).map((dateLabel) => {
        return (
          <div key={dateLabel}>
            <h2 className="text-lg font-semibold mb-1">{dateLabel}</h2>
            <div className="flex flex-col gap-4 pl-2">
              {groupedReminders[dateLabel].map((r) => {
                return (
                  <div key={r.id}>
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
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
