// ui/components/images/ResolvedImage.tsx
"use client";

import { useEffect, useState } from "react";
import { activeCacheAdapter } from "@/_trash_here/cache/activeAdapter";

type Props = {
  uri?: string;
  className?: string;
  alt?: string;
};

export function ResolvedImage({ uri, className, alt = "" }: Props) {
  const [displayUri, setDisplayUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    let lastBlobUrl: string | undefined;

    async function run() {
      if (!uri) {
        setDisplayUri(undefined);
        return;
      }

      // Normal URLs work directly
      if (!uri.startsWith("idb://")) {
        setDisplayUri(uri);
        return;
      }

      const v = await activeCacheAdapter.get(uri);
      if (cancelled) return;

      const next = v?.uri;
      setDisplayUri(next);

      // Remember blob url for cleanup (adapter.get returns blob:)
      if (next?.startsWith("blob:")) lastBlobUrl = next;
    }

    run();

    return () => {
      cancelled = true;
      if (lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);
    };
  }, [uri]);

  if (!displayUri) return null;

  return <img src={displayUri} className={className} alt={alt} />;
}
