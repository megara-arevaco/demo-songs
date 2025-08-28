import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useSongs } from "./useSongs";
import { useInvoiceStore } from "../stores/invoiceStore";

vi.mock("../services/songs", () => {
  return {
    getSongs: vi.fn().mockResolvedValue([
      { id: 1, name: "Flowers", author: "Miley Cyrus", progress: 0.15 },
    ]),
  };
});

function Harness() {
  const { data, isLoading, handleIssueInvoice } = useSongs();
  if (isLoading) return <div>loading</div>;
  return (
    <div>
      <div>{data?.[0]?.name}</div>
      <button onClick={() => handleIssueInvoice(1)}>issue</button>
    </div>
  );
}

describe("useSongs hook", () => {
  beforeEach(() => {
    useInvoiceStore.setState({ invoiceRecords: [], invoiceStatuses: {} });
  });

  it("loads songs and issues invoice via store", async () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={qc}>
        <Harness />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Flowers")).toBeTruthy();

    fireEvent.click(screen.getByText("issue"));

    await waitFor(() => {
      const { invoiceStatuses } = useInvoiceStore.getState();
      expect(invoiceStatuses[1]).toBeDefined();
      expect(invoiceStatuses[1].progress).toBe(0.15);
    });
  });
});
