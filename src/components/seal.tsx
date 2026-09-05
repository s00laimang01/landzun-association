import { FC } from "react";
import Images from "@/lib/imports";
import { appConfigs } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * The association's seal, cropped to its outer ring so the grey card it was
 * photographed on does not show. Size it with h-/w- classes.
 */
export const Seal: FC<{ className?: string; decorative?: boolean }> = ({
  className,
  decorative = true,
}) => (
  <span
    className={cn(
      "block shrink-0 overflow-hidden rounded-full bg-brand-paper",
      className
    )}
  >
    <img
      src={Images.LanzdunDevLogo}
      alt={decorative ? "" : `Seal of the ${appConfigs.name}`}
      className="h-full w-full scale-[1.16] object-cover object-[52%_50%] mix-blend-multiply"
    />
  </span>
);
