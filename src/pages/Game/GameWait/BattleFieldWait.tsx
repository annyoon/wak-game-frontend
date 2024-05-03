import GrayBox from '../../../components/GrayBox';
import { RegularText, SmallText } from '../../../styles/fonts';
import { FlexLayout } from '../../../styles/layout';

export default function BattleFieldWait() {
  return (
    <GrayBox mode={'TALL'} width={'79.2rem'}>
      <FlexLayout $isCol gap='2rem'>
        <RegularText color='black'>{`게임 시작까지 ...3초`}</RegularText>
        <SmallText color='black'>{`이 곳에 플레이어들이 표시됩니다.`}</SmallText>
      </FlexLayout>
    </GrayBox>
  );
}
