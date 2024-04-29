import { useState } from 'react';
import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import ChatBox from '../../components/ChatBox';
import Dialog from '../../components/Dialog';
import LobbyHeader from './components/LobbyHeader';
import RoomList from './components/RoomList';

export default function LobbyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Background>
        <FlexLayout gap='4rem'>
          <FlexLayout $isCol gap='3.2rem'>
            <LobbyHeader openDialog={() => setIsOpen(true)} />
            <RoomList />
          </FlexLayout>
          <div>
            <ChatBox text={`전체 채팅`} />
          </div>
        </FlexLayout>
      </Background>
      {isOpen && <Dialog isOpen onClose={() => setIsOpen(false)}></Dialog>}
    </>
  );
}
