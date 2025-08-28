import { InvoiceHistory } from "./InvoiceHistory";
import { SongsTable } from "./SongsTable";

export function App() {
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Demo songs neeen
          </h1>
        </div>
        <div className="space-y-8">
          <SongsTable />
          <InvoiceHistory />
        </div>
      </div>
    </div>
  );
}
