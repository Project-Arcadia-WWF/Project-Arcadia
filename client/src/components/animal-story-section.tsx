import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Animal } from "@shared/schema";

export default function AnimalStorySection({ animal }: { animal: Animal }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={animal.imageUrl}
                alt={animal.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center justify-between">
                  <span>{animal.name}</span>
                  <Badge variant="secondary">{animal.conservationStatus}</Badge>
                </CardTitle>
                <p className="text-lg font-semibold text-muted-foreground">
                  {animal.species}
                </p>
              </CardHeader>
              <CardContent className="px-0">
                <div className="prose">
                  <h3>About {animal.name}</h3>
                  <p>{animal.description}</p>
                  
                  <h3>Conservation Status</h3>
                  <p>
                    Currently classified as <strong>{animal.conservationStatus}</strong>.
                    Here's what we're doing to help:
                  </p>
                  <ul>
                    <li>Protecting natural habitats</li>
                    <li>Anti-poaching initiatives</li>
                    <li>Community education programs</li>
                    <li>Research and monitoring</li>
                  </ul>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
