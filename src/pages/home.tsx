import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { History } from "@/components/history";
import AboutUs from "@/components/about-us";
import { Patrons } from "@/components/patrons";
import MembersSection from "@/components/members";
import { Gallery } from "@/components/gallery";
import EventBanner from "@/components/event";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <History />
        <AboutUs />
        <Patrons />
        <MembersSection />
        <Gallery />
        <EventBanner />
      </main>
      <Footer />
    </>
  );
}
