import { axiosInstance } from './base';

export const getRoomlist = async () => {
  const response = await axiosInstance.get(`/rooms/topic/lobby`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getRoomInfo = async (roomId: number) => {
  const response = await axiosInstance.get(`/rooms/topic/${roomId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const createRoom = async (
  room_name: string,
  limit_players: number,
  room_password: string,
  mode: string
) => {
  const response = await axiosInstance.post(
    `/rooms`,
    {
      room_name: room_name,
      room_password: room_password,
      limit_players: limit_players,
      mode: mode,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
