import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Book, Star, Trophy } from "lucide-react";

// Temporary mock data - will be replaced with real data
const courses = [
  {
    id: 1,
    title: "Wildlife Detective",
    description: "Learn to identify animal tracks and signs",
    level: "Beginner",
    badges: ["Track Expert", "Nature Observer"],
    icon: Star
  },
  {
    id: 2,
    title: "Habitat Helper",
    description: "Understand different ecosystems and how to protect them",
    level: "Intermediate",
    badges: ["Ecosystem Guardian", "Conservation Champion"],
    icon: Trophy
  },
  {
    id: 3,
    title: "Conservation Hero",
    description: "Learn how to make a difference in wildlife conservation",
    level: "Advanced",
    badges: ["Wildlife Protector", "Earth Ambassador"],
    icon: Award
  }
];

export default function JuniorRanger() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Junior Ranger Academy</h1>
      
      <p className="text-center text-lg text-muted-foreground mb-12">
        Start your journey to become a certified Junior Wildlife Ranger!
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    {course.title}
                  </CardTitle>
                  <Badge>{course.level}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Badges to Earn:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.badges.map((badge) => (
                        <Badge key={badge} variant="outline">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Complete courses to earn badges and become a certified Junior Ranger!
        </p>
      </div>
    </div>
  );
}
