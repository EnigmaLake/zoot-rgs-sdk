export interface RgsServiceProperties {
  rgsAPIHost: string;
  rgsGameId: string;
  rgsBearerToken: string;
}

export interface RgsService {
  initiateGameRound: () => Promise<GameRound>;
  startGameRound: ({
    gameRoundUuid,
  }: {
    gameRoundUuid: string | undefined;
  }) => Promise<{ startTimestamp: number }>;
  completeGameRound: ({
    gameRoundUuid,
    crashNumber,
    gameRoundEndTimeInMs,
  }: {
    gameRoundUuid: string | undefined;
    crashNumber: number;
    gameRoundEndTimeInMs: number;
  }) => Promise<void>;
  cancelGameRound: ({
    gameRoundUuid,
  }: {
    gameRoundUuid: string | undefined;
  }) => Promise<void>;

  getGameRound: ({ gameRoundUuid }: { gameRoundUuid: string }) => Promise<{
    message: string;
    gameRoundUuid: string;
    userId: number;
    gameRound: GameRound;
  }>;

  registerUserPlay: ({
    userId,
    userNickname,
    playAmountInCents,
    gameRoundUuid,
    coinType,
    accessToken,
  }: {
    userId: number;
    userNickname: string;
    playAmountInCents: number;
    gameRoundUuid: string | undefined;
    coinType: CoinType;
    accessToken: string;
  }) => Promise<Play>;
  deregisterUserPlay: ({
    userId,
    userNickname,
    gameRoundUuid,
    accessToken,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string | undefined;
    accessToken: string;
  }) => Promise<void>;
  registerPlayWin: ({
    userId,
    userNickname,
    gameRoundUuid,
    winAmountInCents,
    winMultiplier,
    playWinTimestamp,
    gameRoundCurrentProgressInMs,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string | undefined;
    winAmountInCents: number;
    winMultiplier: string;
    playWinTimestamp: number;
    gameRoundCurrentProgressInMs: number;
  }) => Promise<Play>;
  registerPlayLose: ({
    userId,
    userNickname,
    gameRoundUuid,
    gameRoundEndTimeInMs,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    gameRoundEndTimeInMs: number;
  }) => Promise<Play>;

  getRegisteredUserPlays: ({
    userId,
    gameRoundUuid,
    accessToken,
  }: {
    userId: number;
    gameRoundUuid: string;
    accessToken: string;
  }) => Promise<{
    message: string;
    gameRoundUuid: string;
    userId: number;
    plays: Play[];
  }>;
}

export type Play = {
  gameRoundUuid: string;
  playId: string;
  userId: number;
  userNickname: string;
  pictureUrl?: string;
  playAmountInCents: number;
  winAmountInCents: number;
  winMultiplier: string;
  coinType: CoinType;
  playPayload?: Record<string, unknown>;
};

export enum CoinType {
  SWEEPS,
  GOLD,
}

export interface GameRound {
  gameRoundUuid: string;
  status: GameRoundStatuses;
  startTimestamp?: number;
  betMultiplier?: string;
  endTimestamp?: number;
  gameRoundEndTimeInMs?: number;
  userBetsRegistered: GameRoundEvent[];
  userBetsDeregistered: GameRoundEvent[];
  userBetsWin: GameRoundEvent[];
  userBetsLose: GameRoundEvent[];
}

export enum GameRoundStatuses {
  EMPTY = "EMPTY",
  PREPARED = "PREPARED",
  LIVE = "LIVE",
  COMPLETED = "COMPLETED",
}

export interface GameRoundEvent {
  event_name: string;
  payload: Record<string, unknown>;
}
