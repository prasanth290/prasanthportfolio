"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ textToCopy, label = "Copy" }: { textToCopy: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy error:", e);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-medium transition-colors inline-flex items-center gap-1"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-emerald-400" />
          <span className="text-emerald-300">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 text-amber-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
