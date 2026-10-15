import { Play } from "lucide-react";
import Image from "@/lib/imports";
import { MediaExpander } from "./media-expander";
import { Reveal, Section, SectionHeading } from "./section";
import { Button } from "./ui/button";

const note =
  "A documentary on the history of Bida — the home of the Nupe people and the community the association was founded to serve.";

const nupeNote =
  "A telling of where the Nupe people came from, recited at the Nupe Day and Madu Yeshi celebration.";

/** Full-width feature for the History of Bida documentary, then the Nupe history recital. */
export function History() {
  return (
    <div
      id="history"
      className="bg-brand-ink text-brand-paper [&_.prose-lada]:text-brand-paper/70"
    >
      <Section className="py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Heritage"
            title="The history of Bida"
            lede={
              <>
                {note} It plays silently as you scroll; open it to watch with
                sound.
              </>
            }
          />
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <MediaExpander
            src={Image.HistoryOfBida}
            type="vid"
            name="The History of Bida"
            note={note}
            aspect="16/9"
            hideCaption
            className="mx-auto max-w-5xl"
            action={
              <Button
                size="lg"
                className="bg-brand-paper text-brand-ink hover:bg-brand-paper/90"
              >
                <Play className="fill-current" />
                Watch with sound
              </Button>
            }
          />
        </Reveal>

        <div className="mt-20 grid items-center gap-10 border-t border-brand-paper/15 pt-20 md:mt-28 md:grid-cols-[1fr_minmax(0,26rem)] md:gap-16 md:pt-28">
          <Reveal>
            <SectionHeading
              as="h3"
              eyebrow="Nupe Day & Madu Yeshi"
              title="The history of the Nupe people"
              lede={<>{nupeNote} Open it to watch with sound.</>}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <MediaExpander
              src={Image.NupeDayHistory}
              type="vid"
              name="The History of the Nupe People"
              note={nupeNote}
              aspect="1/1"
              hideCaption
              action={
                <Button
                  size="lg"
                  className="bg-brand-paper text-brand-ink hover:bg-brand-paper/90"
                >
                  <Play className="fill-current" />
                  Watch with sound
                </Button>
              }
            />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
