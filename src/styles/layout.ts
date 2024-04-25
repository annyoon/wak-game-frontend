import styled from 'styled-components';

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const FlexLayout = styled.div<{
  $isCol?: boolean;
  gap?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.gap || '2rem'};
  flex-direction: ${(props) => (props.$isCol ? 'column' : 'row')};
`;

export const ImgBackground = styled.div<{ $img: string }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.$img});
  background-size: cover;
  background-position: center;
`;

export const DarkBackground = styled.div<{ $opaque?: number }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: ${(props) => `rgba(0, 0, 0, ${props.$opaque || 0.8})`};
`;
