import { useInvoiceStore } from "../stores/invoiceStore";

export function useInvoiceHistory() {
  return useInvoiceStore((s) => s.invoiceRecords);
}
