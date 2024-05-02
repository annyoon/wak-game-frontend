import Background from '../../components/Background';
import { FlexLayout } from '../../styles/layout';

import RoomHeader from './components/RoomHeader';
import PlayersList from './components/PlayersList';
import ButtonGroup from './components/ButtonGroup';
import ChatBox from '../../components/ChatBox';

export default function RoomPage() {
  return (
    <Background>
      <FlexLayout gap='4rem'>
        <FlexLayout $isCol gap='3.2rem'>
          <RoomHeader isHost={true} />
          <PlayersList isHost={true} />
          <ButtonGroup isHost={true} />
        </FlexLayout>
        <div>
          <ChatBox text={`방 채팅`} />
        </div>
      </FlexLayout>
    </Background>
  );
}
