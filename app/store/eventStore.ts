import { create } from 'zustand';
import { CalEvent } from '~/types/calendartypes';

type EventState = {
  events: CalEvent[];
  addEvent: (event: CalEvent) => void;
  removeEvent: (event: CalEvent) => void;
};

// eslint-disable-next-line import/prefer-default-export
export const useStore = create<EventState>((set) => ({
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (id) =>
    set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
}));
