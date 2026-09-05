import { activities, appConfigs, purposes } from "@/lib/data";
import Images from "@/lib/imports";
import { MediaExpander } from "./media-expander";
import { Seal } from "./seal";
import { Reveal, Section, SectionHeading } from "./section";

const projects = [
  {
    src: Images.Clinic,
    name: "The clinic at Bangaie, Bida",
    note: "Self-help project: the health clinic built and equipped by the association at Bangaie ward, Bida, in 1983.",
  },
  {
    src: Images.Land,
    name: "Site of the National Secretariat",
    note: `The permanent site secured along ${appConfigs.permanentSite}, to be developed as the association's National Secretariat and headquarters.`,
  },
];

export default function AboutUs() {
  return (
    <div id="about" className="border-y border-border bg-brand-paper-deep/60">
      <Section className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <Seal className="mb-8 h-36 w-36" decorative={false} />
                <SectionHeading
                  eyebrow="Who we are"
                  title="A non-governmental association of the indigenes of Bida."
                />
                <p className="prose-lada mt-6">
                  Formed by the indigenes of Bida town and those who have the
                  interest of the town at heart, the {appConfigs.name} (
                  {appConfigs.shortName}) was launched on {appConfigs.foundedOn}
                  .
                </p>
              </Reveal>
            </div>
          </div>

          <div className="space-y-16 lg:col-span-8">
            <Reveal>
              <h3 className="eyebrow mb-6">Our purposes</h3>
              <ol className="divide-y divide-border border-y border-border">
                {purposes.map((p, i) => (
                  <li key={i} className="flex gap-6 py-5 md:gap-10">
                    <span className="font-serif text-2xl leading-none text-brand-red md:text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="prose-lada text-foreground">{p}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h3 className="eyebrow mb-6">How we are run</h3>
              <div className="prose-lada max-w-none">
                <p>
                  Not fewer than fourteen members serve on the National
                  Executive Committee, which undertakes the day-to-day running
                  of the association's activities. They are elected by the
                  members at the convention and general assembly, and the
                  President or Deputy President chairs their meetings.
                </p>
                <p>
                  The association also has a Board of Trustees registered with
                  the Corporate Affairs Commission. His Royal Highness the Etsu
                  Nupe serves as Grand Patron.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h3 className="eyebrow mb-6">What we have done</h3>
              <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {activities.map((a) => (
                  <li key={a.title} className="border-t border-border pt-4">
                    <h4 className="font-serif text-xl">{a.title}</h4>
                    <p className="prose-lada mt-2">{a.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <div className="grid gap-8 sm:grid-cols-2">
                {projects.map((p) => (
                  <MediaExpander key={p.name} {...p} />
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 className="eyebrow mb-6">Where to find us</h3>
              <dl className="grid gap-8 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted-foreground">
                    Interim headquarters
                  </dt>
                  <dd className="mt-1 font-serif text-xl">
                    {appConfigs.interimAddress}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">
                    Permanent site
                  </dt>
                  <dd className="mt-1 font-serif text-xl">
                    {appConfigs.permanentSite}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
