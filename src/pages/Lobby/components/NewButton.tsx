import Button from '../../../components/Button';

type NewButtonProps = {
  handleClick: () => void;
};

export default function NewButton({ handleClick }: NewButtonProps) {
  return <Button isBigger label={'방 만들기'} onClick={handleClick} />;
}
