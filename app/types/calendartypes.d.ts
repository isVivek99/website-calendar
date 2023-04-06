import { Event, stringOrDate } from 'react-big-calendar';

export interface CalEvent extends Event {
  id?: string;
}
export interface backendCalEvent {
  id?: string;
  name?: string;
  startTime?: Date | undefined;
  endTime?: Date;
  description?: string;
  location: string;
  ownerId: number;
  eventTypeId: number;
  calendarId: number;
  isDeleted: boolean;
}

export interface CalendarEventProps {
  show?: boolean;
  event?: CalEvent;
  new?: boolean;
}

export interface UpdateEvent {
  event: CalEvent;
  start: stringOrDate;
  end: stringOrDate;
}
