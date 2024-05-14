import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

import { BASE_URL, getAccessToken } from '../../constants/api';
import useGameStore from '../../store/gameStore';

import { FlexLayout } from '../../styles/layout';
import Background from '../../components/Background';
import GameHeader from './components/GameHeader';
import ChatBox from '../../components/ChatBox';
import RankBox from './components/RankBox';

import GameWait from './GameWait/GameWait';
import GamePlay from './GamePlay/GamePlay';
import GameResult from './GameResult/GameResult';

export default function GamePage() {
  const ACCESS_TOKEN = getAccessToken();
  const header = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const { gameData } = useGameStore();
  const [state, setState] = useState<'WAIT' | 'PLAY' | 'RESULT'>('WAIT');
  const clientRef = useRef<CompatClient | null>(null);

  const connectHandler = () => {
    const socket = new SockJS(`${BASE_URL}/socket`);
    clientRef.current = Stomp.over(socket);
    clientRef.current.connect(header, () => {
      clientRef.current?.subscribe(
        `/topic/games/${gameData.roundId}/battle-field`,
        (message) => {
          // setPlayInfo(JSON.parse(message.body));
        },
        header
      );
    });
  };

  useEffect(() => {
    connectHandler();
    return () => {
      clientRef.current?.disconnect(() => {
        clientRef.current?.unsubscribe(
          `/topic/games/${gameData.roundId}/battle-field`
        );
      }, header);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.roundId]);

  return (
    <Background>
      <FlexLayout gap='4rem'>
        <FlexLayout $isCol gap='2rem'>
          <GameHeader clientRef={clientRef} />
          {state === 'WAIT' ? (
            <GameWait />
          ) : state === 'PLAY' ? (
            <GamePlay />
          ) : (
            <GameResult isWinner round={3} />
          )}
        </FlexLayout>
        <FlexLayout $isCol gap='1.2rem'>
          <ChatBox mode='ROOM' isShort text={`방 채팅`} />
          <RankBox />
        </FlexLayout>
      </FlexLayout>
    </Background>
  );
}
