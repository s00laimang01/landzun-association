import { grandPatronsOfTheAssociation } from "@/lib/data";
import { MediaExpander } from "./media-expander";
import { Reveal, Section, SectionHeading } from "./section";

export function Patrons() {
  return (
    <Section id="patrons" className="py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Royal patronage"
          title="Grand Patrons of the association"
          lede="Since its founding, the association has been under the patronage of His Royal Highness the Etsu Nupe, Chairman of the Niger State Council of Traditional Rulers."
        />
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
        {grandPatronsOfTheAssociation.map((patron, i) => {
          // Notes are stored as newline-separated lines: honorific, name, title…
          const lines = patron.note
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
          const [honorific, name, ...titles] = lines;
          return (
            <Reveal key={patron.name} delay={i * 0.08}>
              <MediaExpander
                src={patron.src}
                aspect="4/5"
                name={name}
                note={[honorific, ...titles].join(", ")}
                hideCaption
                imgClassName="object-top"
              />
              <div className="mt-5 border-t border-border pt-5">
                <p className="eyebrow">{patron.name}</p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {honorific}
                  {titles.length > 0 && ` · ${titles.join(" ")}`}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
