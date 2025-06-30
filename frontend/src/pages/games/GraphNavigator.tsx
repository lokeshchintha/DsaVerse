
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { 
  Network, Target, Clock, Trophy, Play, RotateCcw, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight
} from "lucide-react";

const GraphNavigator = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "completed">("menu");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 4, y: 4 });
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [path, setPath] = useState<Array<{x: number, y: number}>>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [algorithm, setAlgorithm] = useState<"dfs" | "bfs" | "dijkstra">("dfs");

  const levels = [
    {
      name: "Simple Grid",
      size: 5,
      obstacles: [],
      algorithm: "dfs",
      description: "Basic depth-first search on a grid"
    },
    {
      name: "Maze Navigation", 
      size: 6,
      obstacles: [{x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}],
      algorithm: "bfs", 
      description: "Breadth-first search around obstacles"
    },
    {
      name: "Weighted Paths",
      size: 7,
      obstacles: [{x: 1, y: 3}, {x: 4, y: 2}, {x: 3, y: 4}],
      algorithm: "dijkstra",
      description: "Find shortest weighted path"
    }
  ];

  const generateGraph = useCallback(() => {
    const level = levels[currentLevel];
    const nodes: Array<{x: number, y: number, weight: number}> = [];
    
    for (let x = 0; x < level.size; x++) {
      for (let y = 0; y < level.size; y++) {
        if (!level.obstacles.some(obs => obs.x === x && obs.y === y)) {
          nodes.push({
            x, y,
            weight: Math.floor(Math.random() * 5) + 1
          });
        }
      }
    }
    
    return nodes;
  }, [currentLevel]);

  const [graphNodes, setGraphNodes] = useState<Array<{x: number, y: number, weight: number}>>([]);

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
      
      const level = levels[currentLevel];
      if (newX < 0 || newX >= level.size || newY < 0 || newY >= level.size) {
        return prev;
      }
      
      if (level.obstacles.some(obs => obs.x === newX && obs.y === newY)) {
        return prev;
      }
      
      const nodeKey = `${newX},${newY}`;
      setVisitedNodes(visited => new Set([...visited, nodeKey]));
      setPath(currentPath => [...currentPath, {x: newX, y: newY}]);
      
      const node = graphNodes.find(n => n.x === newX && n.y === newY);
      if (node) {
        setScore(prev => prev + node.weight * 10);
      }
      
      if (newX === targetPos.x && newY === targetPos.y) {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(prev => prev + 1);
          setPlayerPos({x: 0, y: 0});
          setVisitedNodes(new Set());
          setPath([]);
        } else {
          setGameState("completed");
        }
      }
      
      return { x: newX, y: newY };
    });
  }, [gameState, currentLevel, targetPos, graphNodes]);

  const startGame = () => {
    setGameState("playing");
    setCurrentLevel(0);
    setPlayerPos({x: 0, y: 0});
    setTargetPos({x: 4, y: 4});
    setVisitedNodes(new Set(['0,0']));
    setPath([{x: 0, y: 0}]);
    setScore(0);
    setTimeLeft(180);
  };

  useEffect(() => {
    if (gameState === "playing") {
      setGraphNodes(generateGraph());
    }
  }, [gameState, currentLevel, generateGraph]);

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

  const currentLevel_data = levels[currentLevel];

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-black">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Graph Navigator 🗺️
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore graph algorithms through interactive navigation! Traverse nodes using DFS, BFS, and Dijkstra's algorithm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {levels.map((level, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-lg border-emerald-500/30">
                <CardHeader>
                  <CardTitle className="text-white">{level.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {level.algorithm.toUpperCase()}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-2">{level.description}</p>
                  <p className="text-emerald-400 text-xs">Grid: {level.size}x{level.size}</p>
                  <p className="text-orange-400 text-xs">Obstacles: {level.obstacles.length}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Play className="h-6 w-6 mr-2" />
              Start Graph Exploration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-black">
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
                <Trophy className="h-5 w-5 text-green-400" />
                <span className="text-white">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-emerald-400" />
                <span className="text-white">{visitedNodes.size} nodes</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300">
                {currentLevel_data.algorithm.toUpperCase()}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setGameState("menu")}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black/60 backdrop-blur-lg border-emerald-500/50">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Level {currentLevel + 1}: {currentLevel_data.name}
              </CardTitle>
              <p className="text-gray-300 text-center">{currentLevel_data.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1 w-fit mx-auto mb-6">
                {Array(currentLevel_data.size).fill(0).map((_, y) => (
                  <div key={y} className="flex gap-1">
                    {Array(currentLevel_data.size).fill(0).map((_, x) => {
                      const isPlayer = playerPos.x === x && playerPos.y === y;
                      const isTarget = targetPos.x === x && targetPos.y === y;
                      const isObstacle = currentLevel_data.obstacles.some(obs => obs.x === x && obs.y === y);
                      const isVisited = visitedNodes.has(`${x},${y}`);
                      const node = graphNodes.find(n => n.x === x && n.y === y);
                      
                      return (
                        <div
                          key={`${x}-${y}`}
                          className={`w-12 h-12 flex items-center justify-center text-xs font-bold border ${
                            isPlayer ? 'bg-blue-500 animate-pulse text-white' :
                            isTarget ? 'bg-red-500 text-white' :
                            isObstacle ? 'bg-gray-800 text-gray-600' :
                            isVisited ? 'bg-emerald-500/50 text-white' :
                            'bg-gray-600 text-gray-300'
                          }`}
                        >
                          {isPlayer ? '🤖' :
                           isTarget ? '🎯' :
                           isObstacle ? '🧱' :
                           node?.weight || ''}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Controls</h4>
                  <div className="grid grid-cols-3 gap-2">
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

                <div>
                  <h4 className="text-white font-medium mb-2">Path Info</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Current:</span>
                      <span className="text-white">({playerPos.x}, {playerPos.y})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Target:</span>
                      <span className="text-white">({targetPos.x}, {targetPos.y})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Path Length:</span>
                      <span className="text-white">{path.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Visited:</span>
                      <span className="text-white">{visitedNodes.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {gameState === "completed" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/90">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Navigation Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl">🗺️</div>
              <p className="text-gray-300">Final Score: {score}</p>
              <p className="text-gray-300">Nodes Visited: {visitedNodes.size}</p>
              <p className="text-gray-300">Path Length: {path.length}</p>
              <p className="text-gray-300">
                Efficiency: {Math.round((score / path.length) * 10) / 10} pts/step
              </p>
              <Button onClick={startGame} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Navigate Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GraphNavigator;
