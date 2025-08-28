import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./http", () => {
  return {
    apiFetch: vi.fn(),
  };
});

import { apiFetch } from "./http";
import { getSongs } from "./songs";

describe("services/getSongs", () => {
  beforeEach(() => {
    (apiFetch as unknown as ReturnType<typeof vi.fn>).mockReset();
  });

  it("returns parsed songs from API", async () => {
    const payload = [
      { id: 1, name: "Flowers", author: "Miley Cyrus", progress: 0.15 },
      { id: 2, name: "Anti-Hero", author: "Taylor Swift", progress: 0.27 },
    ];

    (apiFetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: async () => payload,
    });

    const result = await getSongs();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe("Flowers");
  });
});
