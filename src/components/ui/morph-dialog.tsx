import {
  ComponentProps,
  ReactNode,
  createContext,
  useContext,
  useId,
  useState,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A dialog whose trigger morphs into the panel (shared layout animation),
 * as in https://motion.dev/examples/react-modal-shared-layout.
 *
 * Radix owns the behaviour — focus trap, Escape, outside click, scroll lock,
 * aria wiring — and Motion owns the movement. With `prefers-reduced-motion`
 * the morph becomes a plain fade.
 */

// Apple-style spring: settles quickly, a hint of overshoot.
export const morphTransition: Transition = {
  type: "spring",
  duration: 0.5,
  bounce: 0.15,
};

const fadeTransition: Transition = { duration: 0.2, ease: [0.23, 1, 0.32, 1] };

type Ctx = {
  /** Base layoutId. Children derive their own as `${layoutId}-<part>`. */
  layoutId: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MorphContext = createContext<Ctx | null>(null);

export function useMorph() {
  const ctx = useContext(MorphContext);
  if (!ctx) throw new Error("useMorph must be used inside <MorphDialog>");
  return ctx;
}

export function MorphDialog({
  id,
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  /** Stable id shared by trigger and panel. Defaults to a generated one. */
  id?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const generated = useId();
  const [uncontrolled, setUncontrolled] = useState(false);
  const open = controlledOpen ?? uncontrolled;
  const setOpen = (v: boolean) => {
    setUncontrolled(v);
    onOpenChange?.(v);
  };
  const reduceMotion = useReducedMotion();
  const layoutId = reduceMotion ? undefined : `morph-${id ?? generated}`;

  return (
    <MorphContext.Provider value={{ layoutId, open, setOpen }}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
      </DialogPrimitive.Root>
    </MorphContext.Provider>
  );
}

type MotionButtonProps = ComponentProps<typeof motion.button>;

/** The element that morphs into the panel. Renders a real button. */
export function MorphTrigger({
  className,
  style,
  children,
  ...props
}: MotionButtonProps) {
  const { layoutId } = useMorph();
  return (
    <DialogPrimitive.Trigger asChild>
      <motion.button
        type="button"
        layoutId={layoutId}
        transition={morphTransition}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        // Inline radius lets Motion correct it during the morph.
        style={{ borderRadius: 4, ...style }}
        {...props}
      >
        {children}
      </motion.button>
    </DialogPrimitive.Trigger>
  );
}

/** Shared-layout media: the thumbnail image that becomes the full image. */
export function MorphImage({
  part = "media",
  ...props
}: ComponentProps<typeof motion.img> & { part?: string }) {
  const { layoutId } = useMorph();
  return (
    <motion.img
      layoutId={layoutId ? `${layoutId}-${part}` : undefined}
      transition={morphTransition}
      {...props}
    />
  );
}

export function MorphContent({
  title,
  description,
  className,
  children,
}: {
  /** Accessible name for the dialog. Render the visible heading in children. */
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  const { layoutId, open } = useMorph();

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-ink/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
            />
          </DialogPrimitive.Overlay>

          {/* Centring wrapper; pointer-events pass through to the overlay. */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                layoutId={layoutId}
                transition={morphTransition}
                // Fallback fade for reduced motion (no layoutId to morph).
                initial={layoutId ? undefined : { opacity: 0 }}
                animate={layoutId ? undefined : { opacity: 1 }}
                exit={layoutId ? undefined : { opacity: 0 }}
                className={cn(
                  "pointer-events-auto relative flex max-h-full w-full flex-col overflow-hidden bg-background shadow-2xl focus:outline-none",
                  className
                )}
                style={{ borderRadius: 4 }}
              >
                <DialogPrimitive.Title className="sr-only">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  {description ?? title}
                </DialogPrimitive.Description>

                {children}

                <DialogPrimitive.Close
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close"
                >
                  <Cross2Icon className="h-4 w-4" />
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}
