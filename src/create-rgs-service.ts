import axios, {AxiosHeaders, AxiosRequestConfig} from "axios";

import {
  CoinType,
  GameRound,
  Play,
  RgsService,
  RgsServiceProperties,
} from "./types";

/**
 * Creates an RGS service used to communicate with the Enigma Lake RGS API
 */
export const createRgsService = ({
  rgsGameId,
  rgsBearerToken,
  rgsAPIHost,
}: RgsServiceProperties): RgsService => {
  /**
   * Initialize a game round
   */
  const initiateGameRound = async (): Promise<GameRound> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/initiate-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as AxiosHeaders,
    };

    const response = await axios.request(requestConfig);

    return response.data.gameRound;
  };

  /**
   * Start an already initialised game round
   * @param gameRoundUuid
   */
  const startGameRound = async ({
    gameRoundUuid,
  }: {
    gameRoundUuid: string | undefined;
  }): Promise<{ startTimestamp: number }> => {
    if (!gameRoundUuid) throw new Error("gameRoundUuid is required");

    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/start-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as AxiosHeaders,
      data: {
        gameRoundUuid,
      },
    };

    const response = await axios.request(requestConfig);

    return { startTimestamp: response.data.startTimestamp };
  };

  /**
   * Complete an in-progress game round
   * @param gameRoundUuid
   * @param crashNumber
   * @param gameRoundEndTimeInMs
   */
  const completeGameRound = async ({
    gameRoundUuid,
    crashNumber,
    gameRoundEndTimeInMs,
  }: {
    gameRoundUuid: string | undefined;
    crashNumber: number;
    gameRoundEndTimeInMs: number;
  }) => {
    if (!gameRoundUuid) throw new Error("gameRoundUuid is required");

    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/complete-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as AxiosHeaders,
      data: {
        gameRoundUuid,
        crashNumber,
        gameRoundEndTimeInMs,
      },
    };

    await axios.request(requestConfig);
  };

  /**
   * Cancel an in-progress game round
   * @param gameRoundUuid
   */
  const cancelGameRound = async ({
    gameRoundUuid,
  }: {
    gameRoundUuid: string | undefined;
  }) => {
    if (!gameRoundUuid) throw new Error("gameRoundUuid is required");

    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/cancel-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as AxiosHeaders,
      data: {
        gameRoundUuid,
      },
    };

    await axios.request(requestConfig);
  };

  /**
   * Retrieve a game round
   * @param gameRoundUuid
   */
  const getGameRound = async ({ gameRoundUuid }: { gameRoundUuid: string }) => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/retrieve-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as AxiosHeaders,
      data: {
        gameRoundUuid,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as {
      message: string;
      gameRoundUuid: string;
      userId: number;
      gameRound: GameRound;
    };
  };

  /**
   * Registers an user play
   * @param userId
   * @param userNickname
   * @param playAmountInCents
   * @param gameRoundUuid
   * @param coinType
   * @param accessToken
   * @param additionalPayload
   */
  const registerUserPlay = async ({
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
  }): Promise<Play> => {
    if (!gameRoundUuid) throw new Error("gameRoundUuid is required");

    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/register-user-play`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
        "User-Authorization": `Bearer ${accessToken}`,
      } as AxiosHeaders,
      data: {
        userId,
        userNickname,
        playAmountInCents,
        gameRoundUuid,
        coinType,
        additionalPayload,
      },
    };

    const response = await axios.request(requestConfig);

    return {
      gameRoundUuid: response.data.gameRoundUuid,
      playId: response.data.playId,
      userId: response.data.userId,
      userNickname: response.data.userNickname,
      playAmountInCents: response.data.playAmountInCents,
      winAmountInCents: response.data.winAmountInCents,
      winMultiplier: response.data.winMultiplier,
      coinType: response.data.coinType,
    };
  };

  /**
   * Deregisters a user play
   * @param userId
   * @param userNickname
   * @param gameRoundUuid
   * @param accessToken
   */
  const deregisterUserPlay = async ({
    userId,
    userNickname,
    gameRoundUuid,
    accessToken,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string | undefined;
    accessToken: string;
  }) => {
    if (!gameRoundUuid) throw new Error("gameRoundUuid is required");

    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/deregister-user-play`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${accessToken}`,
      } as AxiosHeaders,
      data: {
        userId,
        userNickname,
        gameRoundUuid,
      },
    };

    await axios.request(requestConfig);
  };

  /**
   * Register a user play win
   * @param userId
   * @param userNickname
   * @param gameRoundUuid
   * @param winAmountInCents
   * @param winMultiplier
   * @param playWinTimestamp
   * @param gameRoundCurrentProgressInMs
   * @param additionalPayload
   */
  const registerPlayWin = async ({
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
  }): Promise<Play> => {
    if (!gameRoundUuid) throw new Error("gameRoundUuid is required");

    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/register-play-win`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as AxiosHeaders,
      data: {
        userId,
        userNickname,
        gameRoundUuid,
        winAmountInCents,
        winMultiplier,
        playWinTimestamp,
        gameRoundCurrentProgressInMs,
        additionalPayload,
      },
    };

    const response = await axios.request(requestConfig);

    return {
      gameRoundUuid: response.data.gameRoundUuid,
      playId: response.data.playId,
      userId: response.data.userId,
      userNickname: response.data.userNickname,
      playAmountInCents: response.data.playAmountInCents,
      winAmountInCents: response.data.winAmountInCents,
      winMultiplier: response.data.winMultiplier,
      coinType: response.data.coinType,
    };
  };

  /**
   * Register a user play lose
   * @param userId
   * @param userNickname
   * @param gameRoundUuid
   * @param gameRoundEndTimeInMs
   */
  const registerPlayLose = async ({
    userId,
    userNickname,
    gameRoundUuid,
    gameRoundEndTimeInMs,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    gameRoundEndTimeInMs: number;
  }): Promise<Play> => {
    if (!gameRoundUuid) throw new Error("gameRoundUuid is required");

    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/register-play-lose`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as AxiosHeaders,
      data: {
        userId,
        userNickname,
        gameRoundUuid,
        gameRoundEndTimeInMs,
      },
    };

    const response = await axios.request(requestConfig);

    return {
      gameRoundUuid: response.data.playLose.gameRoundUuid,
      playId: response.data.playLose.playId,
      userId: response.data.playLose.userId,
      userNickname: response.data.playLose.userNickname,
      playAmountInCents: response.data.playLose.playAmountInCents,
      winAmountInCents: response.data.playLose.winAmountInCents,
      winMultiplier: response.data.playLose.winMultiplier,
      coinType: response.data.playLose.coinType,
    };
  };

  /**
   * Retrieve a registered user play
   * @param gameRoundUuid
   * @param userId
   * @param accessToken
   */
  const getRegisteredUserPlays = async ({
    gameRoundUuid,
    userId,
    accessToken,
  }: {
    gameRoundUuid: string;
    userId: number;
    accessToken: string;
  }) => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/retrieve-user-play`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
        "User-Authorization": `Bearer ${accessToken}`,
      } as AxiosHeaders,
      data: {
        gameRoundUuid,
        userId,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as {
      message: string;
      gameRoundUuid: string;
      userId: number;
      plays: Play[];
    };
  };

  return {
    initiateGameRound,
    startGameRound,
    completeGameRound,
    cancelGameRound,
    getGameRound,

    registerUserPlay,
    deregisterUserPlay,
    registerPlayWin,
    registerPlayLose,
    getRegisteredUserPlays,
  };
};
