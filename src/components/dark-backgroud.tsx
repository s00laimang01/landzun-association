import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

export const Background: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div>
      <div
        className={cn(
          "relative isolate overflow-hidden bg-gray-900 p-3",
          className
        )}
      >
        {children}
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-white to-gray-100 opacity-30 polygon" />
        </div>
      </div>
    </div>
  );
};
