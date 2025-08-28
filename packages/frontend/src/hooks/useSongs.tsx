import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import type { Song } from "@demo-songs/schemas";
import { useInvoiceStore } from "../stores/invoiceStore";
import { getSongs } from "../services/songs";

type SongsQueryData = {
  list: Song[];
  byId: Map<number, Song>;
};

export function useSongs() {
  const { invoiceStatuses, issueInvoice } = useInvoiceStore(
    useShallow((state) => ({
      invoiceStatuses: state.invoiceStatuses,
      issueInvoice: state.issueInvoice,
    }))
  );

  const { data, isLoading, isError, error, status } = useQuery<
    Song[],
    unknown,
    SongsQueryData
  >({
    queryKey: ["songs"],
    queryFn: ({ signal }) => getSongs(signal),
    select: (songs) => ({
      list: songs,
      byId: new Map<number, Song>(songs.map((s) => [s.id, s])),
    }),
    retry: (count, e: any) =>
      e?.name !== "AbortError" && e?.code !== "ERR_CANCELED" && count < 3,
  });

  const handleIssueInvoice = useCallback(
    (songId: number) => {
      const song = data?.byId.get(songId);

      if (!song) {
        return;
      }

      issueInvoice(song.id, song.name, song.author, song.progress);
    },
    [data?.byId, issueInvoice]
  );

  return {
    data: data?.list ?? [],
    isLoading,
    isError,
    error: error as Error | null,
    status,
    handleIssueInvoice,
    invoiceStatuses,
  };
}
