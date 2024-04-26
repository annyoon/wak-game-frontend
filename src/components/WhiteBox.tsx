import styled, { css } from 'styled-components';
import { FlexLayout } from '../styles/layout';

const BoxBlock = styled.div`
  display: flex;
  align-items: center;
`;

const Layout = styled(FlexLayout)`
  justify-content: space-between;
`;

const StyledBox = styled(Layout)<{ $width: string }>`
  width: ${(props) => props.$width};
  height: 60.8rem;
  padding: 1.2rem 1rem;
  border-style: solid;
  border-color: white;
  border-left-width: 0rem;
  border-right-width: 0rem;
  border-top-width: 0.4rem;
  border-bottom-width: 0.4rem;
  background-color: rgba(255, 255, 255, 0.1);
`;

const BorderX = styled.img.attrs({
  src: require('../assets/borderImg/img-border-white-h640.png'),
  alt: '',
})<{ $right?: boolean }>`
  ${(props) =>
    props.$right &&
    css`
      transform: rotate(0.5turn);
    `};
`;

type WhiteBoxProps = {
  width: string;
  children?: React.ReactNode;
};

export default function WhiteBox({ width, children }: WhiteBoxProps) {
  return (
    <BoxBlock>
      <BorderX />
      <StyledBox $isCol $width={width} gap='1rem'>
        {children}
      </StyledBox>
      <BorderX $right />
    </BoxBlock>
  );
}
