import styled from 'styled-components';
import { SmallText } from '../../../styles/fonts';
import { FlexLayout } from '../../../styles/layout';

import GrayBox from '../../../components/GrayBox';
import CheckboxInput from '../../../components/CheckboxInput';
import Input from '../../../components/Input';

const TextBlock = styled(FlexLayout)`
  align-items: start;
`;

// type RoomSettingProps = {};

export default function RoomSetting() {
  return (
    <GrayBox mode='SHORT' width='79.2rem'>
      <TextBlock $isCol gap='1.6rem'>
        <SmallText color='black'>{`방장 게임 룰 설정`}</SmallText>
        <TextBlock $isCol gap='1.4rem'>
          <FlexLayout gap='1rem'>
            <SmallText color='black'>{`>> 게임 화면에서 닉네임 가리기`}</SmallText>
            <CheckboxInput />
          </FlexLayout>
          <FlexLayout gap='1rem'>
            <SmallText color='black'>{`>> 도발 멘트:`}</SmallText>
            <Input name={''} width='52rem' />
          </FlexLayout>
        </TextBlock>
      </TextBlock>
    </GrayBox>
  );
}
