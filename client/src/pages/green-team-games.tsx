import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GamepadIcon } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Game, GameProgress, UserProgress, RangerLevel } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface GameState {
  level: number;
  progress: number;
  selectedPairs: number[];
  completedPairs: Set<number>;
  chainOrder: number[];
}

export default function GreenTeamGames() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    progress: 0,
    selectedPairs: [],
    completedPairs: new Set(),
    chainOrder: []
  });

  const { toast } = useToast();

  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const mutation = useMutation({
    mutationFn: async (data: { 
      gameId: number; 
      score: number; 
      completed: boolean 
    }) => {
      const response = await apiRequest("POST", `/api/games/${data.gameId}/progress`, {
        ...data,
        userId: "demo-user", // In a real app, this would be the actual user ID
        completedAt: new Date().toISOString()
      });
      return response.json();
    },
    onSuccess: (data: { 
      progress: GameProgress; 
      userProgress: UserProgress; 
      currentLevel: RangerLevel 
    }) => {
      toast({
        title: "Level Complete!",
        description: gameState.level === 3 
          ? `Game Complete! You earned ${data.progress.score} points and are now a ${data.currentLevel.name}!`
          : `Level ${gameState.level} complete! Moving to next level.`,
      });

      if (gameState.level === 3) {
        setSelectedGame(null);
        setGameState({
          level: 1,
          progress: 0,
          selectedPairs: [],
          completedPairs: new Set(),
          chainOrder: []
        });
      } else {
        setGameState(prev => ({
          ...prev,
          level: prev.level + 1,
          progress: 0,
          selectedPairs: [],
          completedPairs: new Set(),
          chainOrder: []
        }));
      }
    },
  });

  const handleLevelComplete = (score: number) => {
    if (selectedGame) {
      mutation.mutate({
        gameId: selectedGame.id,
        score: score * gameState.level, // More points for higher levels
        completed: gameState.level === 3
      });
    }
  };

  const renderQuiz = () => {
    if (!selectedGame?.content.levels) return null;
    const currentLevel = selectedGame.content.levels[gameState.level - 1];
    if (!currentLevel) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Level {gameState.level}</h3>
        <div className="mb-4">
          <Badge>Question {gameState.progress + 1} of 5</Badge>
        </div>
        {currentLevel.questions.map((q, idx) => (
          idx === gameState.progress && (
            <div key={idx} className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">{q.question}</h3>
              <div className="space-y-2">
                {q.options.map((option, optIdx) => (
                  <Button
                    key={optIdx}
                    variant="outline"
                    className="w-full text-left justify-start"
                    onClick={() => {
                      if (optIdx === q.correct) {
                        if (gameState.progress === 4) {
                          handleLevelComplete(selectedGame.pointsToEarn);
                        } else {
                          setGameState(prev => ({
                            ...prev,
                            progress: prev.progress + 1
                          }));
                          toast({
                            title: "Correct!",
                            description: "Great job! Moving to next question."
                          });
                        }
                      } else {
                        toast({
                          title: "Try Again!",
                          description: "That wasn't quite right. Give it another shot!",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    );
  };

  const renderMatch = () => {
    if (!selectedGame?.content.levels) return null;
    const currentLevel = selectedGame.content.levels[gameState.level - 1];
    if (!currentLevel) return null;

    const handlePairClick = (idx: number) => {
      if (gameState.completedPairs.has(idx)) return;

      setGameState(prev => {
        const newPairs = [...prev.selectedPairs, idx];
        if (newPairs.length === 2) {
          // Check if match is correct
          const pair1 = currentLevel.pairs[newPairs[0]];
          const pair2 = currentLevel.pairs[newPairs[1]];

          if (pair1.animal === pair2.animal || pair1.habitat === pair2.habitat) {
            const newCompleted = new Set(prev.completedPairs);
            newCompleted.add(newPairs[0]);
            newCompleted.add(newPairs[1]);

            // Check if level is complete
            if (newCompleted.size === currentLevel.pairs.length) {
              handleLevelComplete(selectedGame.pointsToEarn);
            }

            return {
              ...prev,
              selectedPairs: [],
              completedPairs: newCompleted
            };
          }

          return {
            ...prev,
            selectedPairs: []
          };
        }

        return {
          ...prev,
          selectedPairs: newPairs
        };
      });
    };

    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Level {gameState.level}</h3>
        <div className="grid grid-cols-2 gap-4">
          {currentLevel.pairs.map((pair, idx) => (
            <Button
              key={idx}
              variant={gameState.completedPairs.has(idx) ? "default" : "outline"}
              className={`w-full ${gameState.selectedPairs.includes(idx) ? "ring-2 ring-primary" : ""}`}
              onClick={() => handlePairClick(idx)}
              disabled={gameState.completedPairs.has(idx)}
            >
              {pair.animal} - {pair.habitat}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderPuzzle = () => {
    if (!selectedGame?.content.levels) return null;
    const currentLevel = selectedGame.content.levels[gameState.level - 1];
    if (!currentLevel) return null;

    const handleItemClick = (id: number) => {
      setGameState(prev => {
        const newOrder = [...prev.chainOrder];
        if (newOrder.includes(id)) {
          return prev;
        }

        newOrder.push(id);

        // Check if chain is complete
        if (newOrder.length === currentLevel.items.length) {
          const isCorrect = newOrder.every((id, idx) => id === currentLevel.correctOrder[idx]);
          if (isCorrect) {
            handleLevelComplete(selectedGame.pointsToEarn);
            return prev;
          } else {
            toast({
              title: "Try Again!",
              description: "That's not quite the right order. Think about how energy flows through the ecosystem.",
              variant: "destructive"
            });
            return {
              ...prev,
              chainOrder: []
            };
          }
        }

        return {
          ...prev,
          chainOrder: newOrder
        };
      });
    };

    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Level {gameState.level}</h3>
        <p className="mb-4">Build the food chain by clicking the items in order, starting from the energy source:</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {currentLevel.items.map(item => (
            <Button
              key={item.id}
              variant={gameState.chainOrder.includes(item.id) ? "default" : "outline"}
              className="w-full"
              onClick={() => handleItemClick(item.id)}
              disabled={gameState.chainOrder.includes(item.id)}
            >
              {item.name} ({item.type})
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Current Chain:</h4>
          <div className="flex items-center gap-2">
            {gameState.chainOrder.map((id, idx) => {
              const item = currentLevel.items.find(i => i.id === id);
              return (
                <div key={id} className="flex items-center">
                  <span className="px-2 py-1 bg-primary/10 rounded">
                    {item?.name}
                  </span>
                  {idx < gameState.chainOrder.length - 1 && (
                    <span className="mx-1">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    switch (selectedGame.type) {
      case "quiz":
        return renderQuiz();
      case "match":
        return renderMatch();
      case "puzzle":
        return renderPuzzle();
      default:
        return <div>Game type not implemented yet</div>;
    }
  };

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Green Team Games</h1>

      <div className="text-center mb-12">
        <GamepadIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
        <p className="text-lg text-muted-foreground">
          Play games, earn points, and level up your ranger status!
        </p>
      </div>

      {selectedGame ? (
        <Card>
          <CardHeader>
            <CardTitle>{selectedGame.title}</CardTitle>
            <Button 
              variant="outline"
              onClick={() => {
                if (window.confirm("Are you sure? You'll lose your progress in this game.")) {
                  setSelectedGame(null);
                  setGameState({
                    level: 1,
                    progress: 0,
                    selectedPairs: [],
                    completedPairs: new Set(),
                    chainOrder: []
                  });
                }
              }}
            >
              Back to Games
            </Button>
          </CardHeader>
          <CardContent>
            {renderGame()}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games?.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{game.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {game.pointsToEarn} pts
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {game.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      Type: {game.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Difficulty: {game.difficulty}
                    </span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedGame(game);
                      setGameState({
                        level: 1,
                        progress: 0,
                        selectedPairs: [],
                        completedPairs: new Set(),
                        chainOrder: []
                      });
                    }}
                  >
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}