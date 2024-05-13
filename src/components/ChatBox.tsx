import { useState, useRef, useEffect} from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import useUserStore from '../store/userStore';

import { CHAT_URL, getAccessToken } from '../constants/api';

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
  const [userChatting, setUserChatting] = useState<string[][]>([]);
  const [chatting, setChatting] = useState('');
  const { userData } = useUserStore();
  const client = useRef<CompatClient | null>(null);
  const ACCESS_TOKEN = getAccessToken();

  const handleChange = (e: { target: { value: string } }) => {
    setChatting(e.target.value);
  };

  const handleClick = () => {
    sendChatMessage(chatting);
  };

  const connectChatHandler = () => {
    const socket = new SockJS(`${CHAT_URL}/socket`);
    const header = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
    client.current = Stomp.over(socket);
    client.current.connect(header, () => {
      client.current?.subscribe(
        `/topic/lobby-chat`,
        (message) => {
          const fetchedData = JSON.parse(message.body);
          setUserChatting(prevChatting => {
            const newChatting = [...prevChatting, [fetchedData.nickname, fetchedData.text]];
            return newChatting;
          });
        },
        header
      );
    });
  };

  const sendChatMessage = (chatting: string) => {
    const socket = new SockJS(`${CHAT_URL}/socket`);
    const header = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
    const message = JSON.stringify({ text: chatting, nickname: userData.nickname, color: userData.color });
    client.current = Stomp.over(socket);
    client.current.connect(header, () => {
      client.current?.send(
        `/topic/lobby-chat`,
        header,
        message
      );
    });
  };

  useEffect(() => {
    connectChatHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ACCESS_TOKEN]);

  return (
    <WhiteBox mode={isShort ? 'MEDIUM' : 'TALL'} width='32rem'>
      <GrayTitleBox text={text} />
      <ChatBlock height={isShort ? '15.2rem' : '45.2rem'}>
        {userChatting.map((value, index) => {
          return (
            <ChatLine key={index}>
              <ChatText color={userData.color}>{`${value[0]}`}</ChatText>
              <ChatText>{`: ${value[1]}`}</ChatText>
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
