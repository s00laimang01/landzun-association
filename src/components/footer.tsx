import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";
import { appConfigs, navLinks } from "@/lib/data";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full mb-8">
          <h2 className="text-4xl opacity-30 text-center font-bold">
            Quick Links
          </h2>
          <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:font-semibold transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">
                Join our association
              </h3>
              <p className="text-gray-600 mb-4">
                Become a part of our community and contribute to our shared
                goals. Join us in making a difference!
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="mr-2"
                aria-label="Email for association membership"
              />
              <Button>Join Now</Button>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {appConfigs.name}, Inc. All rights
              reserved.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={Facebook} label="Facebook" />
              <SocialIcon icon={Instagram} label="Instagram" />
              <SocialIcon icon={Twitter} label="Twitter" />
              <SocialIcon icon={Github} label="GitHub" />
              <SocialIcon icon={Youtube} label="YouTube" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href="#"
      className="text-gray-400 hover:text-gray-600"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}
