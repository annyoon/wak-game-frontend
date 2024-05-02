import styled from 'styled-components';
import { SmallText } from '../../../styles/fonts';
import { FlexLayout } from '../../../styles/layout';

const NicknameBox = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color};
`;

type PlayerNicknameProps = {
  nickname: string;
  color: string;
};

export default function PlayerNickname({
  nickname,
  color,
}: PlayerNicknameProps) {
  return (
    <FlexLayout gap='1rem'>
      <NicknameBox color={color} />
      <SmallText color={color}>{nickname}</SmallText>
    </FlexLayout>
  );
}
