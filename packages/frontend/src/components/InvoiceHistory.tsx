import { useMemo } from "react";
import { formatDate } from "../libs/formatDate";
import { useInvoiceHistory } from "../hooks";

export function InvoiceHistory() {
  const invoiceRecords = useInvoiceHistory();

  const sortedRecords = useMemo(() => {
    return [...invoiceRecords].sort(
      (a, b) => b.issuedAt.getTime() - a.issuedAt.getTime()
    );
  }, [invoiceRecords]);

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-2xl">Invoice History</h2>
          {invoiceRecords.length > 0 && (
            <div className="badge badge-primary badge-lg">
              Total: {invoiceRecords.length}
            </div>
          )}
        </div>

        {invoiceRecords.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400">No invoices issued yet</div>
            <div className="text-sm text-gray-300 mt-2">
              Click "Issue Invoice" on any song
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedRecords.map((record) => (
              <div
                key={record.id}
                className="border border-base-300 rounded-lg p-4 hover:bg-base-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-primary badge-sm">
                        #{record.songId}
                      </span>
                      <h3 className="font-semibold text-lg">
                        {record.songName}
                      </h3>
                    </div>

                    <div className="text-gray-600 mb-1">
                      <span className="font-medium">Artist:</span>{" "}
                      {record.author}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        <span className="font-medium">Progress:</span>{" "}
                        {Math.round(record.progress * 100)}%
                      </span>
                      <span>
                        <span className="font-medium">Issued:</span>{" "}
                        {formatDate(record.issuedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className="radial-progress text-primary text-sm"
                      style={
                        {
                          "--value": record.progress * 100,
                          "--size": "2.5rem",
                          "--thickness": "3px",
                        } as React.CSSProperties
                      }
                    >
                      <span className="text-xs font-bold">
                        {Math.round(record.progress * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
