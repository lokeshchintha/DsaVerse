
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { 
  Map, Trophy, Clock, Star, RotateCcw, Play, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Target, Zap
} from "lucide-react";

const CodeMaze = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "completed">("menu");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [codesCollected, setCodesCollected] = useState(0);
  const [maze, setMaze] = useState<string[][]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const levels = [
    {
      name: "Array Navigation",
      size: 10,
      timeLimit: 60,
      difficulty: "Easy",
      theme: "Arrays & Loops"
    },
    {
      name: "Tree Traversal",
      size: 12,
      timeLimit: 90,
      difficulty: "Medium", 
      theme: "Binary Trees"
    },
    {
      name: "Graph Explorer",
      size: 15,
      timeLimit: 120,
      difficulty: "Hard",
      theme: "Graph Algorithms"
    },
    {
      name: "Dynamic Maze",
      size: 18,
      timeLimit: 150,
      difficulty: "Expert",
      theme: "Dynamic Programming"
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generateMaze = useCallback((size: number) => {
    const newMaze = Array(size).fill(null).map(() => Array(size).fill('W'));
    
    // Simple maze generation algorithm
    const carvePassage = (x: number, y: number) => {
      newMaze[y][x] = 'P';
      const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]].sort(() => Math.random() - 0.5);
      
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && newMaze[ny][nx] === 'W') {
          newMaze[y + dy/2][x + dx/2] = 'P';
          carvePassage(nx, ny);
        }
      }
    };

    carvePassage(1, 1);
    
    // Add code fragments
    for (let i = 0; i < Math.floor(size/3); i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
      } while (newMaze[y][x] !== 'P');
      newMaze[y][x] = 'C';
    }
    
    // Set exit
    newMaze[size-2][size-2] = 'E';
    
    return newMaze;
  }, []);

  const startGame = () => {
    const level = levels[currentLevel];
    setMaze(generateMaze(level.size));
    setPlayerPos({ x: 1, y: 1 });
    setTimeLeft(level.timeLimit);
    setCodesCollected(0);
    setGameState("playing");
  };

  const movePlayer = useCallback((direction: string) => {
    if (gameState !== "playing") return;
    
    setPlayerPos(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (direction) {
        case 'up': newY--; break;
        case 'down': newY++; break;
        case 'left': newX--; break;
        case 'right': newX++; break;
      }
      
      if (newX < 0 || newX >= maze[0]?.length || newY < 0 || newY >= maze.length) {
        return prev;
      }
      
      const cell = maze[newY][newX];
      if (cell === 'W') return prev;
      
      if (cell === 'C') {
        setCodesCollected(c => c + 1);
        setScore(s => s + 100);
        const newMaze = [...maze];
        newMaze[newY][newX] = 'P';
        setMaze(newMaze);
      }
      
      if (cell === 'E') {
        setScore(s => s + timeLeft * 10);
        setGameState("completed");
      }
      
      return { x: newX, y: newY };
    });
  }, [gameState, maze, timeLeft]);

  useEffect(() => {
    if (gameState !== "playing") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("completed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': movePlayer('up'); break;
        case 'ArrowDown': case 's': case 'S': movePlayer('down'); break;
        case 'ArrowLeft': case 'a': case 'A': movePlayer('left'); break;
        case 'ArrowRight': case 'd': case 'D': movePlayer('right'); break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  const resetGame = () => {
    setGameState("menu");
    setCurrentLevel(0);
    setScore(0);
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      startGame();
    } else {
      resetGame();
    }
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Code Maze Explorer 🗺️
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Navigate through algorithmic mazes, collect code fragments, and reach the exit before time runs out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {levels.map((level, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all ${
                  currentLevel === index ? 'ring-2 ring-blue-500 bg-blue-900/20' : 'hover:bg-gray-800/50'
                }`}
                onClick={() => setCurrentLevel(index)}
              >
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    {level.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{level.difficulty}</Badge>
                    <Badge variant="outline">{level.theme}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-2">Maze Size: {level.size}x{level.size}</p>
                  <p className="text-gray-300 text-sm">Time Limit: {level.timeLimit}s</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-6 w-6 mr-2" />
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Navbar />
      
      <div className="fixed top-16 left-0 right-0 z-10 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center bg-black/60 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="text-white">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-400" />
                <span className="text-white">{codesCollected} codes</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-400" />
                <span className="text-white">{score}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetGame}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black/60 backdrop-blur-lg border-blue-500/50">
            <CardHeader>
              <CardTitle className="text-white">{levels[currentLevel].name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1 mx-auto w-fit">
                {maze.map((row, y) => (
                  <div key={y} className="flex gap-1">
                    {row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={`w-6 h-6 flex items-center justify-center text-xs ${
                          playerPos.x === x && playerPos.y === y
                            ? 'bg-blue-500 animate-pulse'
                            : cell === 'W' ? 'bg-gray-800'
                            : cell === 'C' ? 'bg-yellow-500'
                            : cell === 'E' ? 'bg-green-500'
                            : 'bg-gray-600'
                        }`}
                      >
                        {playerPos.x === x && playerPos.y === y ? '🤖' :
                         cell === 'C' ? '💾' :
                         cell === 'E' ? '🚪' : ''}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              {isMobile && (
                <div className="mt-6">
                  <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
                    <div></div>
                    <Button variant="outline" size="sm" onClick={() => movePlayer('up')}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <div></div>
                    <Button variant="outline" size="sm" onClick={() => movePlayer('left')}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div></div>
                    <Button variant="outline" size="sm" onClick={() => movePlayer('right')}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <div></div>
                    <Button variant="outline" size="sm" onClick={() => movePlayer('down')}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <div></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {gameState === "completed" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/90">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">
                {timeLeft > 0 ? "Level Complete!" : "Time's Up!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300">Score: {score}</p>
              <p className="text-gray-300">Codes Collected: {codesCollected}</p>
              <div className="flex gap-3">
                {currentLevel < levels.length - 1 && timeLeft > 0 ? (
                  <Button onClick={nextLevel} className="flex-1">
                    Next Level
                  </Button>
                ) : (
                  <Button onClick={resetGame} className="flex-1">
                    Play Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CodeMaze;
