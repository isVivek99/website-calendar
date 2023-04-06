import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export async function getEvents(token: string) {
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
export async function getUserDetails(token: String) {
  const url = `${process.env.API_HOST}/users/self`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    return error;
  }
}
