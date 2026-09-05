import { useMemo, useState } from "react";
import { Mail, Phone, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { members } from "@/lib/data";
import { Reveal, Section, SectionHeading } from "./section";

type Member = (typeof members)[number];

const PAGE = 12;

// Some records carry placeholder numbers; only show values that look real.
const isPhone = (v?: string) =>
  !!v && /^[+\d][\d\s-]{6,}$/.test(v) && v !== "123-456-7890";

export default function MembersSection() {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);

  const councils = useMemo(() => {
    const groups = new Map<string, Member[]>();
    for (const m of members) {
      const list = groups.get(m.activeFrom) ?? [];
      list.push(m);
      groups.set(m.activeFrom, list);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const current = councils[councils.length - 1][0];
  const q = query.trim().toLowerCase();
  const matches = (m: Member) =>
    !q ||
    m.name.toLowerCase().includes(q) ||
    m.position?.toLowerCase().includes(q);

  return (
    <Section id="executives" className="py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="The Executive Council"
          title="Those who have served"
          lede="Elected by the general assembly, the National Executive Committee runs the day-to-day affairs of the association. Every council since 1982 is recorded here."
        />
      </Reveal>

      <Tabs
        defaultValue={current}
        className="mt-12"
        onValueChange={() => setVisible(PAGE)}
      >
        <div className="flex flex-col gap-4 border-b border-border md:flex-row md:items-end md:justify-between">
          <TabsList className="no-scrollbar h-auto w-full justify-start gap-6 overflow-x-auto rounded-none bg-transparent p-0 md:w-auto">
            {councils.map(([tenure]) => (
              <TabsTrigger
                key={tenure}
                value={tenure}
                className="-mb-px rounded-none border-b-2 border-transparent px-0 pb-3 font-serif text-lg text-muted-foreground data-[state=active]:border-brand-red data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                {tenure}
              </TabsTrigger>
            ))}
          </TabsList>
          <label className="relative mb-3 block md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE);
              }}
              placeholder="Search by name or office"
              className="bg-background pl-9"
              aria-label="Search executives"
            />
          </label>
        </div>

        {councils.map(([tenure, list]) => {
          const shown = list.filter(matches);
          return (
            <TabsContent key={tenure} value={tenure} className="mt-10">
              {shown.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">
                  No one in the {tenure} council matches “{query}”.
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                  {shown.slice(0, visible).map((m, i) => (
                    <MemberCard key={`${tenure}-${i}`} member={m} />
                  ))}
                </ul>
              )}
              {shown.length > visible && (
                <div className="mt-12 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisible((v) => v + PAGE)}
                  >
                    Show more ({shown.length - visible} remaining)
                  </Button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </Section>
  );
}

function MemberCard({ member }: { member: Member }) {
  const initials = member.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const phone = isPhone(member.phoneNumber) ? member.phoneNumber : undefined;

  return (
    <li>
      <Avatar className="aspect-[3/4] h-auto w-full rounded-sm bg-muted">
        <AvatarImage
          src={member.image || undefined}
          alt={member.name}
          className="aspect-auto object-cover object-top"
        />
        <AvatarFallback className="rounded-sm bg-muted font-serif text-3xl text-muted-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="mt-4">
        <p className="eyebrow">{member.position}</p>
        <h3 className="mt-1 font-serif text-xl leading-snug">{member.name}</h3>
        {(phone || member.email) && (
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {phone && (
              <li>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {phone}
                </a>
              </li>
            )}
            {member.email && (
              <li>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 break-all hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {member.email}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </li>
  );
}
