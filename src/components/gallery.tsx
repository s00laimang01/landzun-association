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

export const Gallery = () => {
  return (
    <Section className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center opacity-30">Our Gallery</h1>
      <Text>
        Explore the heart of the <b>{appConfigs.name}</b> through our gallery.
        See Bida's rich heritage, community events, and development projects.
        Our photos capture cultural celebrations, educational programs, social
        gatherings, and health initiatives, showcasing our commitment to
        preserving traditions and fostering community spirit.
      </Text>
      <br />
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
                  className="h-[25rem] w-full"
                />
              </MediaExpander>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -ml-2" />
        <CarouselNext className="right-0 mr-0" />
      </Carousel>
    </Section>
  );
};
