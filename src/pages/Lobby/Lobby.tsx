import styled from 'styled-components';
import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import ChatBox from '../../components/ChatBox';
import LobbyText from './components/LobbyText';
import RoomList from './components/RoomList';

const LeftSection = styled(FlexLayout)`
  align-items: start;
`;

export default function LobbyPage() {
  return (
    <Background>
      <FlexLayout gap='4rem'>
        <LeftSection $isCol>
          <LobbyText />
          <RoomList />
        </LeftSection>
        <div>
          <ChatBox text={`전체 채팅`} />
        </div>
      </FlexLayout>
    </Background>
  );
}
