import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import ChatBox from '../../components/ChatBox';
import LobbyHeader from './components/LobbyHeader';
import RoomList from './components/RoomList';

export default function LobbyPage() {
  return (
    <Background>
      <FlexLayout gap='4rem'>
        <FlexLayout $isCol gap='3.2rem'>
          <LobbyHeader />
          <RoomList />
        </FlexLayout>
        <div>
          <ChatBox text={`전체 채팅`} />
        </div>
      </FlexLayout>
    </Background>
  );
}
