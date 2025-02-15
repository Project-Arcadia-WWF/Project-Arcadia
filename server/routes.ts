import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { 
  insertDonationSchema, 
  insertContactSchema,
  insertGameProgressSchema,
  insertUserProgressSchema
} from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/animals", async (_req, res) => {
    const animals = await storage.getAnimals();
    res.json(animals);
  });

  app.get("/api/animals/:id", async (req, res) => {
    const animal = await storage.getAnimal(parseInt(req.params.id));
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json(animal);
  });

  app.get("/api/stories", async (_req, res) => {
    const stories = await storage.getStories();
    res.json(stories);
  });

  app.get("/api/stories/:id", async (req, res) => {
    const story = await storage.getStory(parseInt(req.params.id));
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  });

  // Game routes
  app.get("/api/games", async (_req, res) => {
    const games = await storage.getGames();
    res.json(games);
  });

  app.get("/api/games/:id", async (req, res) => {
    const game = await storage.getGame(parseInt(req.params.id));
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  });

  app.post("/api/games/:id/progress", async (req, res) => {
    const result = insertGameProgressSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid game progress data" });
    }

    const progress = await storage.saveGameProgress(result.data);
    const userProgress = await storage.updateUserPoints(
      progress.userId,
      progress.score
    );

    const currentLevel = await storage.getCurrentLevel(userProgress.totalPoints);

    res.status(201).json({ progress, userProgress, currentLevel });
  });

  // User progress routes
  app.get("/api/user-progress/:userId", async (req, res) => {
    const progress = await storage.getUserProgress(req.params.userId);
    if (!progress) {
      return res.status(404).json({ message: "User progress not found" });
    }
    res.json(progress);
  });

  app.get("/api/ranger-levels", async (_req, res) => {
    const levels = await storage.getRangerLevels();
    res.json(levels);
  });

  // Modify existing donation route to award points
  app.post("/api/donate", async (req, res) => {
    const result = insertDonationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid donation data" });
    }

    const donation = await storage.createDonation(result.data);

    // Award points based on donation amount (1 point per dollar)
    const points = Math.floor(donation.amount);
    const userProgress = await storage.updateUserPoints(donation.email, points);
    const currentLevel = await storage.getCurrentLevel(userProgress.totalPoints);

    res.status(201).json({ donation, userProgress, currentLevel });
  });

  app.post("/api/contact", async (req, res) => {
    const result = insertContactSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid contact data" });
    }
    
    const contact = await storage.createContact(result.data);
    res.status(201).json(contact);
  });

  const httpServer = createServer(app);
  return httpServer;
}