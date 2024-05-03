import { FlexLayout } from '../../../styles/layout';

import KillLog from '../components/KillLog';
import SpeechBubble from '../components/SpeechBubble';
import BattleField from '../components/BattleField';

export default function GameWait() {
  return (
    <FlexLayout $isCol gap='1rem'>
      <FlexLayout gap='2rem'>
        <KillLog />
        <SpeechBubble />
      </FlexLayout>
      <BattleField />
    </FlexLayout>
  );
}
