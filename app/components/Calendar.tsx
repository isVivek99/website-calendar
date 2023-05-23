import dayjs from 'dayjs';
import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-big-calendar';
import { CalendarEventProps, CalEvent } from '~/utils/interfaces';
import RdsCalendar from '~/components/common/rdsCalendar';
import { useStore } from '~/store/useStore';
import { useMatches } from '@remix-run/react';
interface CalendarProps {
  view?: View;
  events: CalEvent[];
}

const Calendar = ({ view, events }: CalendarProps) => {
  const matches = useMatches();

  const [eventsList, setEventsList] = useState<CalEvent[]>([]);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventProps>({
    event: events[0],
    show: false,
    new: false,
  });

  useEffect(() => {
    setEventsList(events);
  }, [events]);

  const updateEventState = (event: CalEvent) => {
    setCalendarEvent((e) => ({ ...e, event }));
    setEventsList((events) =>
      events.map((e) => {
        if (e.id === event.id) {
          e.title = event.title;
          e.start = dayjs(event.start).toDate();
          e.end = dayjs(event.end).toDate();
        }
        return e;
      }),
    );
  };

  const updateEventStateFromModal = (event: CalEvent) => {
    setEventsList((events) =>
      events.map((e) => {
        if (e.id === event.id) {
          return event;
        }
        return e;
      }),
    );
  };

  const memoizedRdsCalendar = useCallback(
    () => (
      <RdsCalendar
        view={view}
        eventsList={eventsList}
        currentEvent={calendarEvent?.event}
        setCalendarEvent={setCalendarEvent}
        updateEvent={updateEventState}
      />
    ),
    [eventsList],
  );

  return (
    <>
      <div className="w-[100%]">{memoizedRdsCalendar()}</div>
    </>
  );
};

export default Calendar;
