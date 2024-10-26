import { Img } from "react-image";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  appConfigs,
  grandPatronsOfTheAssociation,
  impacts,
  navLinks,
} from "@/lib/data";
import { MediaExpander } from "@/components/media-expander";
import Marquee from "@/components/ui/marquee";
import AboutUs from "@/components/about-us";
import MembersSection from "@/components/members";
import EventBanner from "@/components/event";
import { Footer } from "@/components/footer";
import { DonationDialog } from "@/components/donation-dialog";

export default function Home() {
  return (
    <div className="space-y-16 font-inter">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <nav className="flex flex-col md:flex-row justify-between items-center mb-16">
            <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
              {appConfigs.name}
            </Link>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              ))}
              <DonationDialog />
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <span className="text-green-500">🌱</span>
              <span className="text-blue-500">➔</span>
              <span>Growing-Together</span>
              <span className="text-blue-500">➔</span>
              <span className="text-green-500">🌳</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cultivating Connections,
              <br />
              Growing Stronger Communities!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We are the various person of Bida township, have resolved
              individually and collectively to form an association by name of{" "}
              <b>{appConfigs.name}</b>, for the purpose of promoting social,
              cultural understanding among its members, the Bida community and
              the Nigerian society in general do hereby give unto ourselves this
              constitution.
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-xs rounded-full"
              />
              <Button size="lg" className="rounded-full px-8">
                Join Now <span className="ml-2">➔</span>
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              <span className="text-green-500">★</span> Join our community and
              start making a difference today!
            </p>
          </div>

          {/* Image Carousel */}
          <h2 className="text-center text-5xl mb-8 opacity-30 font-bold">
            The Grand Patrons Of {appConfigs.name}
          </h2>
          <Carousel className="w-full">
            <CarouselContent>
              {grandPatronsOfTheAssociation.map((patron, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <MediaExpander {...patron}>
                    <Img
                      src={patron.src}
                      alt={`Community event image ${index + 1}`}
                      className="rounded-lg w-full h-[30rem] md:h-[25rem]"
                    />
                  </MediaExpander>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Community Impact */}

          <Marquee speed={40} pauseOnHover={true} className="[--duration:40s]">
            {impacts.concat(impacts).map((impact, index) => (
              <Button
                variant="outline"
                key={index}
                className="text-gray-600 text-sm m-2 rounded-2xl whitespace-nowrap"
              >
                {impact}
              </Button>
            ))}
          </Marquee>
        </div>
      </section>

      <AboutUs />
      <MembersSection />
      <EventBanner />
      <Footer />
    </div>
  );
}
