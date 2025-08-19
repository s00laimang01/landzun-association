import { appConfigs } from "@/lib/data";
import { Text } from "./Text";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Img } from "react-image";
import Autoplay from "embla-carousel-autoplay";
import Image from "@/lib/imports";
import { MediaExpander } from "./media-expander";
import { Section } from "./section";

const galleries = [
  { src: Image.ImageOne, type: "img" },
  { src: Image.ImageTwo, type: "img" },
  { src: Image.ImageThree, type: "img" },
  { src: Image.ImageFour, type: "img" },
  { src: Image.ImageFive, type: "img" },
  { src: Image.ImageSix, type: "img" },
  { src: Image.ImageEight, type: "img" },
  { src: Image.ImageNine, type: "img" },
  { src: Image.ImageTen, type: "img" },
  { src: Image.ImageEleven, type: "img" },
  { src: Image.ImageTwelve, type: "img" },
  { src: Image.ImageThirteen, type: "img" },
  { src: Image.ImageFourteen, type: "img" },
  { src: Image.ImageFifteen, type: "img" },
  { src: Image.ImageSixteen, type: "img" },
  { src: Image.ImageSeventeen, type: "img" },
  { src: Image.ImageEighteen, type: "img" },
];

const UmarSandaVideos = [
  {
    src: Image.UmarSandaVideo,
    note: `The First Patron, His Royal Highness, The Late Etsu Nupe Alh. (Dr) Umaru Sanda Ndayako CFR on his interview and sallah celebration`,
    poster:
      "https://i.ibb.co/Dg3vgmV/Screenshot-2-11-2024-174813-localhost.jpg",
  },
  {
    src: Image.UmarSandaVideo2,
    note: `The First Patron, His Royal Highness, The Late Etsu Nupe Alh. (Dr) Umaru Sanda Ndayako CFR on his interview and sallah celebration`,
    poster:
      "https://i.ibb.co/nDs55B2/Screenshot-2-11-2024-174742-localhost.jpg",
  },
];

const etsuYahayaVideos = [
  {
    src: Image.EtsuYahayaVideo,
    note: `The Etsu Nupe Talking Drum and Praises`,
    poster:
      "https://i.ibb.co/VxbXR7R/Screenshot-2-11-2024-174922-localhost.jpg",
  },
  {
    src: "https://i.ibb.co/3YZcs8r/etsu-nupe-installation.jpg",
    note: `The Installation ceremony of HRH Alhaji Yahaya Abubakar CFR as the 13th Etsu Nupe in Bida Niger state on 21st Sept. 2003.`,
    poster: "",
    type: "img",
  },
  {
    src: Image.EtsuYahayaVideo2,
    note: `His Royal Highness, The Etsu Nupe Alh. (Dr) Yahaya Abubakar CFR  on sallah celebration`,
    poster:
      "https://i.ibb.co/s5jfxW8/Screenshot-2-11-2024-174954-localhost.jpg",
  },
  {
    src: Image.EtsuYahayaVideo3,
    note: `His Royal Highness, The Etsu Nupe Alh. (Dr) Yahaya Abubakar CFR  on sallah celebration`,
    poster:
      "https://i.ibb.co/T0DxW8Q/Screenshot-2-11-2024-175017-localhost.jpg",
  },
  {
    src: Image.SingingPraise,
    note: `The praise singing singing of his royal highness Etsu Nupe Alhaji Dr. Yahaya Abubakar CGFR.`,
    poster: "",
  },
];

