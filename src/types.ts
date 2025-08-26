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
    gameRoundUuid: string;
  }) => Promise<{ startTimestamp: number }>;
  completeGameRound: ({
    gameRoundUuid,
    winMultiplier,
  }: {
    gameRoundUuid: string;
    winMultiplier: string;
    payload: Record<string, string | number | object>;
  }) => Promise<void>;
  cancelGameRound: ({
    gameRoundUuid,
  }: {
    gameRoundUuid: string;
  }) => Promise<void>;

  getGameRound: ({ gameRoundUuid }: { gameRoundUuid: string }) => Promise<{
    gameRound: GameRound;
  }>;

  registerUserPlay: ({
    userId,
    userNickname,
    playAmountInCents,
    gameRoundUuid,
    coinType,
    userAccessToken,
    payload,
  }: {
    userId: number;
    userNickname: string;
    playAmountInCents: number;
    gameRoundUuid: string;
    coinType: CoinType;
    userAccessToken: string;
    payload?: Record<string, string | number>;
  }) => Promise<Play>;

  registerUserPlayV2: ({
    accessToken,
    tenantId,
    operatorId,
    currency,
    userId,
    userNickname,
    playAmountInCents,
    gameRoundUuid,
    coinType,
    userAccessToken,
    payload,
  }: {
    accessToken?: string;
    tenantId?: number;
    operatorId?: number;
    currency?: string;
    userId: number;
    userNickname: string;
    playAmountInCents: number;
    gameRoundUuid: string;
    coinType: CoinType;
    userAccessToken: string;
    payload?: Record<string, string | number>;
  }) => Promise<Play>;

  registerBonusWin: ({
    userId,
    userNickname,
    winAmountInCents,
    gameRoundUuid,
    coinType,
    payload,
  }: {
    userId: number;
    userNickname: string;
    winAmountInCents: number;
    gameRoundUuid: string;
    coinType: CoinType;
    payload?: Record<string, string | number>;
  }) => Promise<Play>;
  deregisterUserPlay: ({
    userId,
    userNickname,
    gameRoundUuid,
    userAccessToken,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    userAccessToken: string;
  }) => Promise<void>;

  registerPlayWinV2: ({
    accessToken,
    tenantId,
    operatorId,
    currency,
    userId,
    userNickname,
    gameRoundUuid,
    winAmountInCents,
    winMultiplier,
    playWinTimestamp,
    gameRoundCurrentProgressInMs,
    payload,
  }: {
    accessToken?: string;
    tenantId?: number;
    operatorId?: number;
    currency?: string;
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    winAmountInCents: number;
    winMultiplier: string;
    playWinTimestamp: number;
    gameRoundCurrentProgressInMs: number;
    payload?: Record<string, string | number>;
  }) => Promise<Play>;

  registerPlayWin: ({
    userId,
    userNickname,
    gameRoundUuid,
    winAmountInCents,
    winMultiplier,
    playWinTimestamp,
    gameRoundCurrentProgressInMs,
    payload,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    winAmountInCents: number;
    winMultiplier: string;
    playWinTimestamp: number;
    gameRoundCurrentProgressInMs: number;
    payload?: Record<string, string | number>;
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

  registerPlayLoseV2: ({
    tenantId,
    operatorId,
    currency,
    userId,
    userNickname,
    gameRoundUuid,
    gameRoundEndTimeInMs,
  }: {
    tenantId?: number;
    operatorId?: number;
    currency?: string;
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    gameRoundEndTimeInMs: number;
  }) => Promise<Play>;

  getRegisteredUserPlays: ({
    userId,
    gameRoundUuid,
    userAccessToken,
  }: {
    userId: number;
    gameRoundUuid: string;
    userAccessToken: string;
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
  EXTERNAL = -1,
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
  userBetsWinsRegistered: GameRoundEvent[];
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
