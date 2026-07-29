"use client";

import { useEffect, useState } from "react";
import { ReadmeTemplate } from "./editor-state";
import DevTerminal from "./templates/DevTerminal";
import SystemInfo from "./templates/SystemInfo";
// import DevTerminal from "./DevTerminal";
// import SystemInfo from "./SystemInfo";
// import type { ReadmeTemplate } from "./templateEditor";

/**
 * Preview — renders a README template based on the template number in the URL.
 *
 * Resolution order for the template number:
 *   1. `templateNo` prop (explicit override)
 *   2. Next.js dynamic route param `[temp]` or `[templateNo]`
 *      (e.g. /readme/[username]/[temp])
 *   3. `?t=` / `?template=` search param
 *   4. Defaults to 1
 *
 * Mapping:
 *   1 -> SystemInfo (neofetch-style)
 *   2 -> DevTerminal (bash-style)
 */
export default function Preview({
  templateObject,
  templateNo,
  handle,
  repoName,
  name,
  role,
  stats,
}: {
  templateObject: ReadmeTemplate & { image?: string };
  templateNo?: number;
  handle?: string;
  repoName?: string;
  name?: string;
  role?: string;
  stats?: React.ComponentProps<typeof SystemInfo>["stats"];
}) {
  // Read the template number from the URL on the client.
  // Works for both Next.js dynamic routes (/readme/[username]/[temp])
  // and query params (?t=1 / ?template=2).
  const [fromUrl, setFromUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const query = url.searchParams.get("t") ?? url.searchParams.get("template");
    // Last path segment: /readme/dhruv/2 -> "2"
    const segs = url.pathname.split("/").filter(Boolean);
    const last = segs[segs.length - 1];
    const fromPath = last && /^\d+$/.test(last) ? last : undefined;
    setFromUrl(query ?? fromPath ?? undefined);
  }, []);

  const resolved = Number(templateNo ?? fromUrl ?? 1);
  const tpl = Number.isFinite(resolved) && resolved > 0 ? resolved : 1;

  return (
    <div className="w-full">
      {tpl === 2 ? (
        <DevTerminal
          templateObject={templateObject}
          name={name}
          role={role}
        />
      ) : (
        <SystemInfo
          templateObject={templateObject}
          handle={handle}
          repoName={repoName}
          stats={stats}
        />
      )}
    </div>
  );
}
