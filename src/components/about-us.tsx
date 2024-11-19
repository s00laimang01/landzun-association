import { Img } from "react-image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Images from "@/lib/imports";
import { appConfigs } from "@/lib/data";
import { Section } from "./section";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { MediaExpander } from "./media-expander";

export default function AboutUs() {
  return (
    <section id="about-us" className="py-21">
      <Section>
        <h2 className="text-4xl font-bold text-center mb-8">
          About Our Community
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Img
              src={Images.LanzdunDevLogo}
              alt="Community gathering"
              width={600}
              className="rounded-lg shadow-lg -rotate-90"
            />
          </div>

          <div>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-fit grid-cols-3">
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="vision">Our Vision</TabsTrigger>
                <TabsTrigger value="profile">Our Profile</TabsTrigger>
              </TabsList>
              <TabsContent value="mission" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      Our mission is to promote social and cultural
                      understanding among our members, the Bida community, and
                      the wider Nigerian society. We believe that through unity
                      and collaboration, we can create a more harmonious and
                      prosperous community.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="vision" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                      Welcome to the <b>{appConfigs.name}</b>, a collective from
                      the vibrant Bida township. Founded to enhance our
                      society's social and cultural fabric, we celebrate Bida's
                      rich heritage through cultural events and educational
                      programs, ensuring our traditions are passed down. We
                      foster a sense of belonging and unity by organizing social
                      events that build strong relationships. Committed to
                      Bida's development, we focus on improving infrastructure,
                      education, healthcare, and other vital aspects of
                      community life. Recognizing education as a cornerstone, we
                      offer scholarships, mentorship, and support for students
                      and young professionals. Additionally, we promote health
                      and wellness through awareness programs, health camps, and
                      support for medical facilities.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="profile" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-2">Our Profile</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<h1>Profile of Landzun Development Association (LADA)</h1>
    
    <h2 class="font-bold text-xl">1.0 Overview</h2>
    <p>Landzun Development Association (LADA) is a Non-Governmental Organization formed by the indigenes of Bida Town and those who have the interest of the town at heart with the following purposes:</p>
    <ol>
        <li>To promote social, cultural, and economic integration among its members, the Bida community, and the Nigerian society in general.</li>
        <li>To foster unity and understanding amongst the members, Bida community, and other communities in the state and the country at large.</li>
        <li>To undertake self-help projects.</li>
    </ol>
    <p>The association was launched on 21st August 1982. It has not less than fourteen members serving as National Executive Committee (NEC) members who undertake the day-to-day running of the Association's activities. The NEC members are elected by the members during the convention/general assembly of the Association.</p>
    <p>The President or the Deputy President chairs the NEC meetings. Additionally, the Association has a Board of Trustees whose members are registered with the Corporate Affairs Commission. His Royal Highness, the Etsu Nupe, serves as the Grand Patron of the Association.</p>
    
    <h2 class="font-bold text-xl">2.0 Some Activities Undertaken by the Association</h2>
    <ol>
        <li>Constructed and equipped a health clinic at Bangaie ward, Bida.</li>
        <li>Supplied food provisions to patients admitted at Bida FMC/General Hospital.</li>
        <li>Appealed to various governments for the provision of development projects for the town and its environs.</li>
        <li>Embarked on social activities such as radio and television advocacy and sensitization on national programs (e.g., census and general election issues) and addressing social ills within the community.</li>
        <li>Established a functional, registered Cooperative Society.</li>
    </ol>
    
    <h2 class="font-bold text-xl">3.0 Address</h2>
    <p>The Association has secured a permanent site along Bangaie Road, Bida, to be developed as its National Secretariat and Headquarters. In the interim, the Headquarters is located at Banma, Kota Woro, Bida, Niger State.</p>`,
                      }}
                      className="text-gray-600"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-6 space-y-3">
          <h2 className="text-center font-bold text-2xl">
            This is part of Landzun River that passes across Bida town and from
            where the association got it's name.
          </h2>
          <div className="md:max-w-5xl m-auto w-full md:j">
            <Img
              src={Images.LandzunRiver}
              className="rounded-md w-full md:h-[40rem]"
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-8">What We Do</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Community Events",
                description:
                  "We organize regular events to bring our community together, fostering connections and celebrating our diversity.",
                icon: "🎉",
              },
              {
                title: "Education Programs",
                description:
                  "Our learning initiatives cater to all ages, promoting personal growth and skill development within the community.",
                icon: "📚",
              },
              {
                title: "Environmental Projects",
                description:
                  "We lead various eco-friendly projects to create a sustainable and green living environment for all residents.",
                icon: "🌱",
              },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Carousel
          className="w-full mt-10"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent className="w-full cursor-pointer">
            {[Images.Clinic, Images.Land].map((_, i) => (
              <CarouselItem className="md:basis-1 lg:basis-1/2" key={i}>
                <MediaExpander
                  src={_}
                  type="img"
                  name={
                    [
                      "SELF-HELP PROJECT:      THE CLINIC BUILT AND EQUIPPED BY LANDZUN  DEVELOPMENT ASSOCIATION AT BANGAIE, BIDA IN 1983.",
                      "Proposed site of National       Secretariat of LANDZUN DEVELOPMENT ASSOCIATION, BIDA.".toUpperCase(),
                    ][i]
                  }
                >
                  <Img
                    src={_}
                    alt={`Image-${i}`}
                    className="h-[25rem] w-full rounded-lg"
                  />
                </MediaExpander>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full">
            Join Our Community
          </Button>
        </div>
      </Section>
    </section>
  );
}
