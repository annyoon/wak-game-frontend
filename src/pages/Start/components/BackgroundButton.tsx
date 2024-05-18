import styled from 'styled-components';
import Button from '../../../components/Button';
import useBackgroundStore from '../../../store/backgroundStore';

const ImgChangeButton = styled(Button)`
  white-space: pre-line;
  position: fixed;
  top: 4rem;
  right: 4rem;
`;

export default function BackgroundButton() {
  const { imgNumberData, setImgNumberData } = useBackgroundStore();

  const handleClick = () => {
    const newNumber = imgNumberData < 4 ? imgNumberData + 1 : 0;
    setImgNumberData(newNumber);
  };
  return (
    <ImgChangeButton
      isBigger
      label={`╔═══╗\nWAK\n╚═══╝`}
      onClick={handleClick}
    />
  );
}
