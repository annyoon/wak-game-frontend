import { useState, useRef, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

import { CHAT_URL, getAccessToken } from '../constants/api';
import useUserStore from '../store/userStore';

import styled from 'styled-components';
import { FlexLayout } from '../styles/layout';
import { textStyles } from '../styles/fonts';

import WhiteBox from './WhiteBox';
import GrayTitleBox from './GrayTitleBox';
import Input from './Input';
import Button from './Button';

const ChatBlock = styled.div<{ height: string }>`
  width: 32rem;
  height: ${(props) => props.height};
  ${textStyles}
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

const ChatLine = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ChatText = styled.div`
  ${textStyles}
`;

type ChatBoxProps = {
  isShort?: boolean;
  text: string;
};

export default function ChatBox({ isShort, text }: ChatBoxProps) {
  const ACCESS_TOKEN = getAccessToken();
  const header = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const storage = window.sessionStorage;
  const chattingData = storage.getItem('chattingData');

  const { userData } = useUserStore();
  const [chatting, setChatting] = useState('');
  const [userChatting, setUserChatting] = useState<string[][]>(
    chattingData ? JSON.parse(chattingData) : []
  );
  const clientRef = useRef<CompatClient | null>(null);

  const handleChange = (e: { target: { value: string } }) => {
    setChatting(e.target.value);
  };

  const handleClick = () => {
    const message = JSON.stringify({
      text: chatting,
      nickname: userData.nickname,
      color: userData.color,
    });
    clientRef.current?.send(`/topic/lobby-chat`, header, message);
  };

  const connectChatHandler = () => {
    const socket = new SockJS(`${CHAT_URL}/socket`);
    clientRef.current = Stomp.over(socket);
    clientRef.current.connect(header, () => {
      clientRef.current?.subscribe(
        `/topic/lobby-chat`,
        (message) => {
          const fetchedData = JSON.parse(message.body);
          setUserChatting((prevChatting) => {
            const newChatting = [
              ...prevChatting,
              [fetchedData.color, fetchedData.nickname, fetchedData.text],
            ];
            return newChatting;
          });
        },
        header
      );
    });
  };

  useEffect(() => {
    storage.setItem('chattingData', JSON.stringify(userChatting));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChatting]);

  useEffect(() => {
    connectChatHandler();
    return () => {
      clientRef.current?.disconnect(() => {
        clientRef.current?.unsubscribe(`/topic/lobby-chat`);
      }, header);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WhiteBox mode={isShort ? 'MEDIUM' : 'TALL'} width='32rem'>
      <GrayTitleBox text={text} />
      <ChatBlock height={isShort ? '15.2rem' : '45.2rem'}>
        {userChatting.map((value, index) => {
          const [color, nickname, text] = value;
          return (
            <ChatLine key={index}>
              <ChatText color={color}>{nickname}</ChatText>
              <ChatText>{`: ${text}`}</ChatText>
            </ChatLine>
          );
        })}
      </ChatBlock>
      <FlexLayout gap='1rem'>
        <Input name='chatting' onChange={handleChange} />
        <Button label={`전송`} onClick={handleClick} />
      </FlexLayout>
    </WhiteBox>
  );
}
