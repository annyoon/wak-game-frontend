import useBackgroundStore from '../store/backgroundStore';

import styled from 'styled-components';
import { FlexLayout, ImgBackground, DarkBackground } from '../styles/layout';

import mainImg1 from '../assets/img-main1.png';
import mainImg2 from '../assets/img-main2.png';
import mainImg3 from '../assets/img-main3.png';
import mainImg4 from '../assets/img-main4.png';
import mainImg5 from '../assets/img-main5.png';

const BackgroundLayout = styled(FlexLayout)`
  width: 100%;
  height: 100%;
`;

type BackgroundProps = {
  isCol?: boolean;
  gap?: string;
  opaque?: number;
  mainImg?: string;
  children: React.ReactNode;
};

export default function Background({
  isCol,
  gap,
  opaque,
  children,
}: BackgroundProps) {
  const mainImgs = [mainImg1, mainImg2, mainImg3, mainImg4, mainImg5];
  const { imgNumberData } = useBackgroundStore();

  return (
    <ImgBackground $img={mainImgs[imgNumberData]}>
      <DarkBackground $opaque={opaque}>
        <BackgroundLayout $isCol={isCol} gap={gap}>
          {children}
        </BackgroundLayout>
      </DarkBackground>
    </ImgBackground>
  );
}
