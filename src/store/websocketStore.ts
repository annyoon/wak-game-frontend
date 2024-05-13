import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { useRef } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { BASE_URL, getAccessToken } from '../constants/api';

interface Store {
  client: React.MutableRefObject<CompatClient | null>;
  connect: () => void;
  disconnect: () => void;
}

const useWebSocketStore = create(
  persist<Store>(
    (set) => ({
      client: useRef(null),
      connect: () => {
        const ACCESS_TOKEN = getAccessToken();
        const socket = new SockJS(`${BASE_URL}/socket`);
        const stompClient = Stomp.over(socket);

        const header = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        };

        stompClient.connect(header, () => {
          set({ client: { current: stompClient } });
        });
      },
      disconnect: () => {
        const { client } = useWebSocketStore.getState();
        if (client) {
          client.current?.disconnect(() => {
            set({ client: { current: null } });
          });
        }
      },
    }),
    {
      name: 'websocketStore',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useWebSocketStore;
