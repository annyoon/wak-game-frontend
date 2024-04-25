import styled, { keyframes } from 'styled-components';
import { FlexLayout } from '../../styles/layout';
import { SmallText, RegularText } from '../../styles/fonts';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

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

const Copyright = styled(SmallText)`
  position: fixed;
  bottom: 2.4rem;
`;

export default function StartPage() {
  return (
    <Background $isCol $opaque={0.32}>
      <TitleImg />
      <FlexLayout $isCol gap='10rem'>
        <RegularText>{`Win Alive with Clicks`}</RegularText>
        <BlinkSmallText>{`시작하려면 닉네임을 입력하세요`}</BlinkSmallText>
      </FlexLayout>
      <FlexLayout gap='1rem'>
        <Input width='36rem' />
        <Button label={`GO!`} />
      </FlexLayout>
      <Copyright color='#bababa'>{`© 2024 GongGongChilPal`}</Copyright>
    </Background>
  );
}
