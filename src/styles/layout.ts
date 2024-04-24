import styled, { css } from 'styled-components';

export const FlexLayout = styled.div<{
  $col?: boolean;
  gap?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap || '2rem'};
  ${(props) =>
    props.$col &&
    css`
      flex-direction: column;
    `};
`;
