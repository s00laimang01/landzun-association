import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

export const Section: FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn("container", className)} {...props}>
      {children}
    </section>
  );
};

/** Fades content up once as it enters the viewport. Deliberately subtle. */
export const Reveal: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

export const SectionHeading: FC<{
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
  /** Rendered to the right of the heading on wide screens (e.g. controls). */
  aside?: ReactNode;
}> = ({ eyebrow, title, lede, as: Tag = "h2", className, aside }) => (
  <div
    className={cn(
      "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
      className
    )}
  >
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag
        className={cn(
          "display",
          Tag === "h2" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
        )}
      >
        {title}
      </Tag>
      {lede && <div className="prose-lada mt-4 text-pretty">{lede}</div>}
    </div>
    {aside && <div className="shrink-0">{aside}</div>}
  </div>
);
