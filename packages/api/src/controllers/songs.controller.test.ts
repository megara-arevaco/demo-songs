import { describe, it, expect, vi, beforeEach } from "vitest";
import songsController from "./songs.controller";

describe("controllers/songs.getAll", () => {
  let reply: any;

  beforeEach(() => {
    reply = {
      sent: undefined as unknown,
      statusCode: undefined as number | undefined,
      send: vi.fn(function (this: any, payload: unknown) {
        this.sent = payload;
      }),
      status: vi.fn(function (this: any, code: number) {
        this.statusCode = code;
        return this;
      }),
    };
  });

  it("returns the songs array", async () => {
    await songsController.getAll({} as any, reply);

    expect(reply.statusCode).toBeUndefined();
    expect(Array.isArray(reply.sent)).toBe(true);
    const songs = reply.sent as Array<any>;
    expect(songs.length).toBeGreaterThan(0);
    expect(songs[0].name).toBe("Flowers");
  });
});
