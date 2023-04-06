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

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: { request: Request }) {
  const cookieString = request.headers.get('Cookie') as String;
  const cookie = cookieString.split('=')[1];
  const user = await getUserDetails(cookie);

  const events = await getCalendarEvents(cookie, user.id);
  return events;
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

export function ErrorBoundary({ error }: { error: Error }) {
  return <div>An unexpected error occurred: {error.message}</div>;
}
