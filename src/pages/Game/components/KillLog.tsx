import styled from 'styled-components';
import { FlexLayout } from '../../../styles/layout';
import { textStyles } from '../../../styles/fonts';

import WhiteRoundBox from '../../../components/WhiteRoundBox';

const KillLogBox = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
`;

const TextBox = styled(FlexLayout)`
  justify-content: space-evenly;
  margin-bottom: 0.4rem;
`;

const Text = styled.div`
  ${textStyles}
`;

export default function KillLog() {
  const logs = Array.from({ length: 40 });

  return (
    <WhiteRoundBox width='32rem'>
      <KillLogBox>
        {logs.map((value, index) => {
          return (
            <TextBox key={index}>
              <Text color='#725bff'>{`김라쿤`}</Text>
              <Text>{`> > >`}</Text>
              <Text>{`김라쿤`}</Text>
              <Text>{`X`}</Text>
            </TextBox>
          );
        })}
      </KillLogBox>
    </WhiteRoundBox>
  );
}
