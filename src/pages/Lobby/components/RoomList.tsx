import { GridLayout } from '../../../styles/layout';

import WhiteRoundBox from '../../../components/WhiteRoundBox';

export default function RoomList() {
  const ROOM_NUM_SINGLE_PAGE = 6;
  const rooms = Array.from({ length: ROOM_NUM_SINGLE_PAGE });

  return (
    <GridLayout $col={2} gap='2.4rem'>
      {rooms.map((value, index) => {
        return <WhiteRoundBox key={index} width='36rem'></WhiteRoundBox>;
      })}
    </GridLayout>
  );
}
