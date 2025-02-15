import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Animal } from "@shared/schema";
import FeaturedAnimalCard from "@/components/featured-animal-card";

export default function Home() {
  const { data: animals, isLoading } = useQuery<Animal[]>({
    queryKey: ["/api/animals"],
  });

  return (
    <div className="container py-8">
      <section className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl font-bold">Welcome to Project Arcadia</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Join us in protecting Earth's amazing wildlife!
          </p>
          <Link href="/donate">
            <Button size="lg">Help Us Save Wildlife</Button>
          </Link>
        </motion.div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-center">Featured Animals</h2>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {animals?.map((animal) => (
              <FeaturedAnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      <section className="text-center bg-accent rounded-lg p-8">
        <h2 className="mb-4 text-3xl font-bold">Did You Know?</h2>
        <p className="text-lg text-muted-foreground">
          Every small action helps! From recycling to spreading awareness,
          you can make a difference in wildlife conservation.
        </p>
      </section>
    </div>
  );
}
