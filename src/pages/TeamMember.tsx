
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Home, User } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const teamMembers = {
  sarah: {
    name: "Sarah Johnson",
    role: "Conservation Director",
    bio: "Sarah leads our conservation efforts with over 10 years of experience in wildlife protection. She has worked with various international organizations and specializes in endangered species preservation.",
    image: "/team/sarah.jpg",
    webpage: "https://example.com/sarah",
  },
  michael: {
    name: "Michael Chen",
    role: "Education Coordinator",
    bio: "Michael develops our educational programs and coordinates with schools and universities. His passion for teaching about wildlife has inspired thousands of students.",
    image: "/team/michael.jpg",
    webpage: "https://example.com/michael",
  },
  emily: {
    name: "Emily Martinez",
    role: "Wildlife Researcher",
    bio: "Emily conducts field research and contributes to our scientific publications. Her work focuses on studying animal behavior and habitat preservation.",
    image: "/team/emily.jpg",
    webpage: "https://example.com/emily",
  },
};

type TeamMemberParams = {
  id: keyof typeof teamMembers;
};

const TeamMember = () => {
  const { id } = useParams<TeamMemberParams>();
  const member = teamMembers[id as keyof typeof teamMembers];

  if (!member) {
    return <div>Member not found</div>;
  }

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

      <div className="container mx-auto px-4 pt-24 pb-16">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-sm bg-white/50">
          <div className="text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
            />
            <h1 className="text-3xl font-bold mb-2 text-primary">{member.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{member.role}</p>
            <p className="text-gray-600 mb-6">{member.bio}</p>
            <a
              href={member.webpage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Visit Personal Website
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeamMember;
