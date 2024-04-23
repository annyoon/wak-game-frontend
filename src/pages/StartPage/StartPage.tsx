import styled from 'styled-components';
import Input from '../../components/Input';
import { RegularText } from '../../styles/fonts';

import main1 from '../../assets/img-main1.png';

const BackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${main1});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const TitleImg = styled.img.attrs({
  src: require('../../assets/img-title1.png'),
  alt: 'WAK GAME',
})`
  transform: scale(0.8);
`;

export default function StartPage() {
  return (
    <BackgroundImg>
      <TitleImg />
      <RegularText>Win Alive with Clicks</RegularText>
      <RegularText>시작하려면 닉네임을 입력하세요</RegularText>
      <Input width='44rem' />
    </BackgroundImg>
  );
}