export const Gallery = () => {
  return (
    <Section className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center">Our Gallery</h1>
      <Text>
        Explore the heart of the <b>{appConfigs.name}</b> through our gallery.
        See Bida's rich heritage, community events, and development projects.
        Our photos capture cultural celebrations, educational programs, social
        gatherings, and health initiatives, showcasing our commitment to
        preserving traditions and fostering community spirit.
      </Text>
      <br />
      <div className="flex flex-col gap-5">
        <div>
          <Text className="font-semibold">
            Memories from the 40th Anniversary,General Meeting and Award of
            Certificate of Service to the Executives held at CABS, Niger State
            Polytechnic Bida, on Saturday, June 29th, 2024
          </Text>
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
          >
            <CarouselContent className="w-full cursor-pointer">
              {galleries.map((_, i) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i}>
                  <MediaExpander src={_.src} type={_.type as "img"}>
                    <Img
                      src={_.src}
                      alt={`Image-${i}`}
                      className="h-[600px] w-full"
                    />
                  </MediaExpander>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -ml-2" />
            <CarouselNext className="right-0 mr-0" />
          </Carousel>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-center">
            Some Pictures of {appConfigs.name} members.
          </h1>
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent className="w-full cursor-pointer">
              {[
                Image.President1,
                Image.President2,
                Image.President4,
                Image.President6,
                Image.President7,
                Image.President8,
                Image.PresidentEtsu,
                Image.PresidentGroup,
                Image.PresidentMembers,
                Image.PresidentEmir,
                Image.PresidentColorFul,
                Image.PresidentMembers2,
              ].map((_, i) => (
                <CarouselItem className="md:basis-1 lg:basis-1/2 mt-3" key={i}>
                  <MediaExpander
                    name={
                      [
                        "",
                        "Shaba Nupe Abdulmalik Ndayako and prof. Sheikh abdullah Sitted during the award night in federal polytecnic Bida.",
                        "",
                        "Dr Muhammad Daniya giving a speech during an award Night in federal polytecnic Bida.",
                        "",
                        "",
                        "President Alh. Usman B. Ibrahim delivery his keynote address to his Royal Highness Alh. Dr. Yahaya Abubakar in his wadata palace Bida.",
                        "President Abdullahi N. Aliyu with other members of the association in a group photograph with his Royal Highness Alh. Dr. Umaru Sanda Ndayako During and award night in federal polytecnic Bida.",
                        "President and other members of the association all sitted before the emir in his wadata palace Bida.",
                        //"",
                        "His Royal Highness Alh. Dr. Umaru Sanda Ndayako CFR and chairman of the traditional rulers in Niger State giving a speech to the landzun members during an award night",
                        "Landzun members in their colorful picture at the palace during their coutesy visit",
                        "President Abdullahi N. Aliyu with other members of the association in a group photograph with his Royal Highness Alh. Dr. Umaru Sanda Ndayako During and award night in federal polytecnic Bida.",
                      ][i]
                    }
                    src={_}
                    type="img"
                  >
                    <Img src={_} className="h-[25rem] w-full" />
                  </MediaExpander>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-center">
            The First Patron, His Royal Highness, The Late Etsu Nupe Alh. (Dr)
            Umaru Sanda Ndayako CFR
          </h1>
          <div className="flex items-center flex-col gap-4">
            <Carousel
              className="w-full"
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 2000 })]}
            >
              <CarouselContent className="w-full cursor-pointer">
                {UmarSandaVideos.map((_, i) => (
                  <CarouselItem className="md:basis-1 lg:basis-1/2" key={i}>
                    <MediaExpander src={_.src} type="vid">
                      <video
                        onPlay={() => {}}
                        src={_.src}
                        controls={false}
                        className="h-[25rem] w-full"
                        poster={_.poster}
                      />
                    </MediaExpander>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center">
            The Second Patron, His Royal Highness, The Etsu Nupe Alh. (Dr)
            Yahaya Abubakar CFR
          </h1>
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent className="w-full cursor-pointer">
              {etsuYahayaVideos.map((_, i) => (
                <CarouselItem className="md:basis-1 lg:basis-1/2" key={i}>
                  <MediaExpander src={_.src} type="vid" name={_.note}>
                    <video
                      onPlay={() => {}}
                      src={_.src}
                      controls={false}
                      className="h-[25rem] w-full"
                      poster={_.poster}
                    />
                  </MediaExpander>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center">
            The Cultural Display Of Nupe People
          </h1>
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 2400 })]}
          >
            <CarouselContent className="w-full cursor-pointer">
              {[
                Image.NupeCulture,
                Image.NupeGirlDancing,
                Image.NupeGirlDancing2,
                Image.NupeHistory,
                Image.BeautifulNupeGirl,
              ].map((_, i) => (
                <CarouselItem className="md:basis-1 lg:basis-1/2" key={i}>
                  <MediaExpander
                    name={
                      [
                        "",
                        "",
                        "",
                        "A brief origin of Nupe People",
                        "A Typical Nupe Girl Cultural Dressing",
                      ][i]
                    }
                    src={_}
                    type="vid"
                  >
                    <video
                      onPlay={() => {}}
                      src={_}
                      controls={false}
                      className="h-[25rem] w-full"
                      poster={
                        [
                          "https://i.ibb.co/WzGj9gd/Screenshot-2-11-2024-175040-localhost.jpg",
                          "https://i.ibb.co/BZSQjs2/Screenshot-11-11-2024-7526-localhost.jpg",
                          "",
                          "",
                          "",
                        ][i]
                      }
                    />
                  </MediaExpander>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center">
            The Art And Tradition Of Nupe People
          </h1>
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 2200 })]}
          >
            <CarouselContent className="w-full cursor-pointer">
              {[
                Image.ArtOfNupe,
                Image.ArtOfNupe2,
                Image.Masaga,
                Image.SallahPrayer,
                Image.SpecialReport,
              ].map((_, i) => (
                <CarouselItem className="md:basis-1 lg:basis-1/2" key={i}>
                  <MediaExpander
                    name={
                      [
                        "",
                        "",
                        "",
                        "Sallah prayers during sallah day at idi praying ground in Bida.",
                      ][i]
                    }
                    src={_}
                    type="vid"
                  >
                    <video
                      onPlay={() => {}}
                      src={_}
                      controls={false}
                      className="h-[25rem] w-full"
                      poster={
                        [
                          "https://i.ibb.co/V9YbVP6/Screenshot-2-11-2024-17519-localhost.jpg",
                          "https://i.ibb.co/GRSDpDN/Screenshot-11-11-2024-74242-localhost.jpg",
                          "",
                          "",
                          "",
                        ][i]
                      }
                    />
                  </MediaExpander>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};
