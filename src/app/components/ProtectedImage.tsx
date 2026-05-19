"use client";

import type { ImgHTMLAttributes } from "react";

export default function ProtectedImage({
  className = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className={`protected-image select-none ${className}`.trim()}
    />
  );
}
