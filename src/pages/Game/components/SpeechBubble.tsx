import { useEffect, useRef, useState } from 'react';
import { CompatClient } from '@stomp/stompjs';
import { getAccessToken } from '../../../constants/api';
import useGameStore from '../../../store/gameStore';

import styled from 'styled-components';
import { FlexLayout } from '../../../styles/layout';
import { SmallText, textStyles } from '../../../styles/fonts';

import SpeechImg from '../../../assets/img-speech-bubble.png';

const SpeechBubbleBlock = styled(FlexLayout)`
  width: 38.2rem;
  height: 11.6rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 1.8rem;
  background-image: url(${SpeechImg});
  background-repeat: no-repeat;
  align-items: start;
`;

const Text = styled.div`
  ${textStyles}
  line-height: 1.2;
`;

type SpeechBubbleProps = {
  client: CompatClient;
  isWaiting?: boolean;
};

export default function SpeechBubble({ isWaiting, client }: SpeechBubbleProps) {
  const ACCESS_TOKEN = getAccessToken();
  const header = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const { roundId, hostName, comment } = useGameStore().gameData;
  const [mention, setMention] = useState({
    sender: '',
    content: '',
  });
  const subscribedRef = useRef(false);

  const subscribeToTopic = () => {
    if (!subscribedRef.current) {
      client.subscribe(
        `/topic/games/${roundId}/mention`,
        (message) => {
          setMention(JSON.parse(message.body));
        },
        header
      );
      subscribedRef.current = true;
    }
  };

  useEffect(() => {
    if (client && client.connected) {
      subscribeToTopic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <SpeechBubbleBlock $isCol gap='1rem'>
      <SmallText color='black'>{`도발 멘트!`}</SmallText>
      <FlexLayout>
        <Text color='#725bff'>{mention.sender}</Text>
        <Text color='black'>
          {mention.content === ''
            ? `(멘트를 입력하지 않았습니다)`
            : mention.content}
        </Text>
      </FlexLayout>
    </SpeechBubbleBlock>
  );
}
