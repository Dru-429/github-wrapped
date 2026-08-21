"use client";

import { useState } from "react";
import { Copy as CopyIcon, Check } from "lucide-react";
import { toBlob } from "html-to-image";

export type CopyNode =
  | React.RefObject<HTMLDivElement | null>
  | (() => HTMLElement | null);

type CopyProps = {
  node: CopyNode;
  className?: string;
  title?: string;
};

export const Copy = ({ node, className, title }: CopyProps) => {
  const [copied, setCopied] = useState(false);

  const getNode = () =>
    typeof node === "function" ? node() : node?.current;

  const copy = async () => {
    const el = getNode();
    if (!el) return;
    try {
      await document.fonts.ready;
      const blob = await toBlob(el, { pixelRatio: 2, cacheBust: true });
      if (!blob) return;
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={className}
      aria-label="Copy as image"
      title={title ?? (copied ? "Copied as image!" : "Copy as image")}
    >
      {copied ? <Check size={14} /> : <CopyIcon size={14} />}
    </button>
  );
};

export default Copy;