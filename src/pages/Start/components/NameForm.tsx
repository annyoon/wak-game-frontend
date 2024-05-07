import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import { SmallText } from '../../../styles/fonts';
import { FlexLayout } from '../../../styles/layout';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

const WarningBlock = styled.div`
  position: relative;
`;

const BlinkSmallText = styled(SmallText)`
  animation: ${keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `} 1s steps(2, jump-none) infinite;
`;

const ExclamationImg = styled.img.attrs({
  src: require('../../../assets/img-exclamation-mark.png'),
  alt: '사용할 수 없는 닉네임',
})`
  width: 5.2rem;
  height: fit-content;
  position: absolute;
  top: 4.4rem;
  left: -4.2rem;
`;

export default function NicknameForm() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState<
    'NO_INPUT' | 'INVALID_LENGTH' | 'DUPLICATED'
  >('NO_INPUT');

  const handleChange = (e: { target: { value: string } }) => {
    setNickname(e.target.value);
  };

  const handleClick = () => {
    if (nickname.length === 0) {
      setMessage('NO_INPUT');
    } else if (6 < nickname.length) {
      setMessage('INVALID_LENGTH');
      // } else if () {
      //   setMessage('DUPLICATED');
    } else {
      navigate('/lobby');
    }
  };

  return (
    <FlexLayout $isCol gap='1rem'>
      {message === 'NO_INPUT' ? (
        <BlinkSmallText>{`시작하려면 닉네임을 입력하세요`}</BlinkSmallText>
      ) : (
        <WarningBlock>
          <ExclamationImg />
          <SmallText>
            {message === 'INVALID_LENGTH'
              ? `닉네임은 1자 이상 6자 이하로 입력해 주세요`
              : `중복된 닉네임이에요 다시 입력해 주세요`}
          </SmallText>
        </WarningBlock>
      )}
      <FlexLayout gap='1rem'>
        <Input isRound name='nickname' width='36rem' onChange={handleChange} />
        <Button isBigger label={`GO!`} onClick={handleClick} />
      </FlexLayout>
    </FlexLayout>
  );
}
