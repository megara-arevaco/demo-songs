import { describe, it, expect, beforeEach } from "vitest";
import { useInvoiceStore } from "./invoiceStore";

describe("invoiceStore", () => {
  beforeEach(() => {
    useInvoiceStore.setState({ invoiceRecords: [], invoiceStatuses: {} });
  });

  it("issues an invoice and updates records and statuses", () => {
    const { issueInvoice } = useInvoiceStore.getState();

    issueInvoice(1, "Flowers", "Miley Cyrus", 0.15);

    const { invoiceRecords, invoiceStatuses } = useInvoiceStore.getState();

    expect(invoiceRecords).toHaveLength(1);
    expect(invoiceRecords[0].songName).toBe("Flowers");
    expect(invoiceStatuses[1]).toBeDefined();
    expect(invoiceStatuses[1].progress).toBe(0.15);
    expect(invoiceStatuses[1].issuedAt).toBeInstanceOf(Date);
  });
});
