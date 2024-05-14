import { useNavigate, useParams } from 'react-router-dom';
import { exitRoom } from '../../../services/room';

import styled from 'styled-components';
import { FlexLayout } from '../../../styles/layout';

import RoundButton from '../../../components/RoundButton';
import { startGame } from '../../../services/game';

const Layout = styled(FlexLayout)`
  place-self: end;
`;

type ButtonGroupProps = {
  isHost: boolean;
  canStart: boolean;
  openDialog: () => void;
};

export default function ButtonGroup({
  isHost,
  canStart,
  openDialog,
}: ButtonGroupProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleStart = async () => {
    if (canStart) {
      try {
        // id && (await startGame(parseInt(id)));
        // navigate(`/game/${id}`);
      } catch (error: any) {
        console.error('게임 시작 에러', error);
        navigate(`/error`);
      }
    } else {
      openDialog();
    }
  };

  const hanndleBack = async () => {
    try {
      id && (await exitRoom(parseInt(id)));
    } catch (error: any) {
      console.error('방 나가기 에러', error);
      navigate(`/error`);
    }

    navigate(`/lobby`, { replace: true });
  };

  return (
    <Layout gap='2rem'>
      <RoundButton color='purple' label={`게임 방법`} />
      {isHost && (
        <RoundButton color='blue' label={`게임 시작`} onClick={handleStart} />
      )}
      <RoundButton color='red' label={`나가기`} onClick={hanndleBack} />
    </Layout>
  );
}
