import { create } from "zustand";

export interface InvoiceRecord {
  id: string;
  songId: number;
  songName: string;
  author: string;
  progress: number;
  issuedAt: Date;
}

export interface InvoiceStatus {
  songId: number;
  issuedAt: Date;
  progress: number;
}

interface InvoiceStore {
  invoiceRecords: InvoiceRecord[];
  invoiceStatuses: Record<number, InvoiceStatus>;
  issueInvoice: (
    songId: number,
    songName: string,
    author: string,
    progress: number
  ) => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoiceRecords: [],
  invoiceStatuses: {},
  issueInvoice: (
    songId: number,
    songName: string,
    author: string,
    progress: number
  ) => {
    const now = new Date();
    const newRecord: InvoiceRecord = {
      id: `${songId}-${now.getTime()}`,
      songId,
      songName,
      author,
      progress,
      issuedAt: now,
    };

    const newStatus: InvoiceStatus = {
      songId,
      issuedAt: now,
      progress,
    };

    set((state) => ({
      invoiceRecords: [...state.invoiceRecords, newRecord],
      invoiceStatuses: {
        ...state.invoiceStatuses,
        [songId]: newStatus,
      },
    }));
  },
}));
