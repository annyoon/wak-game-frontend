import { FlexLayout } from '../styles/layout';
import Button from './Button';
import Input from './Input';
import WhiteBox from './WhiteBox';

export default function ChatBox() {
  return (
    <WhiteBox width='32rem'>
      <FlexLayout gap='1rem'>
        <Input name='' />
        <Button label={`전송`} />
      </FlexLayout>
    </WhiteBox>
  );
}
