import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Heart } from "lucide-react";

// Temporary mock data - will be replaced with real stories
const heroes = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 13,
    project: "School Recycling Initiative",
    impact: "Implemented recycling program reaching 500+ students",
    imageUrl: "https://images.unsplash.com/photo-1544717302-de2939b7ef71",
    location: "California, USA"
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    age: 12,
    project: "Beach Cleanup Club",
    impact: "Organized monthly cleanups removing 1000+ lbs of plastic",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    location: "Florida, USA"
  },
  {
    id: 3,
    name: "Emma Chen",
    age: 14,
    project: "Wildlife Garden",
    impact: "Created butterfly and bird sanctuary at local park",
    imageUrl: "https://images.unsplash.com/photo-1597248374161-426f0d6d2fc9",
    location: "Toronto, Canada"
  }
];

export default function EcoHeroes() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Eco Heroes Wall</h1>
      
      <div className="text-center mb-12">
        <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
        <p className="text-lg text-muted-foreground">
          Meet young conservationists making a difference in their communities!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {heroes.map((hero) => (
          <motion.div
            key={hero.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden h-full">
              <img
                src={hero.imageUrl}
                alt={hero.name}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{hero.name}</span>
                  <Badge variant="outline">Age {hero.age}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {hero.location}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Project</h3>
                  <p className="text-muted-foreground">{hero.project}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Impact</h3>
                  <p className="text-muted-foreground">{hero.impact}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Inspired to make a difference? Submit your own conservation story!
        </p>
      </div>
    </div>
  );
}
