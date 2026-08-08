"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Terminal,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import ImageUpload from "@/components/editor/sections/ImageUpload";
import Selected from "@/components/editor/sections/Selected";
import TemplateEditor from "@/components/editor/templateEditor";
import { type ReadmeTemplate } from "@/components/editor/editor-state";
import handleFetchGitHubData from "@/lib/github_readme";

export default function ReadmeTemplatePage() {
  const params = useParams<{ username: string; template: string }>();

  const rawUsername = params?.username
    ? decodeURIComponent(params.username)
    : "anonymous";
  const rawTemplate = params?.template ?? "1";
  const initialTemplateNo = parseInt(rawTemplate, 10) || 1;

  // Mutable template number – starts from the URL but can be changed via the selector
  const [templateNo, setTemplateNo] = useState(initialTemplateNo);

  // Shared state for the template configuration and converted ASCII image
  const [template, setTemplate] = useState<ReadmeTemplate>({});

  // Loading and feedback states for GitHub fetch feature
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!successMsg && !errorMsg) return;

    const timer = setTimeout(() => {
      setSuccessMsg(null);
      setErrorMsg(null);
    }, 6000);

    return () => clearTimeout(timer);
  }, [successMsg, errorMsg]);


  return (
    <main className="relative min-h-screen bg-background bg-grid text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        {/* Top Header Row / Navigation matching wireframe route title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <Link
            href={`/readme/${encodeURIComponent(rawUsername)}`}
            className="boxy rounded-sm bg-cream px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-transform hover:-translate-y-0.5 flex gap-2 justify-center items-center group"
          >
            <span className="inline-block text-[13px] rotate-180 transition-transform duration-200 ease-out group-hover:translate-x-[-0.625rem]">
              →
            </span>
            <span className="group-hover:scale-105">
              Back
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* Fetch Button */}
            <button
              onClick={() =>
                handleFetchGitHubData(
                  rawUsername,
                  setLoading,
                  setErrorMsg,
                  setSuccessMsg,
                  setTemplate
                )
              }
              disabled={loading}
              className="boxy-sm inline-flex items-center gap-2 bg-[var(--lime)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[var(--mantis)] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-ink" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 text-ink" />
                  <span>Fetch GitHub Details</span>
                </>
              )}
            </button>

            {/* Wireframe route indicator badge: /readme/[username]/[template] */}
            <div className="boxy-sm inline-flex items-center gap-2 bg-[var(--nuit)] px-4 py-2 font-mono text-xs font-bold tracking-wide text-[var(--cream)]">
              <Terminal className="h-4 w-4 text-[var(--lime)]" />
              <span>
                /readme/
                <span className="text-[var(--lime)]">{rawUsername}</span>/
                <span className="text-[var(--mantis)]">[{rawTemplate}]</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Status Feedback Alerts */}
        {(successMsg || errorMsg) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`boxy-sm absolute top-5 right-3 max-w-2xl wrap-normal flex items-center justify-between gap-7 px-5 py-2.5 text font-semibold ${successMsg
              ? "bg-[var(--lime)] text-ink"
              : "bg-destructive text-destructive-foreground"
              }`}
          >
            <span className="flex items-center gap-2">
              {successMsg ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}

              {successMsg ? successMsg : errorMsg}
            </span>

            <button
              onClick={() =>
                successMsg ? setSuccessMsg(null) : setErrorMsg(null)
              }
              className="font-mono text-sm font-black hover:opacity-75"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Main Content Area following wireframe vertical layout */}
        <div className="flex flex-col gap-8">
          {/* Template Selector */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Selected templateNo={templateNo} setTemplateNo={setTemplateNo} />
          </motion.div>

          {/* Top Box: Image Upload (Left: Upload controls, Right: Image preview) */}
          {templateNo === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ImageUpload setTemplateAction={setTemplate} />
            </motion.div>
          ) : null}

          {/* Bottom Box: Template Editor (Header: Edit | Preview + COPY, Content: Section Editor / Preview) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TemplateEditor
              template={template}
              setTemplateAction={setTemplate}
              username={rawUsername}
              templateNo={templateNo}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}