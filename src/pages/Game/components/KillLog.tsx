import styled, { css } from 'styled-components';
import { FlexLayout } from '../../../styles/layout';
import { textStyles } from '../../../styles/fonts';

import WhiteRoundBox from '../../../components/WhiteRoundBox';

const KillLogBox = styled.div<{ isWaiting?: boolean }>`
  width: 100%;
  height: 90%;
  overflow-y: auto;
  ${(props) =>
    props.isWaiting &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
`;

const TextBox = styled(FlexLayout)`
  justify-content: space-evenly;
  margin-bottom: 0.4rem;
`;

const Text = styled.div`
  ${textStyles}
`;

type KillLogProps = {
  isWaiting?: boolean;
};

export default function KillLog({ isWaiting }: KillLogProps) {
  const logs = Array.from({ length: 9 });

  return (
    <WhiteRoundBox width='32rem'>
      <KillLogBox isWaiting={isWaiting}>
        {isWaiting ? (
          <TextBox>
            <Text>{`Kill Log`}</Text>
          </TextBox>
        ) : (
          logs.map((value, index) => {
            return (
              <TextBox key={index}>
                <Text color='#725bff'>{`김라쿤`}</Text>
                <Text>{`> > >`}</Text>
                <Text>{`김라쿤`}</Text>
                <Text>{`X`}</Text>
              </TextBox>
            );
          })
        )}
      </KillLogBox>
    </WhiteRoundBox>
  );
}
