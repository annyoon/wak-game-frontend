import styled, { css } from 'styled-components';

export const FlexLayout = styled.div<{
  $col?: boolean;
  gap?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap || '1rem'};
  ${(props) =>
    props.$col &&
    css`
      flex-direction: column;
    `};
`;

export const DarkBackground = styled(FlexLayout)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
`;
