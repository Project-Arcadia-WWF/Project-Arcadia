
import { Card } from "@/components/ui/card";
import { Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const teamMembers = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Conservation Director",
    image: "/team/sarah.jpg",
    webpage: "https://example.com/sarah",
  },
  {
    id: "michael",
    name: "Michael Chen",
    role: "Education Coordinator",
    image: "/team/michael.jpg",
    webpage: "https://example.com/michael",
  },
  {
    id: "emily",
    name: "Emily Martinez",
    role: "Wildlife Researcher",
    image: "/team/emily.jpg",
    webpage: "https://example.com/emily",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      {/* Menu Bar */}
      <Menubar className="fixed top-0 left-0 right-0 z-50 px-4 py-2 backdrop-blur-sm bg-white/80 border-b">
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Home
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <a href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-2">
            <User className="w-4 h-4" />
            About Us
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <a href="/about" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                About Us
              </a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* About Content */}
      <section className="container mx-auto px-4 pt-24 pb-16">
        <Card className="max-w-3xl mx-auto p-8 backdrop-blur-sm bg-white/50">
          <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            About Project Arcadia
          </h1>
          <div className="space-y-6 text-gray-600">
            <p>
              Project Arcadia is a student-led initiative dedicated to wildlife conservation and education. We believe that understanding our world's incredible biodiversity is the first step toward protecting it.
            </p>
            <p>
              Through interactive learning experiences and direct support for conservation efforts, we're building a community of young environmentalists committed to preserving Earth's precious wildlife.
            </p>
            <p>
              Our team consists of passionate students and educators who work tirelessly to create engaging content and meaningful conservation initiatives. We collaborate with wildlife experts and organizations worldwide to ensure accurate information and effective conservation strategies.
            </p>
            <p>
              By joining Project Arcadia, you become part of a global movement dedicated to protecting our planet's diverse ecosystems and the countless species that call them home.
            </p>
          </div>
        </Card>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <Link to={`/team/${member.id}`} key={member.id}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover hover:scale-105 transition-transform"
                />
                <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
