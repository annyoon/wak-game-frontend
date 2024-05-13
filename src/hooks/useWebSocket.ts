import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { BASE_URL, getAccessToken } from '../constants/api';

type useWebSocketProps = {
  url: string;
  handleMessage: (message: object) => void;
  nextFunction: () => void;
};

export default function useWebSocket({
  url,
  handleMessage,
  nextFunction,
}: useWebSocketProps) {
  const ACCESS_TOKEN = getAccessToken();
  const header = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const client = useRef<CompatClient | null>(null);

  const subscribeTopic = () => {
    client.current?.subscribe(
      url,
      (message) => {
        handleMessage(JSON.parse(message.body));
      },
      header
    );
  };

  const connectHandler = () => {
    const socket = new SockJS(`${BASE_URL}/socket`);
    client.current = Stomp.over(socket);
    client.current.connect(header, () => {
      subscribeTopic();
      nextFunction();
    });
  };

  useEffect(() => {
    if (client.current && client.current.connected) {
      subscribeTopic();
      nextFunction();
    } else {
      connectHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ACCESS_TOKEN]);

  return client.current;
}
