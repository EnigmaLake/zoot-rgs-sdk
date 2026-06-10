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
    freeRoundGrantId?: string;
  }) => Promise<Play>;

  registerUserPlayV2: ({
    accessToken,
    tenantId,
    operatorId,
    currency,
    userId,
    userNickname,
    playAmountInCents,
    playAmountMultiplier,
    gameRoundUuid,
    coinType,
    payload,
    walletReferenceId,
  }: {
    accessToken: string;
    tenantId?: number;
    operatorId?: number;
    currency?: string;
    userId: number;
    userNickname: string;
    playAmountInCents: number;
    playAmountMultiplier?: number;
    gameRoundUuid: string;
    coinType: CoinType;
    payload?: Record<string, string | number>;
    walletReferenceId?: string;
    freeRoundGrantId?: string;
  }) => Promise<Play>;

  registerBonusWin: ({
    userId,
    userNickname,
    winAmountInCents,
    gameRoundUuid,
    coinType,
    payload,
    walletReferenceId,
  }: {
    userId: number;
    userNickname: string;
    winAmountInCents: number;
    gameRoundUuid: string;
    coinType: CoinType;
    payload?: Record<string, string | number>;
    walletReferenceId?: string;
  }) => Promise<Play>;

  registerBonusWinV2: ({
    accessToken,
    tenantId,
    operatorId,
    currency,
    userId,
    userNickname,
    winAmountInCents,
    gameRoundUuid,
    coinType,
    payload,
    walletReferenceId,
  }: {
    accessToken?: string;
    tenantId?: number;
    operatorId?: number;
    currency?: string;
    userId: number;
    userNickname: string;
    winAmountInCents: number;
    gameRoundUuid: string;
    coinType: CoinType;
    payload?: Record<string, string | number>;
    walletReferenceId?: string;
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
    walletReferenceId,
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
    walletReferenceId?: string;
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
    accessToken,
    tenantId,
    operatorId,
    currency,
    userId,
    userNickname,
    gameRoundUuid,
    gameRoundEndTimeInMs,
    payload,
  }: {
    accessToken?: string;
    tenantId?: number;
    operatorId?: number;
    currency?: string;
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    gameRoundEndTimeInMs: number;
    payload?: Record<string, string | number>;
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

  getRegisteredUserPlaysV2: ({
    userId,
    gameRoundUuid,
    userAccessToken,
    tenantId,
  }: {
    userId: number;
    gameRoundUuid: string;
    userAccessToken: string;
    tenantId: number;
  }) => Promise<{
    message: string;
    gameRoundUuid: string;
    userId: number;
    plays: Play[];
  }>;

  retrieveFreeRounds: ({
    userId,
    accessToken,
  }: {
    userId: number;
    accessToken: string;
  }) => Promise<FreeRoundGrant[]>;

  retrieveFreeRoundsWithTotals: ({
    userId,
    accessToken,
  }: {
    userId: number;
    accessToken: string;
  }) => Promise<FreeRoundGrantsWithTotals>;

  retrieveFreeRoundsWinSummary: ({
    userId,
    accessToken,
    batchId,
  }: {
    userId: number;
    accessToken: string;
    batchId?: string;
  }) => Promise<FreeRoundsWinSummary>;
}

export type FreeRoundGrant = {
  grantId: string;
  gameId: number;
  coinType: CoinType | null;
  currency: string | null;
  operatorId?: number;
  tenantId?: number;
  stakeCents: number;
  expiresAt: string;
  batchId?: string | null;
};

/**
 * Per-batch totals grouped by (gameId, coinType, currency, stakeCents).
 * availableCount = grants playable right now in the group;
 * batchTotalCount = ALL grants the user holds in the batches behind the
 * group's available grants, in every status except REVOKED (consumed +
 * available + expired). Always batchTotalCount >= availableCount — render as
 * "{availableCount}/{batchTotalCount} rounds remaining".
 * Exactly one of coinType (B2C) / currency (B2B) is non-null per group.
 */
export type FreeRoundBatchTotal = {
  gameId: number;
  coinType: CoinType | null;
  currency: string | null;
  stakeCents: number;
  availableCount: number;
  batchTotalCount: number;
};

/**
 * Exact response shape of POST /:gameId/retrieve-free-rounds
 */
export type RetrieveFreeRoundsResponse = {
  message: string;
  userId: number;
  gameId: number;
  freeRounds: FreeRoundGrant[];
  totals: FreeRoundBatchTotal[];
};

/**
 * Return shape of retrieveFreeRoundsWithTotals(): the array of available
 * grants alongside the per-batch totals.
 */
export type FreeRoundGrantsWithTotals = {
  grants: FreeRoundGrant[];
  totals: FreeRoundBatchTotal[];
};

/**
 * Per-(coinType, currency) aggregate of consumed free rounds and their
 * bonus winnings. A consumed round with no win event counts in roundsPlayed
 * and adds 0 cents.
 */
export type FreeRoundsCoinWinSummary = {
  coinType: CoinType | null;
  currency: string | null;
  roundsPlayed: number;
  totalWinCents: number;
};

/**
 * Exact response shape of POST /:gameId/retrieve-free-rounds-win-summary.
 * batchId echoes the request filter (null when omitted). Top-level
 * totalWinCents/coinType/currency are the single group's values when
 * summaries.length === 1, otherwise null: when the user's consumed grants
 * span multiple coin groups (only possible without a batchId filter), a
 * single flattened amount would mix incomparable units (e.g. SWEEPS + GOLD
 * cents), so the flattened fields are nulled and the per-group `summaries`
 * array is the authoritative source for per-coin amounts. No consumed
 * grants => roundsPlayed 0, totalWinCents 0, summaries [].
 */
export type FreeRoundsWinSummary = {
  userId: number;
  gameId: number;
  batchId: string | null;
  roundsPlayed: number;
  totalWinCents: number | null;
  coinType: CoinType | null;
  currency: string | null;
  summaries: FreeRoundsCoinWinSummary[];
};

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
