
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Globe, Gift, Home, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Index = () => {
  const { toast } = useToast();
  const [paypalClicked, setPaypalClicked] = useState(false);

  const handlePaypalClick = () => {
    setPaypalClicked(true);
    toast({
      title: "PayPal Integration",
      description: "This is a placeholder for PayPal integration.",
    });
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global Wildlife",
      description: "Learn about diverse species from around the world",
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Conservation",
      description: "Understand the importance of wildlife preservation",
    },
    {
      icon: <Gift className="w-8 h-8 text-primary" />,
      title: "Support Wildlife",
      description: "Your donations help protect endangered species",
    },
  ];

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

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center animate-fade-down">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
            Welcome to Project Arcadia
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Protecting Wildlife Together
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Join us in our mission to educate and preserve the incredible diversity of Earth's wildlife through interactive learning and conservation efforts
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white animate-float"
            onClick={() => {
              toast({
                title: "Welcome!",
                description: "Thank you for your interest in wildlife conservation!",
              });
            }}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Donation Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card className="p-8 backdrop-blur-sm bg-white/50">
            <h2 className="text-2xl font-bold mb-4">Support Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Your donation helps us protect wildlife and their habitats
            </p>
            <Button
              className={`w-full ${
                paypalClicked
                  ? "bg-gray-400"
                  : "bg-primary hover:bg-primary/90"
              } text-white`}
              onClick={handlePaypalClick}
              disabled={paypalClicked}
            >
              {paypalClicked ? "PayPal Button Placeholder" : "Donate with PayPal"}
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
