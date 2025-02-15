import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Animal } from "@shared/schema";

export default function FeaturedAnimalCard({ animal }: { animal: Animal }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          className="h-48 w-full object-cover"
        />
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{animal.name}</span>
            <Badge variant="secondary">{animal.conservationStatus}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{animal.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
