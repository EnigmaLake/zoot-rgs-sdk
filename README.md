# Enigma Lake Zoot - Game RGS Service

The Enigma Lake Zoot Game RGS Service SDK is a TypeScript library designed to seamlessly interact with the RGS server from all the games' servers.  

## Features
- **Create a new RGS Service** **```createRgsService(props: RgsServiceProperties)```**

## Getting Started

To start using the Enigma Lake Zoot Game RGS Service SDK, follow these steps:

1. **Installation**: Install the SDK via npm:
```bash 
npm install @enigma-lake/zoot-game-rgs-service-sdk
```

2. **Integration**: You can import the entire package using the syntax
``` js
import * as zootSDK from '@enigma-lake/zoot-game-rgs-service-sdk';
```
or you can import specific types, events, and methods individually, such as:
``` js
 import { createRgsService } from '@enigma-lake/zoot-game-rgs-service-sdk';
```

3. **Usage**: Utilize SDK methods to access RGS methods and integrate Enigma Lake Zoot's features into your game.
- Initiate a new game round **```initiateGameRound()```**
- Start a game round **```startGameRound()```**
- Complete a game round **```completeGameRound()```**
- Cancel a game round **```cancelGameRound()```**
- Get a game round **```getGameRound()```**
- Register a user play **```registerUserPlay()```**
- Deregister a user play **```deregisterUserPlay()```**
- Register a user play win **```registerPlayWin()```**
- Register a user play lose **```registerPlayLose()```**
- Get register user plays **```getRegisteredUserPlays()```**

## Data Types
These data types define the RGS methods used within the Enigma Lake Zoot platform integration.
```js
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
    additionalPayload,
  }: {
    userId: number;
    userNickname: string;
    playAmountInCents: number;
    gameRoundUuid: string | undefined;
    coinType: CoinType;
    accessToken: string;
    additionalPayload?: Record<string, unknown>;
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
    additionalPayload,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string | undefined;
    winAmountInCents: number;
    winMultiplier: string;
    playWinTimestamp: number;
    gameRoundCurrentProgressInMs: number;
    additionalPayload?: Record<string, unknown>;
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
```