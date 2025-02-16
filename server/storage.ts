import {
  type Animal,
  type InsertAnimal,
  type SuccessStory,
  type InsertStory,
  type Donation,
  type InsertDonation,
  type Contact,
  type InsertContact,
  type Game,
  type InsertGame,
  type GameProgress,
  type InsertGameProgress,
  type UserProgress,
  type InsertUserProgress,
  type RangerLevel,
  type InsertRangerLevel,
} from "@shared/schema";

export interface IStorage {
  getAnimals(): Promise<Animal[]>;
  getAnimal(id: number): Promise<Animal | undefined>;
  getStories(): Promise<SuccessStory[]>;
  getStory(id: number): Promise<SuccessStory | undefined>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  createContact(contact: InsertContact): Promise<Contact>;
  getGames(): Promise<Game[]>;
  getGame(id: number): Promise<Game | undefined>;
  saveGameProgress(progress: InsertGameProgress): Promise<GameProgress>;
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserPoints(userId: string, points: number): Promise<UserProgress>;
  getRangerLevels(): Promise<RangerLevel[]>;
  getCurrentLevel(points: number): Promise<RangerLevel>;
}

export class MemStorage implements IStorage {
  private animals: Map<number, Animal>;
  private stories: Map<number, SuccessStory>;
  private donations: Map<number, Donation>;
  private contacts: Map<number, Contact>;
  private games: Map<number, Game>;
  private gameProgress: Map<number, GameProgress>;
  private userProgress: Map<string, UserProgress>;
  private rangerLevels: Map<number, RangerLevel>;
  private currentId: number;

  constructor() {
    this.animals = new Map();
    this.stories = new Map();
    this.donations = new Map();
    this.contacts = new Map();
    this.games = new Map();
    this.gameProgress = new Map();
    this.userProgress = new Map();
    this.rangerLevels = new Map();
    this.currentId = 1;

    this.seedData();
    this.seedGamesData();
    this.seedRangerLevels();
  }

  private seedData() {
    const animals: InsertAnimal[] = [
      {
        name: "Leo the Amur Leopard",
        species: "Bengal Tiger",
        description: "Leo's family are often poached and illegally traded for their beautiful, spotted fur.",
        imageUrl:
          "https://images.unsplash.com/photo-1605132410660-f388de10e778?q=80&w=2411",
        conservationStatus: "Critically Endangered",
      },
      {
        name: "Emma the Elephant",
        species: "African Elephant",
        description: "A gentle giant who roams the African savanna.",
        imageUrl:
          "https://images.unsplash.com/photo-1696964257324-2954da201aa1",
        conservationStatus: "Vulnerable",
      },
      {
        name: "Peter the Panda",
        species: "Giant Panda",
        description: "A bamboo-loving bear from the mountains of China.",
        imageUrl:
          "https://images.unsplash.com/photo-1700048614554-a20ac206a49e",
        conservationStatus: "Vulnerable",
      },
    ];

    const stories: InsertStory[] = [
      {
        title: "Saving the Tigers",
        content:
          "Thanks to conservation efforts, tiger populations are growing!",
        imageUrl:
          "https://images.unsplash.com/photo-1669589486635-19d86f6ea708",
      },
      {
        title: "Protecting Elephant Habitats",
        content: "New sanctuary created to protect elephant migration routes.",
        imageUrl:
          "https://images.unsplash.com/photo-1696964257324-2954da201aa1",
      },
    ];

    animals.forEach((animal) => {
      const id = this.currentId++;
      this.animals.set(id, { ...animal, id });
    });

    stories.forEach((story) => {
      const id = this.currentId++;
      this.stories.set(id, { ...story, id });
    });
  }

