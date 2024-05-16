export type GameTypes = {
  roundId: number;
  roomName: string;
  hostName: string;
  comment: string;
  showNickname: boolean;
  players: PlayersTypes[];
};

export type PlayersTypes = {
  roundId: number;
  userId: number;
  nickname: string;
  color: string;
  team: string;
  stamina: number;
};

export type ResultTypes = {
  isFinish: boolean;
  roundNumber: number;
  rank: number;
};
