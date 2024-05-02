import styled from 'styled-components';

const SpeechImg = styled.img.attrs({
  src: require('../../../assets/img-speech.png'),
  alt: '',
})``;

export default function SpeechBubble() {
  return <SpeechImg />;
}
