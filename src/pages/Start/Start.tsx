import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import GameTitle from './components/GameTitle';
import NicknameForm from './components/NicknameForm';
import StartFooter from './components/StartFooter';

export default function StartPage() {
  return (
    <Background $isCol $opaque={0.32}>
      <FlexLayout $isCol gap='10rem'>
        <GameTitle />
        <NicknameForm />
      </FlexLayout>
      <StartFooter />
    </Background>
  );
}
