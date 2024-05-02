import WhiteBox from '../../../components/WhiteBox';

type PlayersListProps = {
  isHost: boolean;
};

export default function PlayersList({ isHost }: PlayersListProps) {
  return isHost ? (
    <WhiteBox mode='SHORT' width='77.2rem'></WhiteBox>
  ) : (
    <WhiteBox mode='MEDIUM' width='77.2rem'></WhiteBox>
  );
}
