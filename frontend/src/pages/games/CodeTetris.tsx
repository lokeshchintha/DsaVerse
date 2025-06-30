
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { 
  Square, RotateCw, ArrowDown, ArrowLeft, ArrowRight, 
  Trophy, Clock, Zap, RotateCcw, Play, Pause 
} from "lucide-react";

const CodeTetris = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameOver">("menu");
  const [grid, setGrid] = useState<string[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600);

  const tetrominoShapes = {
    I: { shape: [[1,1,1,1]], color: "bg-cyan-500" },
    O: { shape: [[1,1],[1,1]], color: "bg-yellow-500" },
    T: { shape: [[0,1,0],[1,1,1]], color: "bg-purple-500" },
    S: { shape: [[0,1,1],[1,1,0]], color: "bg-green-500" },
    Z: { shape: [[1,1,0],[0,1,1]], color: "bg-red-500" },
    J: { shape: [[1,0,0],[1,1,1]], color: "bg-blue-500" },
    L: { shape: [[0,0,1],[1,1,1]], color: "bg-orange-500" }
  };

  const initializeGrid = () => {
    return Array(20).fill(null).map(() => Array(10).fill(""));
  };

  const generatePiece = () => {
    const shapes = Object.keys(tetrominoShapes);
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    return {
      shape: tetrominoShapes[randomShape].shape,
      color: tetrominoShapes[randomShape].color,
      x: 4,
      y: 0
    };
  };

  const startGame = () => {
    setGrid(initializeGrid());
    setCurrentPiece(generatePiece());
    setScore(0);
    setLines(0);
    setLevel(1);
    setTimeLeft(600);
    setGameState("playing");
  };

  const movePiece = useCallback((direction: string) => {
    if (gameState !== "playing" || !currentPiece) return;
    
    setCurrentPiece(prev => {
      if (!prev) return prev;
      let newX = prev.x;
      let newY = prev.y;
      
      switch (direction) {
        case 'left': newX--; break;
        case 'right': newX++; break;
        case 'down': newY++; break;
      }
      
      return { ...prev, x: newX, y: newY };
    });
  }, [gameState, currentPiece]);

  const rotatePiece = () => {
    if (!currentPiece) return;
    const rotated = currentPiece.shape[0].map((_, i) => 
      currentPiece.shape.map(row => row[i]).reverse()
    );
    setCurrentPiece(prev => ({ ...prev, shape: rotated }));
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("gameOver");
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
        case 'ArrowLeft': movePiece('left'); break;
        case 'ArrowRight': movePiece('right'); break;
        case 'ArrowDown': movePiece('down'); break;
        case 'ArrowUp': case ' ': rotatePiece(); break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece]);

  const renderGrid = () => {
    return grid.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            className={`w-6 h-6 border border-gray-600 ${
              cell || (currentPiece && 
                currentPiece.shape.some((pieceRow, py) =>
                  pieceRow.some((pieceCell, px) =>
                    pieceCell && 
                    currentPiece.x + px === x && 
                    currentPiece.y + py === y
                  )
                )) ? currentPiece?.color || 'bg-gray-400' : 'bg-gray-900'
            }`}
          />
        ))}
      </div>
    ));
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Code Tetris 🧩
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master coding concepts while playing Tetris! Each piece represents different programming constructs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(tetrominoShapes).map(([key, piece]) => (
              <Card key={key} className="bg-black/40 backdrop-blur-lg border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-center">{key} Piece</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="grid gap-1">
                    {piece.shape.map((row, y) => (
                      <div key={y} className="flex gap-1">
                        {row.map((cell, x) => (
                          <div
                            key={x}
                            className={`w-6 h-6 ${cell ? piece.color : 'bg-transparent'}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Play className="h-6 w-6 mr-2" />
              Start Coding Tetris
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
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
                <Zap className="h-5 w-5 text-purple-400" />
                <span className="text-white">Level {level}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setGameState(gameState === "paused" ? "playing" : "paused")}>
                {gameState === "paused" ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setGameState("menu")}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Square className="h-5 w-5" />
                    Game Board
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="border-2 border-purple-500 p-2 bg-black/80">
                    {renderGrid()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-white">Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => movePiece('left')}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => movePiece('right')}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => movePiece('down')}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={rotatePiece}>
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-white">Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lines:</span>
                    <span className="text-white">{lines}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Level:</span>
                    <span className="text-white">{level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Score:</span>
                    <span className="text-white">{score}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {gameState === "gameOver" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/90">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Game Over!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300">Final Score: {score}</p>
              <p className="text-gray-300">Lines Cleared: {lines}</p>
              <p className="text-gray-300">Level Reached: {level}</p>
              <Button onClick={startGame} className="w-full">
                Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CodeTetris;
