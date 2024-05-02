import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import GameHeader from './components/GameHeader';
import ChatBox from '../../components/ChatBox';

export default function GamePage() {
  return (
    <Background>
      <FlexLayout gap='4rem'>
        <FlexLayout $isCol gap='2.8rem'>
          <GameHeader />
        </FlexLayout>
        <div>
          <ChatBox isShort text={`방 채팅`} />
        </div>
      </FlexLayout>
    </Background>
  );
}
