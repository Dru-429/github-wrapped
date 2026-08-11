"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/landing_ui/Navbar";

/* ─────────────────────────── real previews ─────────────────────────── */


type Template = {
  no: number;
  file: string;
  label: string;
  blurb: string;
  Preview: string;
};

const TEMPLATES: Template[] = [
  {
    no: 1,
    file: "System.tsx",
    label: "neofetch",
    blurb: "ASCII portrait beside dotted-leader system rows.",
    Preview: "/banners/covers/SystemInfo.png",
  },
  {
    no: 2,
    file: "Bash.tsx",
    label: "prompt log",
    blurb: "Shell commands walk through bio, stack and socials.",
    Preview: "/banners/covers/Bash.png",
  },
  {
    no: 3,
    file: "YAML.tsx",
    label: "profile.yaml",
    blurb: "Keys and columns — a tidy, config-file portrait.",
    Preview: "/banners/covers/YAML.png",
  },
  {
    no: 4,
    file: "packageJSON.tsx",
    label: "manifest",
    blurb: "Your year in code, shipped as a package manifest.",
    Preview: "/banners/covers/JSON.png",
  },
];

/* ───────────────────────────── page ───────────────────────────── */

export default function SelectTemplatePage() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params?.username ?? "");

  const pick = (no: number) =>
    router.push(`/readme/${encodeURIComponent(username)}/${no}`);

  return (
    <main className="min-h-screen bg-cream bg-grid px-4 pb-8 pt-4 text-ink md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* top bar */}
        <Navbar />
        <div className="my-4 flex items-center justify-between ">
          <Link
            href="/"
            className="boxy rounded-sm bg-cream px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-transform hover:-translate-y-0.5 flex gap-2 justify-center items-center group" 
          >
            <span className="inline-block text-[13px] rotate-180 transition-transform duration-200 ease-out group-hover:translate-x-[-0.625rem]">
              →
            </span>
            <span className="group-hover:scale-105">
              Back
            </span>
          </Link>
          {/* <div className="boxy rounded-sm bg-nuit px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cream">
            <span className="text-lime">&gt;_</span>{" "}
            <span className="font-serif text-sm italic">
              {username || "—"}
            </span>
          </div> */}
        </div>

        {/* heading */}
        <header className="my-8 md:my-14 w-full text-center">
          <h1 className="font-serif text-4xl font-bold leading-[1.05] md:text-6xl">
            Pick a{" "}
            <span className="bg-nuit px-3 italic text-cream">terminal</span>{" "}
            readme
          </h1>
          <p className="mt-3 text-nuit">
            Add n remove any component. Choose one the best u feel and we&apos;ll wrap{" "}
            <span className="font-serif italic">@{username || "you"}</span>
            &apos;s year in code with it : )
          </p>
        </header>

        {/* template grid */}
        <div className="grid gap-6 md:grid-cols-2 ">
          {TEMPLATES.map(({ no, file, label, blurb, Preview }) => (
            <button
              key={no}
              type="button"
              onClick={() => pick(no)}
              className="boxy-xs group flex flex-col overflow-hidden rounded-sm bg-cream text-left transition-transform hover:-translate-y-1 focus:outline-none focus-visible:-translate-y-1 cursor-pointer hover:shadow-[6px_6px_0_var(--ink)]"
            >
              {/* window chrome */}
              <div className="flex items-center gap-2 border-b-2 border-ink bg-cream px-3 py-2 ">
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-lime" />
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-mantis" />
                <span className="ml-1 font-mono text-[10px] font-bold tracking-widest">
                  {file}
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ink/40">
                  {label}
                </span>
              </div>

              {/* real preview */}
              <div className="relative h-[338px] overflow-hidden border-b-2 border-ink">
                <Image
                  src={Preview}
                  alt={label}
                  height={350}
                  width={350}
                  className="w-full h-full object-  h-[350px] w-[350px]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>

              {/* meta */}
              <div className="flex items-center justify-between gap-4 px-4 py-3 cursor-pointer">
                <p className="text-xs text-ink/60">{blurb}</p>
                <span className="boxy inline-flex items-center gap-1 shrink-0 rounded-sm bg-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink transition-transform duration-200 ease-out group-hover:scale-105">
                  Use
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-2.5">
                    →
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
