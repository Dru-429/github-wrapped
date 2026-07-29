"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal } from "lucide-react";
import ImageUpload from "@/components/editor/ImageUpload";
import TemplateEditor from "@/components/editor/templateEditor";
import type { ReadmeTemplate } from "@/components/editor/editor-state";

/**
 * /readme/[username]/[template]
 *
 * Page combining ImageUpload and TemplateEditor for a specific username
 * and template number, adhering strictly to the wireframe layout and
 * Github Wrapped design system.
 */
export default function ReadmeTemplatePage() {
  const params = useParams<{ username: string; template: string }>();
  
  const rawUsername = params?.username ? decodeURIComponent(params.username) : "anonymous";
  const rawTemplate = params?.template ?? "1";
  const templateNo = parseInt(rawTemplate, 10) || 1;

  // Shared state for the template configuration and converted ASCII image
  const [template, setTemplate] = useState<ReadmeTemplate>({});

  return (
    <main className="min-h-screen bg-background bg-grid text-foreground">
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
            className="boxy-sm inline-flex items-center gap-2 bg-[var(--cream)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>back to templates</span>
          </Link>

          {/* Wireframe route indicator badge: /readme/[username]/[template] */}
          <div className="boxy-sm inline-flex items-center gap-2 bg-[var(--nuit)] px-4 py-2 font-mono text-xs font-bold tracking-wide text-[var(--cream)]">
            <Terminal className="h-4 w-4 text-[var(--lime)]" />
            <span>
              /readme/
              <span className="text-[var(--lime)]">{rawUsername}</span>/
              <span className="text-[var(--mantis)]">[{rawTemplate}]</span>
            </span>
          </div>
        </motion.div>

        {/* Main Content Area following wireframe vertical layout */}
        <div className="flex flex-col gap-8">
          {/* Top Box: Image Upload (Left: Upload controls, Right: Image preview) */}
          {
            templateNo == 1 ?
            (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ImageUpload setTemplateAction={setTemplate} />
              </motion.div>
            ): (
              ""
            )
          }

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