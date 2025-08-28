import { memo } from "react";

interface Props {
  message: string;
}

export function EmptyComponent({ message }: Props) {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400">{message}</div>
    </div>
  );
}

export const Empty = memo(EmptyComponent);
