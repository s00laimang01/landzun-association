import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { appConfigs, navLinks } from "@/lib/data";
import { Seal } from "./seal";
import { DonationDialog } from "./donation-dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <Seal className="h-9 w-9" />
          <span className="min-w-0">
            <span className="line-clamp-2 font-serif text-[15px] leading-tight sm:text-lg">
              {appConfigs.name}
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
              {appConfigs.town} · Est. {appConfigs.foundedYear}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
          <DonationDialog size="sm" className="ml-1 px-4">
            Donate
          </DonationDialog>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-background lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="container flex flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 font-serif text-xl last:border-0"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <DonationDialog className="w-full">Donate</DonationDialog>
          </div>
        </nav>
      </div>
    </header>
  );
}
