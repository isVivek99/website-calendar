/* eslint-disable implicit-arrow-linebreak */
import { LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import moment from 'moment';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import styles from '~/components/common/eventModal/styles.css';
import { getCalendarEvents } from '~/models/events.server';
import { getUserDetails } from '~/models/user.server';
import { backendCalEvent } from '~/types/calendartypes';
import { useStore } from '~/store/eventStore';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: { request: Request }) {
  // const cookieString = request.headers.get('Cookie') as String;

  // const cookie = cookieString.split('=')[1];

  // const user = await getUserDetails(cookie);

  // const events = await getCalendarEvents(cookie, user.id);
  const initialEventsList = [
    {
      id: '1',
      title: 'timed event',
      start: moment().add(1, 'hour').toDate(),
      end: moment().add(2, 'hours').toDate(),
      description: '',
      location: '',

      visibility: 'private',
      attendees: ['a@b.c', 'alpha@beta.gamma'],
    },
    {
      id: '2',
      title: 'Some title',
      start: moment().add(1, 'day').toDate(),
      end: moment().add(1, 'day').add(2, 'hour').toDate(),
      description: '',
      location: '',
      visibility: 'public',
      attendees: ['alpha@beta.gamma', 'admin@rds.com'],
    },
    {
      id: '3',
      title: 'Another title',
      start: moment().add(1, 'day').add(8, 'hours').toDate(),
      end: moment().add(1, 'day').add(9, 'hours').toDate(),
      description: '',
      location: '',
      visibility: 'private',
      attendees: ['admin@rds.com'],
    },
  ];

  return initialEventsList;
}

const getDates = (userEvents: backendCalEvent[]) =>
  userEvents.map((event: backendCalEvent, index: number) => ({
    id: index,
    title: event.name,
    start: moment.utc(event.startTime).toDate(),
    end: moment.utc(event.endTime).toDate(),
  }));

export default function Index() {
  const userEvents = useLoaderData<typeof loader>();
  const bears = useStore((state: Record<'bear', number>): number => state.bears);
  console.log('bears:', bears);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <Calendar calendarEvents={getDates(userEvents)} />
        </div>
      </div>
    </div>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   return <div>An unexpected error occurred: {error.message}</div>;
// }
