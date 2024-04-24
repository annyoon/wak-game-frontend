import styled from 'styled-components';
import { FlexLayout } from '../styles/layout';

import main1 from '../assets/img-main1.png';
import { ReactNode } from 'react';

const ImgBackground = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${main1});
  background-size: cover;
  background-position: center;
`;

const DarkBackground = styled(FlexLayout)<{
  $opaque: number;
}>`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: ${(props) => `rgba(0, 0, 0, ${props.$opaque})`};
`;

type BackgroundProps = {
  $col?: boolean;
  gap?: string;
  $opaque: number;
  children: ReactNode;
};

export default function Background({
  $col,
  gap,
  $opaque,
  children,
}: BackgroundProps) {
  return (
    <ImgBackground>
      <DarkBackground $col={$col} gap={gap} $opaque={$opaque}>
        {children}
      </DarkBackground>
    </ImgBackground>
  );
}
