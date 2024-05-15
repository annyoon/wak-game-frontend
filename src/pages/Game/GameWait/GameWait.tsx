import { FlexLayout } from '../../../styles/layout';

import KillLog from '../components/KillLog';
import SpeechBubble from '../components/SpeechBubble';
import BattleFieldWait from './BattleFieldWait';

type GameWaitProps = {
  countdown: number;
};

export default function GameWait({ countdown }: GameWaitProps) {
  return (
    <FlexLayout $isCol gap='1rem'>
      <FlexLayout gap='2rem'>
        <KillLog isWaiting />
        <SpeechBubble isWaiting />
      </FlexLayout>
      <BattleFieldWait countdown={countdown > 3 ? 3 : countdown} />
    </FlexLayout>
  );
}
