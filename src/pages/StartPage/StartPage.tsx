import styled, { keyframes } from 'styled-components';
import { FlexLayout, DarkBackground } from '../../styles/layout';
import { SmallText, RegularText } from '../../styles/fonts';

import Input from '../../components/Input';
import Button from '../../components/Button';

import main1 from '../../assets/img-main1.png';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${main1});
  background-size: cover;
  background-position: center;
`;

const TitleImg = styled.img.attrs({
  src: require('../../assets/img-title1.png'),
  alt: 'WAK GAME',
})`
  width: 28rem;
  height: fit-content;
`;

const BlinkSmallText = styled(SmallText)`
  animation: ${keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
  `} 1s steps(2, jump-none) infinite;
`;

export default function StartPage() {
  return (
    <Background>
      <DarkBackground $col>
        <TitleImg />
        <FlexLayout $col gap='12rem'>
          <RegularText>{`Win Alive with Clicks`}</RegularText>
          <BlinkSmallText>{`시작하려면 닉네임을 입력하세요`}</BlinkSmallText>
        </FlexLayout>
        <FlexLayout gap='1rem'>
          <Input width='36rem' />
          <Button label={`GO!`} />
        </FlexLayout>
      </DarkBackground>
    </Background>
  );
}
