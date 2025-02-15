import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/animals", label: "Animals" },
  { href: "/explorer", label: "Explorer Hub" },
  { href: "/junior-ranger", label: "Junior Ranger" },
  { href: "/games", label: "Games" },
  { href: "/eco-heroes", label: "Eco Heroes" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const handleNavigation = (href: string) => {
    const sections = {
      "/animals": "animals-section",
      "/success-stories": "success-stories-section",
    };

    const sectionId = sections[href as keyof typeof sections];
    if (location === "/" && sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="hidden md:flex">
                <Link href="/">
                  <NavigationMenuLink className="flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold">Project Arcadia</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href}>
                    <NavigationMenuLink
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        location === item.href &&
                          "bg-accent text-accent-foreground",
                      )}
                      onClick={() => handleNavigation(item.href)}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Leaf className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built for WWF by Project Arcadia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
