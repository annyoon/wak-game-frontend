import styled from 'styled-components';
import { RegularText } from '../../../styles/fonts';

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

// type GameHeaderProps = {};

export default function GameHeader() {
  return (
    <HeaderBlock>
      <TextBlock>
        <RegularText>{`현재 방 이름 : 덤벼 ( 1 라운드 )`}</RegularText>
        <RegularText>{`생존자 수 : 40 / 40 명`}</RegularText>
        <RegularText>{`내 상태 : 생존 !`}</RegularText>
      </TextBlock>
    </HeaderBlock>
  );
}
