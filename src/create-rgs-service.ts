import axios, { AxiosRequestConfig } from "axios";

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
      } as never,
    };

    const response = await axios.request(requestConfig);

    return response.data.gameRound as GameRound;
  };

  /**
   * Start an already initialised game round
   * @param gameRoundUuid
   */
  const startGameRound = async ({
    gameRoundUuid,
  }: {
    gameRoundUuid: string;
  }): Promise<{ startTimestamp: number }> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/start-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
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
   */
  const completeGameRound = async ({
    gameRoundUuid,
    winMultiplier,
    payload,
  }: {
    gameRoundUuid: string;
    winMultiplier: string;
    payload: Record<string, string | number | object>;
  }) => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/complete-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
      data: {
        gameRoundUuid,
        winMultiplier,
        payload,
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
    gameRoundUuid: string;
  }) => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/cancel-game-round`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
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
      } as never,
      data: {
        gameRoundUuid,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as {
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
   * @param userAccessToken
   * @param payload
   */
  const registerUserPlay = async ({
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
  }): Promise<Play> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/register-user-play`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
        "User-Authorization": `Bearer ${userAccessToken}`,
      } as never,
      data: {
        userId,
        userNickname,
        playAmountInCents,
        gameRoundUuid,
        coinType,
        payload,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as Play;
  };

  /**
   * Registers an user play - V2
   * @param accessToken
   * @param tenantId
   * @param operatorId
   * @param currency
   * @param userId
   * @param userNickname
   * @param playAmountInCents
   * @param gameRoundUuid
   * @param coinType
   * @param userAccessToken
   * @param payload
   */
  const registerUserPlayV2 = async ({
    accessToken,
    tenantId,
    operatorId,
    currency,
    userId,
    userNickname,
    playAmountInCents,
    gameRoundUuid,
    coinType,
    payload,
  }: {
    accessToken: string;
    tenantId?: number;
    operatorId?: number;
    currency?: string;
    userId: number;
    userNickname: string;
    playAmountInCents: number;
    gameRoundUuid: string;
    coinType: CoinType;
    payload?: Record<string, string | number>;
  }): Promise<Play> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/v2/register-user-play`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
        "User-Authorization": `Bearer ${accessToken}`,
      } as never,
      data: {
        accessToken,
        tenantId,
        operatorId,
        currency,
        userId,
        userNickname,
        playAmountInCents,
        gameRoundUuid,
        coinType,
        payload,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as Play;
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
    userAccessToken,
  }: {
    userId: number;
    userNickname: string;
    gameRoundUuid: string;
    userAccessToken: string;
  }) => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/deregister-user-play`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
        "User-Authorization": `Bearer ${userAccessToken}`,
      } as never,
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
   * @param payload
   */
  const registerPlayWin = async ({
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
  }): Promise<Play> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/register-play-win`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
      data: {
        userId,
        userNickname,
        gameRoundUuid,
        winAmountInCents,
        winMultiplier,
        playWinTimestamp,
        gameRoundCurrentProgressInMs,
        payload,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as Play;
  };

  /**
   * Register a user play win - V2
   * @param accessToken
   * @param tenantId
   * @param operatorId
   * @param currency
   * @param userId
   * @param userNickname
   * @param gameRoundUuid
   * @param winAmountInCents
   * @param winMultiplier
   * @param playWinTimestamp
   * @param gameRoundCurrentProgressInMs
   * @param payload
   */
  const registerPlayWinV2 = async ({
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
  }): Promise<Play> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/v2/register-play-win`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
      data: {
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
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as Play;
  };

  /**
   * Register a user bonus win
   * @param userId
   * @param userNickname
   * @param gameRoundUuid
   * @param winAmountInCents
   * @param winMultiplier
   * @param payload
   */
  const registerBonusWin = async ({
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
  }): Promise<Play> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/register-bonus-win`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
      data: {
        userId,
        userNickname,
        winAmountInCents,
        coinType,
        gameRoundUuid,
        payload,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as Play;
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
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/register-play-lose`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
      data: {
        userId,
        userNickname,
        gameRoundUuid,
        gameRoundEndTimeInMs,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as Play;
  };

  /**
   * Register a user play lose - V2
   * @param tenantId
   * @param operatorId
   * @param currency
   * @param userId
   * @param userNickname
   * @param gameRoundUuid
   * @param gameRoundEndTimeInMs
   */
  const registerPlayLoseV2 = async ({
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
  }): Promise<Play> => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/v2/register-play-lose`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
      } as never,
      data: {
        tenantId,
        operatorId,
        currency,
        userId,
        userNickname,
        gameRoundUuid,
        gameRoundEndTimeInMs,
      },
    };

    const response = await axios.request(requestConfig);

    return response.data as Play;
  };

  /**
   * Retrieve a registered user play
   * @param gameRoundUuid
   * @param userId
   * @param userAccessToken
   */
  const getRegisteredUserPlays = async ({
    gameRoundUuid,
    userId,
    userAccessToken,
  }: {
    gameRoundUuid: string;
    userId: number;
    userAccessToken: string;
  }) => {
    const requestConfig: AxiosRequestConfig = {
      url: `${rgsAPIHost}/${rgsGameId}/retrieve-user-play`,
      method: "POST",
      headers: {
        "Server-Authorization": `Bearer ${rgsBearerToken}`,
        "User-Authorization": `Bearer ${userAccessToken}`,
      } as never,
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
    registerBonusWin,
    registerPlayLose,
    getRegisteredUserPlays,

    registerUserPlayV2,
    registerPlayWinV2,
    registerPlayLoseV2,
  };
};
