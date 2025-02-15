import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SuccessStory } from "@shared/schema";

export default function SuccessStoryCard({ story }: { story: SuccessStory }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="h-48 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>{story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{story.content}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
