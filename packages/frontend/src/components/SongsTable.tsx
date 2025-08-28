import { useCallback } from "react";
import type { Song } from "@demo-songs/schemas";
import { useSongs } from "../hooks/useSongs";
import { formatDate } from "../libs/formatDate";
import { Empty, Error, Loading } from "./ui";

export function SongsTable() {
  const {
    data: songs,
    isLoading,
    error,
    isError,
    handleIssueInvoice,
    invoiceStatuses,
  } = useSongs();

  const onIssueClick = useCallback(
    (id: number) => () => {
      handleIssueInvoice(id);
    },
    [handleIssueInvoice]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error?.message as string} />;
  }

  if (!songs || songs.length === 0) {
    return <Empty message="No songs" />;
  }

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Songs Library</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Song Name</th>
                <th>Author</th>
                <th>Progress</th>
                <th>Actions</th>
                <th>Invoice Status</th>
              </tr>
            </thead>
            <tbody>
              {songs?.map((song: Song) => {
                const invoiceStatus = invoiceStatuses[song.id];

                return (
                  <tr key={song.id} className="hover">
                    <td className="font-mono">{song.id}</td>
                    <td className="font-semibold">{song.name}</td>
                    <td>{song.author}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress
                          className="progress progress-primary w-20"
                          value={song.progress * 100}
                          max="100"
                        ></progress>
                        <span className="text-sm font-medium">
                          {Math.round(song.progress * 100)}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={onIssueClick(song.id)}
                      >
                        Issue Invoice
                      </button>
                    </td>
                    <td>
                      {invoiceStatus ? (
                        <div className="text-xs">
                          <div className="text-success font-semibold">
                            Issued
                          </div>
                          <div className="text-gray-400">
                            {formatDate(invoiceStatus.issuedAt)}
                          </div>
                          <div className="text-gray-400">
                            Progress: {Math.round(invoiceStatus.progress * 100)}
                            %
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">
                          Not issued
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
