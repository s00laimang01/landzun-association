import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneIcon, CalendarIcon, Mail } from "lucide-react";
import { Section } from "./section";
import { members } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button";

export default function MembersSection() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMembers, setFilteredMembers] = useState<
    [string, typeof members][]
  >([]);
  const [visibleMembers, setVisibleMembers] = useState<number>(10);

  const groupedMembers = React.useMemo(() => {
    const groups = members.reduce((acc, member) => {
      if (!acc[member.activeFrom]) {
        acc[member.activeFrom] = [];
      }
      acc[member.activeFrom].push(member);
      return acc;
    }, {} as Record<string, typeof members>);

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  useEffect(() => {
    const filtered = groupedMembers.map(([year, yearMembers]) => [
      year,
      yearMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member?.position?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    ]);
    //@ts-ignore
    setFilteredMembers(filtered);
  }, [groupedMembers, searchTerm]);

  const handleShowMore = () => {
    setVisibleMembers((prev) => prev + 10);
  };

  return (
    <section
      id="members"
      className="bg-gradient-to-b pb-5 from-white to-gray-50"
    >
      <Section>
        <h2 className="text-4xl font-bold text-center mb-4">Our Members</h2>
        <p className="text-base text-center text-foreground opacity-45 mb-8">
          Meet the dedicated individuals who have shaped our community over the
          years. From past leaders to current contributors, each member has
          played a vital role in our growth and success.
        </p>

        <div className="mb-8">
          <Label htmlFor="search">Search Members</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name or position"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue={groupedMembers[4][0]} className="w-full">
          <TabsList className="flex flex-wrap justify-center w-fit mb-6">
            {groupedMembers.map(([year]) => (
              <TabsTrigger
                key={year}
                value={year}
                className="text-sm font-bold"
              >
                ({year})
              </TabsTrigger>
            ))}
          </TabsList>
          {filteredMembers.map(([year, yearMembers]) => (
            <TabsContent key={year} value={year}>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 mt-7 lg:grid-cols-3 gap-6"
                layout
              >
                <AnimatePresence>
                  {yearMembers.slice(0, visibleMembers).map((member, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden h-full">
                        <CardHeader className="p-0">
                          <Avatar className="w-full rounded-none md:h-[250px] h-[350px]">
                            <AvatarImage
                              className="rounded-none object-top"
                              src={
                                member.image ||
                                "/placeholder.svg?height=200&width=200"
                              }
                              alt={member.name}
                            />
                            <AvatarFallback className="rounded-none font-bold text-2xl">
                              {member.name[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </CardHeader>
                        <CardContent className="p-6">
                          <CardTitle className="text-xl font-semibold mb-2">
                            {member.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mb-2">
                            {member.position}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <span>{member.activeFrom}</span>
                          </div>
                          {member.phoneNumber && (
                            <div className="flex items-center text-sm text-gray-500">
                              <PhoneIcon className="w-4 h-4 mr-2 text-foreground" />
                              <span>{member.phoneNumber}</span>
                            </div>
                          )}
                          {member.email && (
                            <div className="flex items-center text-sm text-gray-500 gap-3 mt-1">
                              <Mail className="w-4 h-4 text-foreground" />
                              <span>{member.email}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              {yearMembers.length > visibleMembers && (
                <div className="flex justify-center mt-8">
                  <Button onClick={handleShowMore}>Show More</Button>
                </div>
              )}
              {yearMembers.length === 0 && (
                <p className="text-center text-gray-600 mt-8">
                  No members found matching the current search term.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Section>
    </section>
  );
}
