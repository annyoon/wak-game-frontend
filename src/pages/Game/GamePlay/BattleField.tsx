import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompatClient } from '@stomp/stompjs';

import { getAccessToken } from '../../../constants/api';
import { PlayersTypes, ResultTypes } from '../../../types/GameTypes';
import useUserStore from '../../../store/userStore';
import useGameStore from '../../../store/gameStore';
import useResultStore from '../../../store/resultStore';
import { isOverlap } from '../../../utils/isOverlap';

import styled from 'styled-components';
import GrayBox from '../../../components/GrayBox';
import PlayerNickname from '../../../components/PlayerNickname';
import { getBattleField } from '../../../services/game';

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
  client: CompatClient;
  changeToResult: () => void;
};

export default function BattleField({
  client,
  changeToResult,
}: BattleFieldProps) {
  const navigate = useNavigate();
  const ACCESS_TOKEN = getAccessToken();
  const header = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const { userId } = useUserStore().userData;
  const { gameData, setGameData } = useGameStore();
  const { setResultData } = useResultStore();

  const [dots, setDots] = useState<DotPosition[]>([]);
  const [playerList, setPlayerList] = useState<PlayersTypes[]>([]);
  const subscribedRef = useRef(false);

  const currentTime = new Date().toISOString();

  const subscribeToTopic = () => {
    if (!subscribedRef.current) {
      client.subscribe(
        `/topic/games/${gameData.roundId}/battle-field`,
        (message) => {
          const fetchedData = JSON.parse(message.body);
          if (message.body === 'ROOM IS EXPIRED') {
            navigate(`/lobby`);
          } else if (fetchedData.isFinished) {
            setGameData({
              ...gameData,
              roundNumber: fetchedData.roundNumber,
              nextRoundId: fetchedData.nextRoundId,
            });
            checkResult(fetchedData.results);
            changeToResult();
          } else {
            setPlayerList(fetchedData.players);
            checkAlive(fetchedData.players);
          }
        },
        header
      );
      subscribedRef.current = true;
    }
    showBattleField();
  };

  const checkAlive = (newDataList: PlayersTypes[]) => {
    newDataList.forEach((player) => {
      if (userId === player.userId && player.stamina === 0) {
        setGameData({ ...gameData, isAlive: false });
        return;
      }
    });
  };

  const checkResult = (newDataList: ResultTypes[]) => {
    newDataList.forEach((result) => {
      if (userId === result.userId) {
        setResultData(result);
        return;
      }
    });
  };

  const showBattleField = async () => {
    try {
      await getBattleField(gameData.roundId);
    } catch (error: any) {
      console.error('배틀필드 요청 에러', error);
      navigate(`/error`);
    }
  };

  useEffect(() => {
    if (client && client.connected) {
      subscribeToTopic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useEffect(() => {
    const generatedDots: DotPosition[] = [];
    const generateRandomPosition = () => ({
      top: `${Math.random() * 92}%`,
      left: `${Math.random() * 92}%`,
    });

    while (generatedDots.length < gameData.playersNumber) {
      const newPosition = generateRandomPosition();
      if (!isOverlap(newPosition, generatedDots)) {
        generatedDots.push(newPosition);
      }
    }
    setDots(generatedDots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.roundId]);

  const handleClick = (victimId: number) => {
    if (userId && userId !== victimId) {
      const message = JSON.stringify({
        roundId: gameData.roundId,
        userId: userId,
        victimId: victimId,
        clickTime: currentTime,
      });
      client.send(`/app/click/${gameData.roundId}`, header, message);
    }
  };

  return (
    <GrayBox mode={'MEDIUM'} width={'79.2rem'}>
      <BattleFieldLayout>
        {dots.map((dot, index) => (
          <Dot key={index} $top={dot.top} $left={dot.left}>
            {index < playerList.length && playerList[index].stamina > 0 && (
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
