import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import GameHeader from './components/GameHeader';
import ChatBox from '../../components/ChatBox';
import RankBox from './components/RankBox';

export default function GamePage() {
  return (
    <Background>
      <FlexLayout gap='4rem'>
        <FlexLayout $isCol gap='2.8rem'>
          <GameHeader />
        </FlexLayout>
        <FlexLayout $isCol gap='1.2rem'>
          <ChatBox isShort text={`방 채팅`} />
          <RankBox />
        </FlexLayout>
      </FlexLayout>
    </Background>
  );
}
