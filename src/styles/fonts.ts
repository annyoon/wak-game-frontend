import styled, { css } from 'styled-components';

export const textStyles = css`
  font-family: 'DungGeunMo';
  font-size: 2rem;
  color: black;
`;

export const SmallText = styled.div`
  ${textStyles}
  font-size: 2.8rem;
  color: ${(props) => props.color || 'white'};
`;

export const RegularText = styled.div`
  ${textStyles}
  font-size: 3.6rem;
  color: ${(props) => props.color || 'white'};
`;
