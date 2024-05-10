import styled from 'styled-components';
import { SmallText } from '../../../styles/fonts';
import { FlexLayout } from '../../../styles/layout';
import Dialog from '../../../components/Dialog';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const ContentBlock = styled(FlexLayout)`
  align-items: start;
`;

const ButtonBlock = styled(FlexLayout)`
  justify-content: end;
`;

type EnterCheckDialogProps = {
  clickedRoom: { roomId: number; isPublic: boolean };
  closeDialog: () => void;
};

export default function EnterCheckDialog({
  clickedRoom,
  closeDialog,
}: EnterCheckDialogProps) {
  const { roomId, isPublic } = clickedRoom;
  const handleChange = () => {};

  return (
    <Dialog mode={'SHORT'} width='40rem' isOpen onClose={closeDialog}>
      {isPublic ? (
        <ContentBlock $isCol gap='2rem'>
          <SmallText color='black'>{`게임에 입장하시겠습니까?`}</SmallText>
          <ButtonBlock>
            <Button label={`입장`} />
          </ButtonBlock>
        </ContentBlock>
      ) : (
        <ContentBlock $isCol gap='2rem'>
          <SmallText color='black'>{`비밀번호 입력`}</SmallText>
          <FlexLayout gap='1rem'>
            <Input name={`password`} width='24rem' onChange={handleChange} />
            <Button label={`입장`} />
          </FlexLayout>
        </ContentBlock>
      )}
    </Dialog>
  );
}
