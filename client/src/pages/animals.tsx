import { useQuery } from "@tanstack/react-query";
import type { Animal } from "@shared/schema";
import AnimalStorySection from "@/components/animal-story-section";

export default function Animals() {
  const { data: animals, isLoading } = useQuery<Animal[]>({
    queryKey: ["/api/animals"],
  });

  return (
    <div className="container py-8" id="animals-section">
      <h1 className="mb-8 text-4xl font-bold text-center">Our Wildlife Friends</h1>

      {isLoading ? (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[400px] animate-pulse bg-muted rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {animals?.map((animal) => (
            <AnimalStorySection key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
}