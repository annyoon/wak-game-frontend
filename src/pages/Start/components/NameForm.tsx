import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/user';

import styled, { keyframes } from 'styled-components';
import { SmallText } from '../../../styles/fonts';
import { FlexLayout } from '../../../styles/layout';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

const BlinkSmallText = styled(SmallText)`
  animation: ${keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `} 1s steps(2, jump-none) infinite;
`;

const FormBlock = styled(FlexLayout)`
  position: relative;
`;

const ExclamationImg = styled.img.attrs({
  src: require('../../../assets/img-exclamation-mark.png'),
  alt: '사용할 수 없는 닉네임',
})`
  width: 5.2rem;
  height: fit-content;
  position: absolute;
`;

export default function NicknameForm() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState<
    'NO_INPUT' | 'INVALID_LENGTH' | 'DUPLICATED'
  >('NO_INPUT');

  const handleChange = (e: { target: { value: string } }) => {
    setNickname(e.target.value);
  };

  const handleClick = async () => {
    if (nickname.length === 0) {
      setMessage('NO_INPUT');
    } else if (6 < nickname.length) {
      setMessage('INVALID_LENGTH');
    } else {
      try {
        const fetchedData = await login(nickname);
        if (fetchedData.success) {
          console.log(nickname);
          navigate('/lobby');
        } else {
          setMessage('DUPLICATED');
        }
      } catch (error) {
        console.error('로그인 에러', error);
        navigate('/error');
      }
    }
  };

  return (
    <FlexLayout $isCol gap='1rem'>
      {message === 'NO_INPUT' ? (
        <BlinkSmallText>{`시작하려면 닉네임을 입력하세요`}</BlinkSmallText>
      ) : (
        <SmallText>
          {message === 'INVALID_LENGTH'
            ? `닉네임은 6자 이하로 입력해 주세요`
            : `이미 사용 중인 닉네임이에요 ㅠ_ㅠ)a`}
        </SmallText>
      )}
      <FormBlock gap='1rem'>
        {message !== 'NO_INPUT' && <ExclamationImg />}
        <Input isRound name='nickname' width='36rem' onChange={handleChange} />
        <Button isBigger label={`GO!`} onClick={handleClick} />
      </FormBlock>
    </FlexLayout>
  );
}
