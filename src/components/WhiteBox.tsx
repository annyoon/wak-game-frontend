import styled, { css } from 'styled-components';

const BoxBlock = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBox = styled.div<{ $width: string }>`
  width: ${(props) => props.$width};
  height: 63.2rem;
  border-style: solid;
  border-color: white;
  border-left-width: 0rem;
  border-right-width: 0rem;
  border-top-width: 0.4rem;
  border-bottom-width: 0.4rem;
  text-align: center;
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
      <StyledBox $width={width}>{children}</StyledBox>
      <BorderX $right />
    </BoxBlock>
  );
}
