import { Mail, Phone } from "lucide-react";
import { appConfigs, members, navLinks } from "@/lib/data";
import { Seal } from "./seal";
import { DonationDialog } from "./donation-dialog";
import { Button } from "./ui/button";

// Membership enquiries go to the Secretary General of the serving council.
const tenures = [...new Set(members.map((m) => m.activeFrom))].sort();
const currentTenure = tenures[tenures.length - 1];
const secretary = members.find(
  (m) => m.activeFrom === currentTenure && /^sec\b.*gen/i.test(m.position)
);

export function Footer() {
  return (
    <footer id="contact">
      <div className="bg-brand-ink text-brand-paper">
        <div className="container grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <p className="eyebrow">Membership &amp; support</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">
              Membership is open to the indigenes of Bida and to those who have
              the interest of the town at heart.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 md:col-span-5">
            {secretary && (
              <div className="text-sm leading-relaxed text-brand-paper/70">
                <p>
                  To join, write to the Secretary General,{" "}
                  <span className="text-brand-paper">{secretary.name}</span>.
                </p>
                <ul className="mt-3 space-y-1.5">
                  {secretary.email && (
                    <li>
                      <a
                        href={`mailto:${secretary.email}`}
                        className="inline-flex items-center gap-2 hover:text-brand-paper"
                      >
                        <Mail className="h-4 w-4" />
                        {secretary.email}
                      </a>
                    </li>
                  )}
                  {secretary.phoneNumber && (
                    <li>
                      <a
                        href={`tel:${secretary.phoneNumber}`}
                        className="inline-flex items-center gap-2 hover:text-brand-paper"
                      >
                        <Phone className="h-4 w-4" />
                        {secretary.phoneNumber}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {secretary?.email && (
                <Button
                  size="lg"
                  asChild
                  className="bg-brand-paper text-brand-ink hover:bg-brand-paper/90"
                >
                  <a href={`mailto:${secretary.email}?subject=Membership enquiry`}>
                    Become a member
                  </a>
                </Button>
              )}
              <DonationDialog
                size="lg"
                variant="outline"
                className="border-brand-paper/30 bg-transparent text-brand-paper hover:bg-brand-paper/10 hover:text-brand-paper"
              >
                Donate to the association
              </DonationDialog>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Seal className="h-12 w-12" />
              <div>
                <p className="font-serif text-xl leading-tight">
                  {appConfigs.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Founded {appConfigs.foundedOn}, {appConfigs.town}
                </p>
              </div>
            </div>
            <p className="prose-lada mt-6 max-w-sm">
              A non-governmental association formed by the indigenes of Bida
              town for its social, cultural and economic development.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Headquarters</p>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Interim</dt>
                <dd>{appConfigs.interimAddress}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Permanent site</dt>
                <dd>{appConfigs.permanentSite}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {appConfigs.name}. All rights
              reserved.
            </p>
            <p>Bida, Niger State, Nigeria</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
