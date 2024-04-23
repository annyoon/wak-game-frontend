import styled from 'styled-components';

export const SmallText = styled.div`
  font-size: 2.4rem;
  color: ${(props) => props.color || 'white'};
`;

export const RegularText = styled.div`
  font-size: 3.6rem;
  color: ${(props) => props.color || 'white'};
`;
