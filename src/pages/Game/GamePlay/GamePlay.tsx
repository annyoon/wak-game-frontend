import { CompatClient } from '@stomp/stompjs';

import { FlexLayout } from '../../../styles/layout';
import KillLog from '../components/KillLog';
import SpeechBubble from '../components/SpeechBubble';
import BattleField from './BattleField';

type GamePlayProps = {
  client: CompatClient;
  changeToResult: () => void;
};

export default function GamePlay({ client, changeToResult }: GamePlayProps) {
  return (
    <FlexLayout $isCol gap='1rem'>
      <FlexLayout gap='2rem'>
        <KillLog client={client} />
        <SpeechBubble client={client} />
      </FlexLayout>
      <BattleField client={client} changeToResult={changeToResult} />
    </FlexLayout>
  );
}
