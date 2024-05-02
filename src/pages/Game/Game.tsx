import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import GameHeader from './components/GameHeader';
import KillLog from './components/KillLog';
import BattleField from './components/BattleField';
import ChatBox from '../../components/ChatBox';
import RankBox from './components/RankBox';
import SpeechBubble from './components/SpeechBubble';

export default function GamePage() {
  return (
    <Background>
      <FlexLayout gap='4rem'>
        <FlexLayout $isCol gap='2rem'>
          <GameHeader />
          <FlexLayout $isCol gap='1rem'>
            <FlexLayout gap='2rem'>
              <KillLog />
              <SpeechBubble />
            </FlexLayout>
            <BattleField />
          </FlexLayout>
        </FlexLayout>
        <FlexLayout $isCol gap='1.2rem'>
          <ChatBox isShort text={`방 채팅`} />
          <RankBox />
        </FlexLayout>
      </FlexLayout>
    </Background>
  );
}
