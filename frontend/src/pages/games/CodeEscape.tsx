
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { 
  DoorOpen, Lock, Key, Clock, AlertTriangle, CheckCircle, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play
} from "lucide-react";

const CodeEscape = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "escaped" | "failed">("menu");
  const [currentRoom, setCurrentRoom] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [inventory, setInventory] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [userCode, setUserCode] = useState("");
  const [roomMap, setRoomMap] = useState<string[][]>([]);

  const rooms = [
    {
      name: "Variable Vault",
      size: 8,
      challenge: "Array Manipulation",
      description: "Unlock the door by correctly implementing array operations",
      code: "// Fix this code to unlock the door\nlet arr = [1, 2, 3, 4, 5];\n// TODO: Remove duplicates and sort",
      solution: "let arr = [1, 2, 3, 4, 5];\narr = [...new Set(arr)].sort((a, b) => a - b);",
      items: ["🗝️", "📜", "💎"],
      exitPos: { x: 6, y: 6 }
    },
    {
      name: "Loop Labyrinth",
      size: 10,
      challenge: "Nested Loops",
      description: "Navigate through the maze using correct loop logic",
      code: "// Create a pattern to reveal the path\nfor (let i = 0; i < 5; i++) {\n  // TODO: Fix the nested loop\n}",
      solution: "for (let i = 0; i < 5; i++) {\n  for (let j = 0; j < i; j++) {\n    console.log('*');\n  }\n}",
      items: ["🔦", "🧭", "⚡"],
      exitPos: { x: 8, y: 8 }
    },
    {
      name: "Function Factory",
      size: 12,
      challenge: "Higher-Order Functions",
      description: "Use functional programming to open the final escape route",
      code: "// Implement a function that transforms the data\nconst transform = (data) => {\n  // TODO: Apply map, filter, reduce\n};",
      solution: "const transform = (data) => {\n  return data.filter(x => x > 0).map(x => x * 2).reduce((a, b) => a + b, 0);\n};",
      items: ["🎯", "🔮", "👑"],
      exitPos: { x: 10, y: 10 }
    }
  ];

  const generateRoomMap = useCallback((size: number) => {
    const map = Array(size).fill(null).map(() => Array(size).fill('F')); // F = Floor
    
    // Add walls
    for (let i = 0; i < size; i++) {
      map[0][i] = 'W'; // Top wall
      map[size-1][i] = 'W'; // Bottom wall
      map[i][0] = 'W'; // Left wall
      map[i][size-1] = 'W'; // Right wall
    }
    
    // Add some obstacles
    for (let i = 0; i < size / 3; i++) {
      const x = Math.floor(Math.random() * (size - 2)) + 1;
      const y = Math.floor(Math.random() * (size - 2)) + 1;
      if (x !== 1 || y !== 1) { // Don't block starting position
        map[y][x] = 'W';
      }
    }
    
    // Add items
    const room = rooms[currentRoom];
    room.items.forEach((item, index) => {
      let x, y;
      do {
        x = Math.floor(Math.random() * (size - 2)) + 1;
        y = Math.floor(Math.random() * (size - 2)) + 1;
      } while (map[y][x] !== 'F' || (x === 1 && y === 1));
      map[y][x] = item;
    });
    
    // Add exit
    map[room.exitPos.y][room.exitPos.x] = 'E';
    
    return map;
  }, [currentRoom]);

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
      
      if (newX < 0 || newX >= roomMap[0]?.length || newY < 0 || newY >= roomMap.length) {
        return prev;
      }
      
      const cell = roomMap[newY][newX];
      if (cell === 'W') return prev;
      
      // Collect items
      if (cell !== 'F' && cell !== 'E') {
        setInventory(inv => [...inv, cell]);
        const newMap = [...roomMap];
        newMap[newY][newX] = 'F';
        setRoomMap(newMap);
      }
      
      // Check exit
      if (cell === 'E' && inventory.length >= 2) {
        if (currentRoom < rooms.length - 1) {
          setCurrentRoom(prev => prev + 1);
          setPlayerPos({ x: 1, y: 1 });
          setInventory([]);
        } else {
          setGameState("escaped");
        }
      }
      
      return { x: newX, y: newY };
    });
  }, [gameState, roomMap, inventory.length, currentRoom]);

  const submitCode = () => {
    const room = rooms[currentRoom];
    const isCorrect = userCode.includes(room.solution.split('\n')[1].trim());
    
    if (isCorrect) {
      // Unlock door/reveal path
      const newMap = [...roomMap];
      newMap[room.exitPos.y][room.exitPos.x] = 'E';
      setRoomMap(newMap);
      setUserCode("");
    }
  };

  const startGame = () => {
    setGameState("playing");
    setCurrentRoom(0);
    setPlayerPos({ x: 1, y: 1 });
    setInventory([]);
    setTimeLeft(900);
    setUserCode("");
  };

  useEffect(() => {
    if (gameState === "playing") {
      setRoomMap(generateRoomMap(rooms[currentRoom].size));
    }
  }, [gameState, currentRoom, generateRoomMap]);

  useEffect(() => {
    if (gameState !== "playing") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("failed");
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

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-black">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Code Escape 🚪
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trapped in a coding nightmare! Solve programming puzzles to unlock doors and escape each room before time runs out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {rooms.map((room, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-lg border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lock className="h-5 w-5 text-orange-400" />
                    {room.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-2">{room.challenge}</p>
                  <p className="text-orange-400 text-xs">{room.description}</p>
                  <div className="flex gap-1 mt-2">
                    {room.items.map((item, i) => (
                      <span key={i} className="text-lg">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Play className="h-6 w-6 mr-2" />
              Enter the Code Prison
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentRoomData = rooms[currentRoom];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-black">
      <Navbar />
      
      <div className="fixed top-16 left-0 right-0 z-10 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center bg-black/60 backdrop-blur-lg rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-orange-400" />
                <span className="text-white">Room {currentRoom + 1}/3</span>
              </div>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-green-400" />
                <span className="text-white">{inventory.length} items</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-orange-500/20 text-orange-300">
              {currentRoomData.name}
            </Badge>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/60 backdrop-blur-lg border-orange-500/50">
              <CardHeader>
                <CardTitle className="text-white">Room Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1 w-fit mx-auto">
                  {roomMap.map((row, y) => (
                    <div key={y} className="flex gap-1">
                      {row.map((cell, x) => (
                        <div
                          key={`${x}-${y}`}
                          className={`w-6 h-6 flex items-center justify-center text-xs border ${
                            playerPos.x === x && playerPos.y === y
                              ? 'bg-blue-500 animate-pulse'
                              : cell === 'W' ? 'bg-gray-800'
                              : cell === 'E' ? 'bg-green-500'
                              : cell === 'F' ? 'bg-gray-600'
                              : 'bg-yellow-500'
                          }`}
                        >
                          {playerPos.x === x && playerPos.y === y ? '🧑‍💻' : 
                           cell === 'E' ? '🚪' :
                           cell !== 'W' && cell !== 'F' ? cell : ''}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div></div>
                  <Button variant="outline" size="sm" onClick={() => movePlayer('up')}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => movePlayer('left')}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => movePlayer('right')}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button variant="outline" size="sm" onClick={() => movePlayer('down')}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/60 backdrop-blur-lg border-orange-500/50">
              <CardHeader>
                <CardTitle className="text-white">{currentRoomData.challenge}</CardTitle>
                <p className="text-gray-300">{currentRoomData.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={userCode || currentRoomData.code}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="min-h-[200px] font-mono bg-gray-900 border-gray-700 text-white"
                />
                
                <Button onClick={submitCode} className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Solution
                </Button>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Inventory:</h4>
                  <div className="flex gap-2">
                    {inventory.map((item, index) => (
                      <span key={index} className="text-2xl">{item}</span>
                    ))}
                  </div>
                  {inventory.length >= 2 && (
                    <p className="text-green-400 text-sm mt-2">
                      ✓ Enough items to escape! Find the exit door.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {(gameState === "escaped" || gameState === "failed") && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/90">
            <CardHeader className="text-center">
              <CardTitle className={`text-2xl ${gameState === "escaped" ? "text-green-400" : "text-red-400"}`}>
                {gameState === "escaped" ? "Escaped!" : "Failed!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl">
                {gameState === "escaped" ? "🎉" : "⏰"}
              </div>
              <p className="text-gray-300">
                {gameState === "escaped" 
                  ? `You escaped all rooms! Time remaining: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
                  : "Time ran out! You're trapped forever..."
                }
              </p>
              <Button onClick={startGame} className="w-full">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CodeEscape;
