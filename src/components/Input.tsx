import styled, { css } from 'styled-components';

const Layout = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: 4.8rem;
  padding: 0rem;
  border-style: solid;
  border-color: black;
  border-left-width: 0rem;
  border-right-width: 0rem;
  border-top-width: 0.4rem;
  border-bottom-width: 0.4rem;
  background-color: rgba(255, 255, 355, 0.6);
  &:focus {
    outline-width: 0rem;
  }
`;

const BorderX = styled.img.attrs({
  src: require('../assets/img-border-black-h56.png'),
  alt: '닉네임 입력',
})<{ right?: string }>`
  ${(props) =>
    props.right &&
    css`
      transform: rotate(0.5turn);
    `};
`;

type InputProps = {
  width?: string;
};

export default function Input({ width }: InputProps) {
  return (
    <Layout>
      <BorderX />
      <StyledInput width={width || '20rem'} />
      <BorderX right='true' />
    </Layout>
  );
}
