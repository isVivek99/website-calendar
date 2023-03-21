import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export async function getEvents(token: String) {
  const url = `${process.env.API_HOST}/events/1`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
}
