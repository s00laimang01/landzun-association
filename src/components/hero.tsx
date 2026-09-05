import { ArrowDown } from "lucide-react";
import { appConfigs, grandPatronsOfTheAssociation, members } from "@/lib/data";
import Images from "@/lib/imports";
import { Section } from "./section";
import { Button } from "./ui/button";

const councilCount = new Set(members.map((m) => m.activeFrom)).size;
const yearsOfService = new Date().getFullYear() - appConfigs.foundedYear;

const facts = [
  { value: String(appConfigs.foundedYear), label: "Founded in Bida" },
  { value: String(yearsOfService), label: "Years of service" },
  { value: String(councilCount), label: "Executive councils" },
  {
    value: String(grandPatronsOfTheAssociation.length),
    label: "Grand Patrons, both Etsu Nupe",
  },
];

export function Hero() {
  return (
    <Section id="top" className="pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow mb-5 animate-fade-up">
            {appConfigs.town} · Est. {appConfigs.foundedOn}
          </p>
          <h1
            className="display animate-fade-up text-5xl leading-[1.02] md:text-7xl"
            style={{ animationDelay: "60ms" }}
          >
            The people of Bida,
            <br />
            working for Bida.
          </h1>
          <blockquote
            className="mt-8 max-w-xl animate-fade-up border-l-2 border-brand-red pl-5 font-serif text-lg italic leading-relaxed text-muted-foreground md:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            We, the various persons of Bida township, have resolved individually
            and collectively to form an association by the name of{" "}
            <span className="not-italic text-foreground">
              {appConfigs.name}
            </span>
            , for the purpose of promoting social and cultural understanding
            among its members, the Bida community and the Nigerian society in
            general.
            <footer className="mt-3 text-sm not-italic tracking-wide text-muted-foreground">
              — Preamble to the constitution
            </footer>
          </blockquote>
          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
            style={{ animationDelay: "180ms" }}
          >
            <Button size="lg" asChild>
              <a href="#contact">Become a member</a>
            </Button>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              Read our profile
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <figure className="lg:col-span-5">
          <div className="overflow-hidden rounded-sm bg-muted">
            <img
              src={Images.LandzunRiver}
              alt="The Landzun river passing through Bida"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-snug text-muted-foreground">
            The Landzun river as it passes through Bida. The association takes
            its name from it.
          </figcaption>
        </figure>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-x-8 border-t border-border md:mt-24 md:grid-cols-4">
        {facts.map((f) => (
          <div
            key={f.label}
            className="flex flex-col-reverse border-b border-border py-6 md:border-b-0"
          >
            <dt className="mt-1 text-sm text-muted-foreground">{f.label}</dt>
            <dd className="font-serif text-4xl md:text-5xl">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
