import { useQuery } from "@tanstack/react-query";
import type { SuccessStory } from "@shared/schema";
import SuccessStoryCard from "@/components/success-story-card";

export default function SuccessStories() {
  const { data: stories, isLoading } = useQuery<SuccessStory[]>({
    queryKey: ["/api/stories"],
  });

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Success Stories</h1>
      
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stories?.map((story) => (
            <SuccessStoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
