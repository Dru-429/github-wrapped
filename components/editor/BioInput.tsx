"use client";

import { useRef } from "react";
import { Sparkles, CornerDownLeft } from "lucide-react";

export const BIO_PROMPTS = [
  "🔭 I am ",
  "🌱 I am currently mastering ",
  "🎯 My goal is to ",
  "💡 Ask me about ",
];

type BioInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function BioInput({ value, onChange }: BioInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Find which prompt is the next unused one
  const getNextPrompt = () => {
    return BIO_PROMPTS.find((p) => !value.includes(p.trim())) ?? BIO_PROMPTS[0];
  };

  const insertPrompt = (prompt: string) => {
    let nextText = value;

    if (!nextText) {
      nextText = prompt;
    } else {
      if (!nextText.endsWith("\n")) {
        nextText += "\n";
      }
      nextText += prompt;
    }

    onChange(nextText);

    // Set cursor position after update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const len = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(len, len);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const nextPrompt = getNextPrompt();
      insertPrompt(nextPrompt);
    }
  };

  const autofillAll = () => {
    const lines: string[] = [];
    BIO_PROMPTS.forEach((prompt) => {
      const existingLine = value
        .split("\n")
        .find((l) => l.startsWith(prompt.trim()));
      if (existingLine) {
        lines.push(existingLine);
      } else {
        lines.push(prompt);
      }
    });
    onChange(lines.join("\n"));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Helper prompt pills */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="font-semibold text-muted-foreground mr-1">
          Insert placeholder:
        </span>
        {BIO_PROMPTS.map((prompt) => {
          const isUsed = value.includes(prompt.trim());
          return (
            <button
              key={prompt}
              type="button"
              onClick={() => insertPrompt(prompt)}
              className={`border-2 border-ink px-2 py-1 font-mono font-medium transition-all ${
                isUsed
                  ? "bg-cream text-muted-foreground opacity-60 line-through"
                  : "bg-cream hover:bg-lime text-ink"
              }`}
            >
              + {prompt.trim()}
            </button>
          );
        })}
        <button
          type="button"
          onClick={autofillAll}
          className="ml-auto inline-flex items-center gap-1 border-2 border-ink bg-lime px-2 py-1 font-mono text-xs font-bold text-ink hover:bg-mantis"
        >
          <Sparkles size={12} /> Auto-fill all
        </button>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`🔭 I am ...\n🌱 I am currently mastering ...\n🎯 My goal is to ...\n💡 Ask me about ...`}
          rows={6}
          className="w-full resize-y boxy-xs border-ink bg-cream p-3 font-mono text-xs text-ink outline-none placeholder:text-muted-foreground/60 leading-relaxed"
        />
        <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 italic">
            <CornerDownLeft size={12} /> Press <kbd className="border border-ink bg-cream px-1 font-mono font-bold text-ink">TAB</kbd> inside editor to auto-complete next line prompt
          </span>
          <span className="font-mono">{value.split("\n").filter(Boolean).length} lines</span>
        </div>
      </div>
    </div>
  );
}
