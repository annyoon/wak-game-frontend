import axios from 'axios';

export const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const login = async (nickname: string) => {
  const response = await baseAPI.post(
    `/users`,
    {
      nickname: nickname,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
