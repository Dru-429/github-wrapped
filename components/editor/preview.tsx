"use client";

import { useEffect, useState } from "react";
import { ReadmeTemplate } from "./editor-state";
import BashStyle from "./templates/Bash";
import SystemInfo from "./templates/System";
import Yaml from "./templates/YAML";
// import DevTerminal from "./DevTerminal";
// import SystemInfo from "./SystemInfo";
// import type { ReadmeTemplate } from "./templateEditor";

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

  if (tpl === 1) {
    return(
        <SystemInfo
          templateObject={templateObject}
          handle={handle}
          repoName={repoName}
          stats={stats}
        />
    )
  }

  else if (tpl === 2) {
    return (
      <BashStyle
        templateObject={templateObject}
        name={name}
        role={role}
      />
    )
  }

  else if (tpl === 3){
    return(
      <Yaml
      templateObject={templateObject}
      name={name}
      role={role}
    />
    )
  }

  return (
    <div className="w-full">
      
    </div>
  );
}
