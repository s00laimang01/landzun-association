import { Suspense, lazy, useRef } from "react";
import { useInView } from "framer-motion";
import { ExternalLink, Navigation } from "lucide-react";
import { appConfigs } from "@/lib/data";
import { Reveal, Section, SectionHeading } from "./section";
import { Button } from "./ui/button";

// MapLibre is ~250 KB gzipped; only fetch it when the map is about to be seen.
const MapCanvas = lazy(() => import("./map-canvas"));

const { lat, lng, appleMapsUrl } = appConfigs.site;
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-paper-deep text-sm text-muted-foreground">
      Loading the map…
    </div>
  );
}

export function SiteMap() {
  const frame = useRef<HTMLDivElement>(null);
  const near = useInView(frame, { margin: "500px 0px", once: true });

  return (
    <Section id="site-map" className="py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="The secretariat site"
          title="Find the site on the map"
          lede={`The association's permanent site along ${appConfigs.permanentSite}, seen from above. Drag to look around; open it in your maps app for directions.`}
          aside={
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={appleMapsUrl} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  Apple Maps
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                  <ExternalLink />
                  Google Maps
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={directionsUrl} target="_blank" rel="noreferrer">
                  <Navigation />
                  Directions
                </a>
              </Button>
            </div>
          }
        />
      </Reveal>

      <Reveal className="mt-10 md:mt-14">
        <div
          ref={frame}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-brand-paper-deep md:aspect-[16/9]"
        >
          {near ? (
            <Suspense fallback={<Placeholder />}>
              <MapCanvas lat={lat} lng={lng} label="LADA plot" />
            </Suspense>
          ) : (
            <Placeholder />
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Drag to look around · scroll with Ctrl (or two fingers) to zoom ·
          drag with the right mouse button to tilt and rotate.
        </p>
      </Reveal>
    </Section>
  );
}
