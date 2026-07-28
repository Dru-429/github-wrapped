import { useCallback, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Upload, X, Loader2 } from "lucide-react";
import type { ReadmeTemplate } from "./editor-state";


const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ASCII_WIDTH = 45; // characters per row
// dark → light; monospace chars are ~2x taller than wide, we compensate below.
const RAMP = "@%#*+=-:. ";

async function fileToDataURL(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

function imageToAscii(img: HTMLImageElement, width = ASCII_WIDTH): string {
  // Character aspect correction — a monospace glyph is roughly twice as tall
  // as it is wide, so we halve the vertical sample count to preserve 1:1.
  const height = Math.round(width * 0.5);

  // Center-crop to a square first.
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(img, sx, sy, side, side, 0, 0, width, height);

  const { data } = ctx.getImageData(0, 0, width, height);
  let out = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      // Perceived luminance (0-1). Transparent pixels read as background.
      const lum = a === 0 ? 1 : (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const idx = Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length));
      out += RAMP[idx];
    }
    out += "\n";
  }
  return out;
}

type ImageUploadProps = {
  setTemplateAction: Dispatch<SetStateAction<ReadmeTemplate>>;
};

export default function ImageUpload({ setTemplateAction }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ascii, setAscii] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  const process = useCallback(async (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("please pick an image file");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("image is larger than 10 MB");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await fileToDataURL(file);
      const img = await loadImage(dataUrl);
      const art = imageToAscii(img, ASCII_WIDTH);
      setPreview(dataUrl);
      setFileName(file.name);
      setAscii(art);
      // Store the final ascii string on the shared template object.
      setTemplateAction(current => ({ ...current, image: art }));
    } catch {
      setError("could not read that image");
    } finally {
      setBusy(false);
    }
  }, [setTemplateAction]);

  const onFiles = (files: FileList | null) => {
    if (files && files[0]) process(files[0]);
  };

  const clear = () => {
    setPreview(null);
    setAscii("");
    setFileName("");
    setError(null);
    setTemplateAction(current => {
      const next = { ...current };
      delete next.image;
      return next;
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="max-h-screen bg-background bg-grid boxy py-10">
      <div className="mx-auto max-w-6xl">
        <div className="boxy mb-6 flex items-center justify-between bg-cream px-4 py-3">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl font-bold text-ink">image → ascii</span>
            <span className="text-xs text-muted-foreground">up to 10&nbsp;MB · square crop · {ASCII_WIDTH} chars wide</span>
          </div>
          {preview && (
            <button
              onClick={clear}
              className="inline-flex items-center gap-1 border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase text-ink hover:bg-lime"
            >
              <X size={12} strokeWidth={3} /> reset
            </button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* -------- LEFT 60% : uploader -------- */}
          <section className="boxy-sm bg-cream p-4 md:col-span-3">
            <h3 className="font-display mb-3 text-xl font-bold text-ink lowercase">Upload</h3>

            <label
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                onFiles(e.dataTransfer.files);
              }}
              className={
                "relative flex min-h-[340px] cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed border-ink/60 p-6 text-center transition-colors " +
                (drag ? "bg-lime" : "bg-cream hover:bg-cream/70")
              }
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFiles(e.target.files)}
              />

              {busy ? (
                <>
                  <Loader2 className="animate-spin text-ink" size={28} />
                  <p className="font-display text-lg font-bold text-ink">converting…</p>
                </>
              ) : preview ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="boxy-sm bg-cream p-1">
                    <img
                      src={preview}
                      alt="upload preview"
                      className="h-40 w-40 object-cover"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                  </div>
                  <p className="max-w-[16rem] truncate text-sm font-medium text-ink">{fileName}</p>
                  <span className="border-2 border-ink bg-lime px-2 py-0.5 text-xs font-bold uppercase text-ink">
                    click to replace
                  </span>
                </div>
              ) : (
                <>
                  <div className="grid h-14 w-14 place-items-center border-2 border-ink bg-lime">
                    <Upload size={24} strokeWidth={3} className="text-ink" />
                  </div>
                  <p className="font-display text-2xl font-bold text-ink lowercase">
                    drop an image
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse · png, jpg, webp · max 10&nbsp;MB
                  </p>
                </>
              )}
            </label>

            {error && (
              <p className="mt-3 border-2 border-ink bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground">
                {error}
              </p>
            )}
          </section>

          {/* -------- RIGHT 40% : terminal preview -------- */}
          <section className="md:col-span-2 h-full">
            <motion.div
              layout
              className="boxy overflow-hidden bg-ink"
            >
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 border-b-2 border-ink bg-cream px-3 py-2">
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-destructive" />
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-lime" />
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-mantis" />
                <span className="ml-2 truncate text-xs font-semibold text-ink">
                  {fileName ? `${fileName} — ascii` : "preview.ascii"}
                </span>
              </div>

              <div className="max-h-[580px] min-h-[380px] overflow-auto p-3 flex flex-1 justify-center items-center">
                {ascii ? (
                  <pre
                    className="whitespace-pre font-mono text-[10px] leading-[10px] text-lime"
                    style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                  >
                    {ascii}
                  </pre>
                ) : (
                  <div className="grid h-full min-h-[300px] place-items-center text-center">
                    <div>
                      <p className="font-display text-xl font-bold text-cream lowercase">
                        no preview yet
                      </p>
                      <p className="mt-1 text-xs text-cream/60">
                        upload an image to see the ascii output here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {ascii && (
              <button
                onClick={() => clear()}
                className="mt-3 w-full border-2 border-ink bg-lime px-3 py-2 text-sm font-bold uppercase tracking-wide text-ink hover:bg-mantis"
              >
                Reset 
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
