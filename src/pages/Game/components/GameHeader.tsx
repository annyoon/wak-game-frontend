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
  dashBoard: {
    roundNumber: number;
    totalCount: number;
    aliveCount: number;
  };
};

export default function GameHeader({
  dashBoard: { roundNumber, totalCount, aliveCount },
}: GameHeaderProps) {
  const { gameData } = useGameStore();

  return (
    <HeaderBlock>
      <TextBlock>
        <SmallText>{`현재 방 이름 : ${gameData.roomName} ( ${roundNumber} 라운드 )`}</SmallText>
        <SmallText>{`생존자 수 : ${aliveCount} / ${totalCount} 명`}</SmallText>
        <SmallText>{`내 상태 : ${
          gameData.isAlive ? `생존!` : `죽음`
        }`}</SmallText>
      </TextBlock>
    </HeaderBlock>
  );
}
