import { memo } from "react";

interface Props {
  message: string;
}

function ErrorComponent({ message }: Props) {
  return (
    <div className="alert alert-error">
      <span>Error loading: {message}</span>
    </div>
  );
}

export const Error = memo(ErrorComponent);