  private seedGamesData() {
    const games: InsertGame[] = [
      {
        title: "Conservation Quiz",
        description: "Test your knowledge about wildlife conservation",
        type: "quiz",
        difficulty: "easy",
        pointsToEarn: 100,
        content: {
          levels: [
            {
              level: 1,
              questions: [
                {
                  question: "What does WWF stand for?",
                  options: [
                    "World Wildlife Fund",
                    "Worldwide Wildlife Foundation",
                    "World Water Foundation",
                    "Wild World Federation",
                  ],
                  correct: 0,
                },
                {
                  question: "Which of these animals is NOT endangered?",
                  options: [
                    "Gray Wolf",
                    "Giant Panda",
                    "Bengal Tiger",
                    "Mountain Gorilla",
                  ],
                  correct: 0,
                },
                {
                  question: "What is a habitat?",
                  options: [
                    "Where an animal lives",
                    "What an animal eats",
                    "How an animal hunts",
                    "When an animal sleeps",
                  ],
                  correct: 0,
                },
                {
                  question: "Which of these helps protect endangered species?",
                  options: [
                    "National Parks",
                    "Shopping Malls",
                    "Highways",
                    "Factories",
                  ],
                  correct: 0,
                },
                {
                  question: "What is conservation?",
                  options: [
                    "Protecting nature",
                    "Building cities",
                    "Making toys",
                    "Playing sports",
                  ],
                  correct: 0,
                },
              ],
            },
            {
              level: 2,
              questions: [
                {
                  question: "What is the biggest threat to sea turtles?",
                  options: [
                    "Plastic pollution",
                    "Thunderstorms",
                    "Seaweed",
                    "Small fish",
                  ],
                  correct: 0,
                },
                {
                  question:
                    "Which animal is known as the 'King of the Jungle'?",
                  options: ["Lion", "Tiger", "Elephant", "Giraffe"],
                  correct: 0,
                },
                {
                  question: "What do pandas mainly eat?",
                  options: ["Bamboo", "Fish", "Berries", "Insects"],
                  correct: 0,
                },
                {
                  question: "Which continent has the most diverse wildlife?",
                  options: ["Africa", "Europe", "North America", "Australia"],
                  correct: 0,
                },
                {
                  question: "What is deforestation?",
                  options: [
                    "Cutting down forests",
                    "Planting trees",
                    "Growing flowers",
                    "Building nests",
                  ],
                  correct: 0,
                },
              ],
            },
            {
              level: 3,
              questions: [
                {
                  question: "What is the purpose of a wildlife corridor?",
                  options: [
                    "Connect habitats",
                    "Store food",
                    "Train animals",
                    "Build homes",
                  ],
                  correct: 0,
                },
                {
                  question: "Which of these is a keystone species?",
                  options: ["Elephant", "Mouse", "Butterfly", "Ant"],
                  correct: 0,
                },
                {
                  question: "What is biodiversity?",
                  options: [
                    "Variety of life",
                    "Type of plant",
                    "Kind of weather",
                    "Ocean current",
                  ],
                  correct: 0,
                },
                {
                  question: "How do polar bears stay warm?",
                  options: [
                    "Thick fur and blubber",
                    "Hot springs",
                    "Fires",
                    "Warm caves",
                  ],
                  correct: 0,
                },
                {
                  question: "What is an ecosystem?",
                  options: [
                    "Community of organisms",
                    "Type of building",
                    "Weather pattern",
                    "Mountain range",
                  ],
                  correct: 0,
                },
              ],
            },
          ],
        },
      },
      {
        title: "Habitat Match",
        description: "Match animals to their correct habitats around the world",
        type: "match",
        difficulty: "medium",
        pointsToEarn: 150,
        content: {
          levels: [
            {
              level: 1,
              pairs: [
                { animal: "Penguin", habitat: "Antarctica" },
                { animal: "Lion", habitat: "Savanna" },
                { animal: "Tiger", habitat: "Jungle" },
                { animal: "Polar Bear", habitat: "Arctic" },
              ],
            },
            {
              level: 2,
              pairs: [
                { animal: "Kangaroo", habitat: "Outback" },
                { animal: "Camel", habitat: "Desert" },
                { animal: "Monkey", habitat: "Rainforest" },
                { animal: "Eagle", habitat: "Mountains" },
                { animal: "Seal", habitat: "Coast" },
              ],
            },
            {
              level: 3,
              pairs: [
                { animal: "Panda", habitat: "Bamboo Forest" },
                { animal: "Dolphin", habitat: "Ocean" },
                { animal: "Meerkat", habitat: "Desert" },
                { animal: "Sloth", habitat: "Rainforest" },
                { animal: "Wolf", habitat: "Tundra" },
                { animal: "Crocodile", habitat: "Wetlands" },
              ],
            },
          ],
        },
      },
      {
        title: "Food Chain Challenge",
        description:
          "Build correct food chains and learn about ecosystem balance",
        type: "puzzle",
        difficulty: "hard",
        pointsToEarn: 200,
        content: {
          levels: [
            {
              level: 1,
              items: [
                { id: 1, name: "Sun", type: "producer" },
                { id: 2, name: "Grass", type: "producer" },
                { id: 3, name: "Rabbit", type: "consumer" },
                { id: 4, name: "Fox", type: "consumer" },
              ],
              correctOrder: [1, 2, 3, 4],
            },
            {
              level: 2,
              items: [
                { id: 1, name: "Sun", type: "producer" },
                { id: 2, name: "Plankton", type: "producer" },
                { id: 3, name: "Small Fish", type: "consumer" },
                { id: 4, name: "Tuna", type: "consumer" },
                { id: 5, name: "Shark", type: "consumer" },
              ],
              correctOrder: [1, 2, 3, 4, 5],
            },
            {
              level: 3,
              items: [
                { id: 1, name: "Sun", type: "producer" },
                { id: 2, name: "Tree", type: "producer" },
                { id: 3, name: "Caterpillar", type: "consumer" },
                { id: 4, name: "Bird", type: "consumer" },
                { id: 5, name: "Snake", type: "consumer" },
                { id: 6, name: "Eagle", type: "consumer" },
              ],
              correctOrder: [1, 2, 3, 4, 5, 6],
            },
          ],
        },
      },
    ];

    games.forEach((game) => {
      const id = this.currentId++;
      this.games.set(id, { ...game, id });
    });
  }

