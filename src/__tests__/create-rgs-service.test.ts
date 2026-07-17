import axios from "axios";

import { createRgsService } from "../create-rgs-service";
import { CoinType, Play } from "../types";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const lastRequestConfig = () =>
  mockedAxios.request.mock.calls[0][0] as {
    url: string;
    data: Record<string, unknown>;
  };

const rgsService = createRgsService({
  rgsAPIHost: "https://rgs.test",
  rgsGameId: "game-id",
  rgsBearerToken: "bearer-token",
});

const basePlayArgs = {
  accessToken: "user-access-token",
  userId: 1,
  userNickname: "player",
  playAmountInCents: 100,
  gameRoundUuid: "round-uuid",
  coinType: CoinType.SWEEPS,
};

describe("registerUserPlayV2", () => {
  beforeEach(() => {
    mockedAxios.request.mockReset();
    mockedAxios.request.mockResolvedValue({ data: {} as Play });
  });

  it("includes metadata in the request data when provided", async () => {
    const metadata = { skinSlug: "neon", skinSource: "manifest" };

    await rgsService.registerUserPlayV2({ ...basePlayArgs, metadata });

    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    const requestConfig = lastRequestConfig();
    expect(requestConfig.url).toBe(
      "https://rgs.test/game-id/v2/register-user-play"
    );
    expect(requestConfig.data.metadata).toEqual(metadata);
  });

  it("sends no metadata key on the wire when metadata is omitted", async () => {
    await rgsService.registerUserPlayV2({ ...basePlayArgs });

    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    const requestConfig = lastRequestConfig();
    expect(requestConfig.data.metadata).toBeUndefined();
    // axios JSON-serializes the body; undefined values are dropped, so the
    // wire payload must not contain a metadata key at all
    const wireBody = JSON.parse(JSON.stringify(requestConfig.data));
    expect(Object.keys(wireBody)).not.toContain("metadata");
  });
});
