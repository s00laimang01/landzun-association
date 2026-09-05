import { CalendarDays, MapPin } from "lucide-react";
import { events } from "@/lib/data";
import { Reveal, Section, SectionHeading } from "./section";

const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function EventBanner() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = sorted.filter((e) => new Date(e.date) >= today).reverse();
  const past = sorted.filter((e) => new Date(e.date) < today);

  return (
    <Section id="events" className="py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading
              eyebrow="Meetings & events"
              title="Where the association gathers"
              lede={
                upcoming.length === 0
                  ? "There are no announced upcoming events at the moment. Members are notified of meetings directly."
                  : "Upcoming meetings are listed first. Members are notified directly of any change."
              }
            />
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <ol className="divide-y divide-border border-y border-border">
              {[...upcoming, ...past].map((e) => {
                const d = new Date(e.date);
                const isUpcoming = d >= today;
                return (
                  <li
                    key={e.title + e.date}
                    className="grid gap-4 py-6 sm:grid-cols-[7rem_1fr] sm:gap-8"
                  >
                    <div>
                      <p className="font-serif text-4xl leading-none">
                        {d.getDate()}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {d.toLocaleDateString("en-GB", { month: "short" })}{" "}
                        {d.getFullYear()}
                      </p>
                      {isUpcoming && <p className="eyebrow mt-2">Upcoming</p>}
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl leading-snug">
                        {e.title}
                      </h3>
                      <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {fmt.format(d)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {e.location}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
