import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

import { BASE_URL, getAccessToken } from '../../constants/api';
import { getRoomInfo } from '../../services/room';
import { RoomInfoTypes } from '../../types/RoomInfoTypes';

import { FlexLayout } from '../../styles/layout';

import Background from '../../components/Background';
import ChatBox from '../../components/ChatBox';
import RoomHeader from './components/RoomHeader';
import PlayerList from './components/PlayerList';
import RoomSetting from './components/RoomSetting';
import ButtonGroup from './components/ButtonGroup';

export default function RoomPage() {
  const navigate = useNavigate();
  const ACCESS_TOKEN = getAccessToken();
  const { id } = useParams();
  const client = useRef<CompatClient | null>(null);

  const [roomInfo, setRoomInfo] = useState<RoomInfoTypes | null>(null);

  const connectHandler = () => {
    const socket = new SockJS(`${BASE_URL}/socket`);
    const header = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
    client.current = Stomp.over(socket);
    client.current.connect(header, () => {
      client.current?.subscribe(
        `/topic/rooms/${id}`,
        (message) => {
          console.log('데이터');
          // set
        },
        header
      );

      showRoomInfo();
    });
  };

  useEffect(() => {
    connectHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const showRoomInfo = async () => {
    try {
      const fetchedData = id && (await getRoomInfo(parseInt(id)));
      console.log(fetchedData);
      setRoomInfo({ ...fetchedData.data });
    } catch (error: any) {
      console.error('방 정보 가져오기 에러', error);
      navigate(`/error`);
    }
  };

  useEffect(() => {
    showRoomInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