  private seedRangerLevels() {
    const levels: InsertRangerLevel[] = [
      {
        name: "Scout Ranger",
        minPoints: 0,
        badge: "https://example.com/badges/scout.svg",
        description: "Beginning your wildlife conservation journey",
      },
      {
        name: "Explorer Ranger",
        minPoints: 500,
        badge: "https://example.com/badges/explorer.svg",
        description: "Growing your conservation knowledge",
      },
      {
        name: "Guardian Ranger",
        minPoints: 1000,
        badge: "https://example.com/badges/guardian.svg",
        description: "Becoming a true wildlife protector",
      },
      {
        name: "Master Ranger",
        minPoints: 2000,
        badge: "https://example.com/badges/master.svg",
        description: "Leading the way in conservation",
      },
    ];

    levels.forEach((level) => {
      const id = this.currentId++;
      this.rangerLevels.set(id, { ...level, id });
    });
  }

  async getAnimals(): Promise<Animal[]> {
    return Array.from(this.animals.values());
  }

  async getAnimal(id: number): Promise<Animal | undefined> {
    return this.animals.get(id);
  }

  async getStories(): Promise<SuccessStory[]> {
    return Array.from(this.stories.values());
  }

  async getStory(id: number): Promise<SuccessStory | undefined> {
    return this.stories.get(id);
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.currentId++;
    const newDonation = { ...donation, id };
    this.donations.set(id, newDonation);
    return newDonation;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const newContact = { ...contact, id };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async saveGameProgress(progress: InsertGameProgress): Promise<GameProgress> {
    const id = this.currentId++;
    const newProgress = { ...progress, id };
    this.gameProgress.set(id, newProgress);
    return newProgress;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    return this.userProgress.get(userId);
  }

  async createUserProgress(
    progress: InsertUserProgress,
  ): Promise<UserProgress> {
    const newProgress = { ...progress, id: this.currentId++ };
    this.userProgress.set(progress.userId, newProgress);
    return newProgress;
  }

  async updateUserPoints(
    userId: string,
    points: number,
  ): Promise<UserProgress> {
    const progress = await this.getUserProgress(userId);
    if (!progress) {
      return this.createUserProgress({
        userId,
        totalPoints: points,
        currentLevel: 1,
        gamesCompleted: 1,
        donationsCount: 0,
      });
    }

    const updated = {
      ...progress,
      totalPoints: progress.totalPoints + points,
    };
    this.userProgress.set(userId, updated);
    return updated;
  }

  async getRangerLevels(): Promise<RangerLevel[]> {
    return Array.from(this.rangerLevels.values());
  }

  async getCurrentLevel(points: number): Promise<RangerLevel> {
    const levels = await this.getRangerLevels();
    const sortedLevels = levels.sort((a, b) => b.minPoints - a.minPoints);
    return sortedLevels.find((level) => points >= level.minPoints) || levels[0];
  }
}

export const storage = new MemStorage();
