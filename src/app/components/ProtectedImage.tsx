"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";

type ProtectedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Load immediately (hero / above-the-fold). Default: lazy. */
  priority?: boolean;
};

export default function ProtectedImage({
  className = "",
  priority = false,
  loading,
  fetchPriority,
  onLoad,
  onError,
  src,
  alt = "",
  ...props
}: ProtectedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);

    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(event);
    },
    [onLoad],
  );

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setFailed(true);
      onError?.(event);
    },
    [onError],
  );

  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedFetchPriority =
    fetchPriority ?? (priority ? "high" : undefined);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      {...props}
      src={src}
      alt={alt}
      draggable={false}
      loading={resolvedLoading}
      decoding="async"
      fetchPriority={resolvedFetchPriority}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onLoad={handleLoad}
      onError={handleError}
      className={[
        "protected-image select-none bg-surface-container transition-opacity duration-500 ease-out",
        loaded && !failed ? "opacity-100" : "opacity-0",
        failed ? "opacity-40" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
