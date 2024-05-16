import { useEffect, useState } from 'react';
import { CompatClient } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../constants/api';
import useUserStore from '../../../store/userStore';
import useGameStore from '../../../store/gameStore';
import useResultStore from '../../../store/resultStore';
import { PlayersTypes } from '../../../types/GameTypes';
import { isOverlap } from '../../../utils/isOverlap';

import styled from 'styled-components';
import GrayBox from '../../../components/GrayBox';
import PlayerNickname from '../../../components/PlayerNickname';

const BattleFieldLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Dot = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
`;

type DotPosition = {
  top: string;
  left: string;
};

type BattleFieldProps = {
  clientRef: React.MutableRefObject<CompatClient | null>;
};

export default function BattleField({ clientRef }: BattleFieldProps) {
  const navigate = useNavigate();
  const ACCESS_TOKEN = getAccessToken();
  const header = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const { userId } = useUserStore().userData;
  const { roundId, players } = useGameStore().gameData;
  const { setResultData } = useResultStore();
  const [playerList, setPlayerList] = useState<PlayersTypes[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [dots, setDots] = useState<DotPosition[]>([]);
  const currentTime = new Date().toISOString();

  useEffect(() => {
    const subscribeToTopic = () => {
      clientRef.current?.subscribe(
        `/topic/games/${roundId}/battle-field`,
        (message) => {
          console.log('메세지받음???');
          if (message.body === 'ROOM IS EXPIRED') {
            navigate(`/lobby`);
          } else if (JSON.parse(message.body).isFinish) {
            console.log('라운드 끝');
            setResultData(JSON.parse(message.body));
          } else {
            console.log('플레이어 받음');
            setPlayerList(JSON.parse(message.body).players);
          }
        },
        header
      );
      console.log('구독됨?');
    };

    const connectCallback = () => {
      if (clientRef.current) {
        subscribeToTopic();
        setIsSubscribed(true);
      }
    };

    if (clientRef.current && clientRef.current.connected) {
      subscribeToTopic();
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }

    if (clientRef.current) {
      clientRef.current.onConnect = connectCallback;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientRef, playerList, isSubscribed]);

  useEffect(() => {
    const generatedDots: DotPosition[] = [];
    const generateRandomPosition = () => ({
      top: `${Math.random() * 92}%`,
      left: `${Math.random() * 92}%`,
    });

    while (generatedDots.length < players.length) {
      const newPosition = generateRandomPosition();
      if (!isOverlap(newPosition, generatedDots)) {
        generatedDots.push(newPosition);
      }
    }

    setDots(generatedDots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundId]);

  const handleClick = (victimId: number) => {
    const message = JSON.stringify({
      roundId: roundId,
      userId: userId,
      victimId: victimId,
      clickTime: currentTime,
    });
    clientRef.current?.send(`/app/click/${roundId}`, header, message);
  };

  return (
    <GrayBox mode={'MEDIUM'} width={'79.2rem'}>
      <BattleFieldLayout>
        {dots.map((dot, index) => (
          <Dot key={index} $top={dot.top} $left={dot.left}>
            {index < playerList.length && (
              <PlayerNickname
                isCol
                nickname={playerList[index].nickname}
                color={playerList[index].color}
                onClick={() => handleClick(playerList[index].userId)}
              />
            )}
          </Dot>
        ))}
      </BattleFieldLayout>
    </GrayBox>
  );
}
