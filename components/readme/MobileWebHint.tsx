"use client";

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

const MOBILE_MQ = "(max-width: 767px)";

export default function MobileWebHint() {
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!isMobile || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-web-hint-title"
    >
      <div className="boxy w-full max-w-sm bg-[var(--cream)] p-6 text-center shadow-[6px_6px_0_0_var(--ink)]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[var(--lime)]">
          <Monitor className="h-6 w-6 text-ink" aria-hidden />
        </div>
        <p
          id="mobile-web-hint-title"
          className="font-display text-xl font-bold leading-snug text-ink"
        >
          For better experience try on web
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="boxy-sm mt-6 w-full bg-[var(--nuit)] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[var(--cream)] transition-transform active:-translate-x-0.5 active:-translate-y-0.5"
        >
          OK
        </button>
      </div>
    </div>
  );
}
