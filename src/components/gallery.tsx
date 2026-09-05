import { ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "@/lib/imports";
import { MediaExpander, MediaItem } from "./media-expander";
import { Reveal, Section, SectionHeading } from "./section";
import { cn } from "@/lib/utils";

type Row = {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  items: MediaItem[];
  aspect?: string;
  basis?: string;
};

const archive: MediaItem[] = [
  { src: Image.ImagesOf1990One },
  {
    src: Image.ImagesOf1990Two,
    note: "From left: Alh. Mustapha Moh'd Babatifin, Dr. Abubakar Moh'd Yakatun, Alh. Ndako (Tipsy) and Alh. Musa Abdul.",
  },
  {
    src: Image.ImagesOf1990Three,
    note: "Hajiya Nnasha Ewanko with Alh. Magajin of Radio House, Bida.",
  },
  { src: Image.ImagesOf1990Four },
  {
    src: Image.ImagesOf1990Five,
    note: "From left: Alh. Bagudu Shettima Nupe with Ndasalawu, the Dogarin Etsu Nupe, Dr. Alh. Umaru Sanda Ndayako.",
  },
  { src: Image.ImagesOf1990Six },
  {
    src: Image.ImagesOf1990Eight,
    note: "Presentation of awards by HRH the Etsu Nupe, Dr. Alh. Umaru Sanda Ndayako, to Alh. Bagudu Shettima Nupe.",
  },
  { src: Image.ImagesOf1990Nine },
  { src: Image.ImagesOf1990Ten },
  { src: Image.ImagesOf1990Eleven },
  { src: Image.ImagesOf1990Twelve },
];

const anniversary: MediaItem[] = [
  Image.ImageOne,
  Image.ImageTwo,
  Image.ImageThree,
  Image.ImageFour,
  Image.ImageFive,
  Image.ImageSix,
  Image.ImageEight,
  Image.ImageNine,
  Image.ImageTen,
  Image.ImageEleven,
  Image.ImageTwelve,
  Image.ImageThirteen,
  Image.ImageFourteen,
  Image.ImageFifteen,
  Image.ImageSixteen,
  Image.ImageSeventeen,
  Image.ImageEighteen,
].map((src) => ({ src }));

const groupPhotoNote =
  "President Abdullahi N. Aliyu with other members of the association in a group photograph with His Royal Highness Alh. Dr. Umaru Sanda Ndayako during an award night at Federal Polytechnic, Bida.";

const inTheField: MediaItem[] = [
  { src: Image.President1 },
  {
    src: Image.President2,
    note: "Shaba Nupe Abdulmalik Ndayako and Prof. Sheikh Abdullahi seated during the award night at Federal Polytechnic, Bida.",
  },
  { src: Image.President4 },
  {
    src: Image.President6,
    note: "Dr Muhammad Daniya giving a speech during an award night at Federal Polytechnic, Bida.",
  },
  { src: Image.President7 },
  { src: Image.President8 },
  {
    src: Image.PresidentEtsu,
    note: "President Alh. Usman B. Ibrahim delivering his keynote address to His Royal Highness Alh. Dr. Yahaya Abubakar at the Wadata Palace, Bida.",
  },
  { src: Image.PresidentGroup, note: groupPhotoNote },
  {
    src: Image.PresidentMembers,
    note: "The President and other members of the association seated before the Emir at the Wadata Palace, Bida.",
  },
  {
    src: Image.PresidentEmir,
    note: "His Royal Highness Alh. Dr. Umaru Sanda Ndayako, CFR, Chairman of the Council of Traditional Rulers in Niger State, addressing Landzun members during an award night.",
  },
  {
    src: Image.PresidentColorFul,
    note: "Landzun members in colourful attire at the palace during a courtesy visit.",
  },
  { src: Image.PresidentMembers2, note: groupPhotoNote },
];

const government: MediaItem[] = [
  {
    src: Image.GovernorBago1,
    note: "Members of the association presenting the association's document to His Excellency the Executive Governor of Niger State, Alh. Mohammed Umaru Bago, during a courtesy visit.",
  },
  {
    src: Image.GovernorBago2,
    note: "Members of the association in conversation with His Excellency the Executive Governor of Niger State, Alh. Mohammed Umaru Bago, during a courtesy visit.",
  },
  {
    src: Image.FormerGovernorGroup,
    note: "Members of the association in a group photograph with the former Governor of Niger State, Dr. Mu'azu Babangida Aliyu (Talban Minna).",
  },
];

const firstPatronNote =
  "The First Patron, His Royal Highness the late Etsu Nupe Alh. (Dr) Umaru Sanda Ndayako, CFR, in interview and at Sallah celebrations.";

const firstPatron: MediaItem[] = [
  {
    src: Image.UmarSandaVideo,
    type: "vid",
    note: firstPatronNote,
    poster: "https://i.ibb.co/Dg3vgmV/Screenshot-2-11-2024-174813-localhost.jpg",
  },
  {
    src: Image.UmarSandaVideo2,
    type: "vid",
    note: firstPatronNote,
    poster: "https://i.ibb.co/nDs55B2/Screenshot-2-11-2024-174742-localhost.jpg",
  },
];

const secondPatron: MediaItem[] = [
  {
    src: Image.EtsuYahayaVideo,
    type: "vid",
    note: "The Etsu Nupe's talking drum and praises.",
    poster: "https://i.ibb.co/VxbXR7R/Screenshot-2-11-2024-174922-localhost.jpg",
  },
  {
    src: "https://i.ibb.co/3YZcs8r/etsu-nupe-installation.jpg",
    note: "The installation ceremony of HRH Alhaji Yahaya Abubakar, CFR, as the 13th Etsu Nupe, Bida, 21 September 2003.",
  },
  {
    src: Image.EtsuYahayaVideo2,
    type: "vid",
    note: "His Royal Highness the Etsu Nupe Alh. (Dr) Yahaya Abubakar, CFR, at Sallah celebrations.",
    poster: "https://i.ibb.co/s5jfxW8/Screenshot-2-11-2024-174954-localhost.jpg",
  },
  {
    src: Image.EtsuYahayaVideo3,
    type: "vid",
    note: "His Royal Highness the Etsu Nupe Alh. (Dr) Yahaya Abubakar, CFR, at Sallah celebrations.",
    poster: "https://i.ibb.co/T0DxW8Q/Screenshot-2-11-2024-175017-localhost.jpg",
  },
  {
    src: Image.SingingPraise,
    type: "vid",
    note: "Praise singing for His Royal Highness the Etsu Nupe, Alhaji Dr. Yahaya Abubakar, CFR.",
  },
];

const culture: MediaItem[] = [
  {
    src: Image.NupeCulture,
    type: "vid",
    poster: "https://i.ibb.co/WzGj9gd/Screenshot-2-11-2024-175040-localhost.jpg",
  },
  {
    src: Image.NupeGirlDancing,
    type: "vid",
    poster: "https://i.ibb.co/BZSQjs2/Screenshot-11-11-2024-7526-localhost.jpg",
  },
  { src: Image.NupeGirlDancing2, type: "vid" },
  { src: Image.NupeHistory, type: "vid", note: "A brief origin of the Nupe people." },
  {
    src: Image.BeautifulNupeGirl,
    type: "vid",
    note: "The traditional dress of a Nupe girl.",
  },
];

const tradition: MediaItem[] = [
  {
    src: Image.ArtOfNupe,
    type: "vid",
    poster: "https://i.ibb.co/V9YbVP6/Screenshot-2-11-2024-17519-localhost.jpg",
  },
  {
    src: Image.ArtOfNupe2,
    type: "vid",
    poster: "https://i.ibb.co/GRSDpDN/Screenshot-11-11-2024-74242-localhost.jpg",
  },
  { src: Image.Masaga, type: "vid" },
  {
    src: Image.SallahPrayer,
    type: "vid",
    note: "Sallah prayers at the Idi praying ground, Bida.",
  },
  { src: Image.SpecialReport, type: "vid" },
];

const rows: Row[] = [
  {
    eyebrow: "Archive",
    title: "From the early years",
    lede: "Photographs from the association's activities in the 1990s.",
    items: archive,
  },
  {
    eyebrow: "June 2024",
    title: "The 40th anniversary",
    lede: "General meeting and award of certificates of service to the executives, held at CABS, Niger State Polytechnic, Bida, on Saturday 29 June 2024.",
    items: anniversary,
  },
  {
    eyebrow: "Members",
    title: "The association at work",
    lede: "Award nights, courtesy visits and audiences with the Etsu Nupe.",
    items: inTheField,
  },
  {
    eyebrow: "Government",
    title: "With the Government of Niger State",
    items: government,
  },
  {
    eyebrow: "First Grand Patron",
    title: "HRH Alh. (Dr) Umaru Sanda Ndayako, CFR",
    items: firstPatron,
    aspect: "16/10",
    basis: "md:basis-1/2",
  },
  {
    eyebrow: "Second Grand Patron",
    title: "HRH Alh. (Dr) Yahaya Abubakar, CFR",
    items: secondPatron,
    aspect: "16/10",
    basis: "md:basis-1/2",
  },
  {
    eyebrow: "Culture",
    title: "Nupe cultural display",
    items: culture,
    aspect: "16/10",
    basis: "md:basis-1/2",
  },
  {
    eyebrow: "Culture",
    title: "Art and tradition of the Nupe",
    items: tradition,
    aspect: "16/10",
    basis: "md:basis-1/2",
  },
];

function GalleryRow({
  eyebrow,
  title,
  lede,
  items,
  aspect = "4/3",
  basis = "md:basis-1/2 lg:basis-1/3",
}: Row) {
  return (
    <Reveal>
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <SectionHeading
          as="h3"
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          aside={
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          }
        />
        <CarouselContent className="-ml-6 mt-8">
          {items.map((item, i) => (
            <CarouselItem key={i} className={cn("pl-6", basis)}>
              <MediaExpander {...item} aspect={aspect} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Reveal>
  );
}

export const Gallery = () => {
  return (
    <div id="gallery" className="border-y border-border bg-brand-paper-deep/60">
      <Section className="py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Gallery"
            title="Bida, in pictures and film"
            lede="Cultural celebrations, award nights, courtesy visits and the association's own history — as recorded by its members over four decades."
          />
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {rows.slice(0, 4).map((row) => (
            <GalleryRow key={row.title} {...row} />
          ))}

          <Reveal>
            <SectionHeading
              as="h3"
              eyebrow="Heritage"
              title="The history of Bida"
              lede="A documentary on the history of Bida, the home of the Nupe people and the community the association was founded to serve."
            />
            <div className="mt-8">
              <MediaExpander
                src={Image.HistoryOfBida}
                type="vid"
                name="The History of Bida"
                aspect="16/9"
                hideCaption
              />
            </div>
          </Reveal>

          {rows.slice(4).map((row) => (
            <GalleryRow key={row.title} {...row} />
          ))}
        </div>
      </Section>
    </div>
  );
};
