import { cn } from "@/lib/utils";
import React, { FC } from "react";

export const Text: FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn(className, "text-sm text-muted-foreground")}>
      {children}
    </div>
  );
};
