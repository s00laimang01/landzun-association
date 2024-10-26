import { Img } from "react-image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Images from "@/lib/imports";
import { appConfigs } from "@/lib/data";
import { Section } from "./section";

export default function AboutUs() {
  return (
    <section id="about-us" className="py-21">
      <Section>
        <h2 className="text-4xl font-bold text-center mb-8">
          About Our Community
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Img
              src={Images.LanzdunDevLogo}
              alt="Community gathering"
              width={600}
              className="rounded-lg shadow-lg -rotate-90"
            />
          </div>

          <div>
            <Tabs defaultValue="vision" className="w-full">
              <TabsList className="grid w-fit grid-cols-3">
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="vision">Our Vision</TabsTrigger>
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
            </Tabs>
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

        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full">
            Join Our Community
          </Button>
        </div>
      </Section>
    </section>
  );
}
