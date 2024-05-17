export type GameTypes = {
  roundId: number;
  nextRoundId: number;
  roundNumber: number;
  roomName: string;
  hostName: string;
  comment: string;
  playersNumber: number;
  showNickname: boolean;
  isAlive: boolean;
};

export type PlayersTypes = {
  roundId: number;
  userId: number;
  nickname: string;
  color: string;
  team: string;
  stamina: number;
  isHost: boolean;
};

export type ResultTypes = {
  userId: number;
  killCount: number;
  rank: number;
};
