import axios from 'axios';
import { userData } from '~/types/usertypes';
// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function getCalendarEvents(token: String, id: number): Promise<userData | undefined> {
  const url = `${process.env.API_HOST}/events/calendar/${id}?startTime=1677609000000`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
