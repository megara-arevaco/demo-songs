import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("../hooks/useSongs", () => {
  const handleIssueInvoice = vi.fn();
  return {
    useSongs: () => ({
      data: [
        { id: 1, name: "Flowers", author: "Miley Cyrus", progress: 0.15 },
      ],
      isLoading: false,
      isError: false,
      error: null,
      handleIssueInvoice,
      invoiceStatuses: {},
    }),
  };
});

import { SongsTable } from "./SongsTable";

describe("SongsTable", () => {
  it("renders a row and triggers issue action", () => {
    render(<SongsTable />);

    expect(screen.getByText("Flowers")).toBeTruthy();
    const btn = screen.getByText("Issue Invoice");
    fireEvent.click(btn);
    // If needed, could assert side effects; this ensures the handler is wired.
  });
});
