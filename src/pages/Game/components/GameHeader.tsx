import { useEffect, useState } from 'react';
import { CompatClient } from '@stomp/stompjs';

import { getAccessToken } from '../../../constants/api';
import useGameStore from '../../../store/gameStore';

import styled from 'styled-components';
import { SmallText } from '../../../styles/fonts';

const HeaderBlock = styled.div`
  place-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

type GameHeaderProps = {
  clientRef: React.MutableRefObject<CompatClient | null>;
};

export default function GameHeader({ clientRef }: GameHeaderProps) {
  const ACCESS_TOKEN = getAccessToken();
  const header = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const { gameData } = useGameStore();
  const [info, setInfo] = useState({
    roundNumber: 0,
    totalCount: 0,
    aliveCount: 0,
  });

  const subscription = () => {
    clientRef.current?.subscribe(
      `/topic/games/${gameData.roundId}/dashboard`,
      (message) => {
        setInfo(JSON.parse(message.body));
      },
      header
    );
  };

  useEffect(() => {
    subscription();
    // return () =>
    //   subscription?.unsubscribe(
    //     `/topic/games/${gameData.roundId}/battle-field`
    //   );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeaderBlock>
      <TextBlock>
        <SmallText>{`현재 방 이름 : ${gameData.roomName} ( ${info.roundNumber} 라운드 )`}</SmallText>
        <SmallText>{`생존자 수 : ${info.totalCount} / ${info.aliveCount} 명`}</SmallText>
        <SmallText>{`내 상태 : 생존 !`}</SmallText>
      </TextBlock>
    </HeaderBlock>
  );
}
