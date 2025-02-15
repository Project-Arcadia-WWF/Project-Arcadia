import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Temporary mock data - will be replaced with real data
const regions = [
  {
    id: 1,
    name: "African Savanna",
    description: "Home to diverse wildlife including lions, elephants, and giraffes",
    animals: ["Lion", "Elephant", "Giraffe", "Zebra"],
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e"
  },
  {
    id: 2,
    name: "Amazon Rainforest",
    description: "World's largest rainforest, hosting countless species",
    animals: ["Jaguar", "Toucan", "Sloth", "Macaw"],
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5"
  },
  {
    id: 3,
    name: "Arctic Tundra",
    description: "Cold region with unique adaptive wildlife",
    animals: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Caribou"],
    imageUrl: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241"
  }
];

export default function ExplorerHub() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Wildlife Explorer Hub</h1>
      
      <p className="text-center text-lg text-muted-foreground mb-12">
        Explore different habitats and discover amazing wildlife from around the world!
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <motion.div
            key={region.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden h-full">
              <img
                src={region.imageUrl}
                alt={region.name}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {region.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  {region.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {region.animals.map((animal) => (
                    <Badge key={animal} variant="secondary">
                      {animal}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Click on any habitat to learn more about its wildlife and conservation efforts!
        </p>
      </div>
    </div>
  );
}
