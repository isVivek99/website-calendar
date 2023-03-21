import { LinksFunction, json } from '@remix-run/node';
import { createCookieSessionStorage, redirect } from 'remix';
import { useLoaderData } from '@remix-run/react';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import styles from '~/components/common/eventModal/styles.css';
import { getEvents } from '~/models/events.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: { request: Request }) {
  const cookieString = request.headers.get('Cookie') as String;
  const cookie = cookieString.split('=')[1];

  const events = getEvents(cookie);
  return events;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
