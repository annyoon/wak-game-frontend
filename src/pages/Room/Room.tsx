import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CompatClient } from '@stomp/stompjs';

import { getRoomInfo } from '../../api/room';
import { RoomInfoTypes } from '../../types/RoomInfoTypes';

import { FlexLayout } from '../../styles/layout';
import Background from '../../components/Background';
import ChatBox from '../../components/ChatBox';
import RoomHeader from './components/RoomHeader';
import PlayerList from './components/PlayerList';
import RoomSetting from './components/RoomSetting';
import ButtonGroup from './components/ButtonGroup';

export default function RoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useRef<CompatClient | null>(null);

  const [roomInfo, setRoomInfo] = useState<RoomInfoTypes | null>(null);

  const showRoomInfo = async () => {
    try {
      const fetchedData = id && (await getRoomInfo(parseInt(id)));
      console.log(fetchedData);
      setRoomInfo({
        roomId: fetchedData.data.room_id,
        roomName: fetchedData.data.room_name,
        mode: fetchedData.data.mode,
        limitPlayers: fetchedData.data.limit_players,
        isPublic: !fetchedData.data.lock,
        userId: fetchedData.data.user_id,
        isHost: fetchedData.data.isChief,
      });
    } catch (error: any) {
      console.error('방 정보 가져오기 에러', error);
      navigate(`/error`);
    }
  };

  useEffect(() => {
    showRoomInfo();
  }, [id]);

  return (
    <Background>
      <FlexLayout gap='4rem'>
        <FlexLayout $isCol gap='2.8rem'>
          <RoomHeader
            roomName={roomInfo?.roomName || ''}
            limitPlayers={roomInfo?.limitPlayers || 0}
            isPublic={roomInfo?.isPublic || false}
            isHost={roomInfo?.isHost || false}
          />
          <FlexLayout $isCol gap='1.6rem'>
            <PlayerList isHost={roomInfo?.isHost || false} />
            {roomInfo?.isHost && <RoomSetting />}
          </FlexLayout>
          <ButtonGroup isHost={roomInfo?.isHost || false} />
        </FlexLayout>
        <div>
          <ChatBox text={`방 채팅`} />
        </div>
      </FlexLayout>
    </Background>
  );
}
