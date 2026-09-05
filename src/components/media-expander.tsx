import { FC, ReactNode, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  MorphContent,
  MorphDialog,
  MorphImage,
  MorphTrigger,
} from "./ui/morph-dialog";
import { cn } from "@/lib/utils";

export type MediaItem = {
  src: string;
  type?: "img" | "vid";
  name?: string;
  note?: string | ReactNode;
  poster?: string;
};

/**
 * A thumbnail that morphs into the full photo or video (shared layout).
 * Captions sit below the image rather than over it, so the photographs
 * stay legible.
 */
export const MediaExpander: FC<
  MediaItem & {
    /** Aspect ratio of the thumbnail box, e.g. "4/3". */
    aspect?: string;
    className?: string;
    /** Extra classes for the thumbnail image, e.g. "object-top". */
    imgClassName?: string;
    /** Keep the caption for the dialog only (when the page already shows it). */
    hideCaption?: boolean;
  }
> = ({
  type = "img",
  note,
  src,
  name,
  poster,
  aspect = "4/3",
  className,
  imgClassName,
  hideCaption = false,
}) => {
  const caption = name || note;
  const accessibleName =
    name || (typeof note === "string" ? note : undefined) || "Media";

  return (
    <MorphDialog>
      <figure className={cn("group", className)}>
        <MorphTrigger
          className="relative block w-full overflow-hidden bg-muted text-left"
          style={{ aspectRatio: aspect }}
          aria-label={`Open: ${accessibleName}`}
        >
          {type === "img" ? (
            <MorphImage
              src={src}
              alt=""
              loading="lazy"
              className={cn("h-full w-full object-cover", imgClassName)}
            />
          ) : (
            <InViewVideo src={src} poster={poster} />
          )}
          {type === "vid" && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </span>
            </span>
          )}
        </MorphTrigger>
        {caption && !hideCaption && (
          <figcaption className="mt-3 line-clamp-3 text-sm leading-snug text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      <MorphContent
        title={accessibleName}
        description={typeof note === "string" ? note : undefined}
        className="max-w-5xl"
      >
        <div className="flex min-h-0 items-center justify-center bg-brand-ink">
          {type === "img" ? (
            <MorphImage
              src={src}
              alt={name ?? ""}
              className="max-h-[70vh] w-auto max-w-full object-contain"
            />
          ) : (
            <video
              src={src}
              poster={poster || undefined}
              autoPlay
              controls
              playsInline
              className="max-h-[70vh] w-full"
            />
          )}
        </div>
        {caption && (
          <div className="space-y-1.5 px-6 pb-6 pt-5" aria-hidden="true">
            {name && <p className="font-serif text-xl leading-snug">{name}</p>}
            {note && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {note}
              </p>
            )}
          </div>
        )}
      </MorphContent>
    </MorphDialog>
  );
};

/**
 * Muted, looping preview that plays only while at least half of it is on
 * screen — so a page with twenty clips never streams more than the few in
 * view. Stays a still poster when the visitor prefers reduced motion.
 */
function InViewVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView && !reduceMotion) {
      video.play().catch(() => {
        /* autoplay refused (e.g. data saver) — the poster stays */
      });
    } else {
      video.pause();
    }
  }, [inView, reduceMotion]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster || undefined}
      preload="metadata"
      muted
      loop
      playsInline
      className="h-full w-full object-cover"
    />
  );
}
