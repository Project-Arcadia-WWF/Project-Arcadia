import { z } from "zod";

// Animal schema
const animalSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  conservationStatus: z.string().min(1, "Conservation status is required"),
});

// Success story schema
const successStorySchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Must be a valid URL"),
});

// Donation schema
const donationSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  message: z.string().optional(),
});

// Contact schema
const contactSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

// Game Progress schema
const gameProgressSchema = z.object({
  id: z.number(),
  userId: z.string(),
  gameId: z.number(),
  score: z.number(),
  completed: z.boolean(),
  completedAt: z.string().datetime(),
});

// Ranger Level schema
const rangerLevelSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Level name is required"),
  minPoints: z.number(),
  badge: z.string().url("Must be a valid URL"),
  description: z.string(),
});

// User Progress schema
const userProgressSchema = z.object({
  id: z.number(),
  userId: z.string(),
  totalPoints: z.number(),
  currentLevel: z.number(),
  gamesCompleted: z.number(),
  donationsCount: z.number(),
});

// Game schema
const gameSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["quiz", "match", "puzzle"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  pointsToEarn: z.number(),
  content: z.record(z.unknown()),
});

export const insertAnimalSchema = animalSchema.omit({ id: true });
export const insertStorySchema = successStorySchema.omit({ id: true });
export const insertDonationSchema = donationSchema.omit({ id: true });
export const insertContactSchema = contactSchema.omit({ id: true });
export const insertGameProgressSchema = gameProgressSchema.omit({ id: true });
export const insertRangerLevelSchema = rangerLevelSchema.omit({ id: true });
export const insertUserProgressSchema = userProgressSchema.omit({ id: true });
export const insertGameSchema = gameSchema.omit({ id: true });

export type Animal = z.infer<typeof animalSchema>;
export type SuccessStory = z.infer<typeof successStorySchema>;
export type Donation = z.infer<typeof donationSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type GameProgress = z.infer<typeof gameProgressSchema>;
export type RangerLevel = z.infer<typeof rangerLevelSchema>;
export type UserProgress = z.infer<typeof userProgressSchema>;
export type Game = z.infer<typeof gameSchema>;

export type InsertAnimal = z.infer<typeof insertAnimalSchema>;
export type InsertStory = z.infer<typeof insertStorySchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertGameProgress = z.infer<typeof insertGameProgressSchema>;
export type InsertRangerLevel = z.infer<typeof insertRangerLevelSchema>;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type InsertGame = z.infer<typeof insertGameSchema>;