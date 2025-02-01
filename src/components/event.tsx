import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, CheckCircle } from "lucide-react";
import { Background } from "./dark-backgroud";
import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { appConfigs } from "@/lib/data";

// Custom hook for countdown logic
const useCountdown = (targetDate: string) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return timeLeft;
};

export default function EventBanner() {
  const eventDate = "2025-02-08T10:00:00";
  const timeLeft = useCountdown(eventDate);
  const isEventOver = Object.keys(timeLeft).length === 0;

  const eventDetails = {
    title: "Meeting",
    date: "November 3, 2024",
    location: `${appConfigs.name} President Resident Bida`,
  };

  return (
    <Section
      id="events"
      className="w-full flex flex-col items-center justify-center py-10 md:py-12 p-3"
    >
      <h2 className="text-4xl opacity-30 font-bold mb-4">Upcoming Event</h2>
      <Card className="w-full max-w-4xl overflow-hidden">
        <CardContent className="p-0">
          <Background className="relative h-96 sm:h-[28rem] overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-white p-6 text-center">
              <AnimatePresence>
                {isEventOver ? (
                  <motion.div
                    key="event-over"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                      Event Completed
                    </h1>
                    <p className="text-xl mb-6">
                      Thank you for your interest in our event!
                    </p>
                    <Button variant="outline" size="lg">
                      View Event Highlights
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="event-countdown"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <motion.h1
                      className="text-4xl sm:text-6xl font-bold mb-4"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {eventDetails.title}
                    </motion.h1>

                    <motion.div
                      className="flex items-center mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <CalendarDays className="mr-2" />
                      <span>{eventDetails.date}</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <MapPin className="mr-2" />
                      <span>{eventDetails.location}</span>
                    </motion.div>

                    {/* Countdown */}
                    <motion.div
                      className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {Object.entries(timeLeft).map(([unit, value]) => (
                        <div
                          key={unit}
                          className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm"
                        >
                          <div className="text-3xl sm:text-4xl font-bold">
                            {value}
                          </div>
                          <div className="text-sm uppercase">{unit}</div>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Background>
        </CardContent>
      </Card>
    </Section>
  );
}
