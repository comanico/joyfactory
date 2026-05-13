"use client";

import type { MouseEvent } from "react";
import { useFormStatus } from "react-dom";

export default function DeleteReservationButton(props: {
  label: string;
  confirmMessage: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (pending) {
      return;
    }

    if (!window.confirm(props.confirmMessage)) {
      event.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={pending}
      aria-label={props.label}
      title={props.label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="sr-only">{pending ? props.pendingLabel : props.label}</span>
      <span aria-hidden="true" className="text-lg font-bold leading-none">
        {pending ? "..." : "X"}
      </span>
    </button>
  );
}
