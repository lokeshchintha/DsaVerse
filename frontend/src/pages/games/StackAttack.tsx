
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { 
  Layers, Trophy, Clock, Zap, RotateCcw, Play, Plus, Minus
} from "lucide-react";

const StackAttack = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu");
  const [stack, setStack] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [operations, setOperations] = useState<string[]>([]);

  const stackOperations = [
    { name: "push(x)", desc: "Add element to top", points: 10 },
    { name: "pop()", desc: "Remove top element", points: 15 },
    { name: "peek()", desc: "View top element", points: 5 },
    { name: "isEmpty()", desc: "Check if empty", points: 8 },
    { name: "size()", desc: "Get stack size", points: 8 },
    { name: "clear()", desc: "Empty the stack", points: 20 }
  ];

  const generateOperation = useCallback(() => {
    const ops = stackOperations.filter(op => {
      if (op.name === "pop()" && stack.length === 0) return false;
      if (op.name === "peek()" && stack.length === 0) return false;
      return true;
    });
    
    return ops[Math.floor(Math.random() * ops.length)];
  }, [stack]);

  const executeOperation = (operation: string) => {
    const value = Math.floor(Math.random() * 100);
    let newStack = [...stack];
    let points = 0;
    let success = false;

    switch (operation) {
      case "push(x)":
        if (newStack.length < 10) {
          newStack.push(value.toString());
          points = 10;
          success = true;
        }
        break;
      case "pop()":
        if (newStack.length > 0) {
          newStack.pop();
          points = 15;
          success = true;
        }
        break;
      case "peek()":
        if (newStack.length > 0) {
          points = 5;
          success = true;
        }
        break;
      case "isEmpty()":
        points = 8;
        success = true;
        break;
      case "size()":
        points = 8;
        success = true;
        break;
      case "clear()":
        newStack = [];
        points = 20;
        success = true;
        break;
    }

    if (success) {
      setStack(newStack);
      const multiplier = Math.max(1, combo / 5 + 1);
      setScore(prev => prev + Math.floor(points * multiplier));
      setCombo(prev => prev + 1);
    } else {
      setCombo(0);
    }
  };

  const startGame = () => {
    setStack([]);
    setScore(0);
    setTimeLeft(120);
    setLevel(1);
    setCombo(0);
    setOperations([]);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        const op = generateOperation();
        setCurrentOperation(op.name);
      }, 2000 - (level * 100));

      return () => clearInterval(interval);
    }
  }, [gameState, level, generateOperation]);

  const resetGame = () => {
    setGameState("menu");
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Stack Attack 📚
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Master stack operations by executing commands as fast as possible! Build combos for higher scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stackOperations.map((op, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-lg border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{op.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-2">{op.desc}</p>
                  <p className="text-purple-400 font-bold">+{op.points} points</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Play className="h-6 w-6 mr-2" />
              Start Stacking
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
                <span className="text-white">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-400" />
                <span className="text-white">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                <span className="text-white">x{combo}</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Stack Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 min-h-[300px] flex flex-col-reverse">
                  {stack.map((item, index) => (
                    <div
                      key={index}
                      className="bg-purple-600 text-white p-3 rounded text-center font-mono animate-in slide-in-from-bottom"
                    >
                      {item}
                    </div>
                  ))}
                  {stack.length === 0 && (
                    <div className="text-gray-500 text-center py-20">
                      Stack is empty
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white">Current Operation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-4">
                    {currentOperation || "Waiting..."}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {stackOperations.map((op, index) => (
                      <Button
                        key={index}
                        onClick={() => executeOperation(op.name)}
                        disabled={currentOperation !== op.name}
                        className={`${
                          currentOperation === op.name 
                            ? 'bg-purple-600 hover:bg-purple-700 animate-pulse' 
                            : 'bg-gray-600'
                        }`}
                      >
                        {op.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-800 rounded">
                  <h4 className="text-white font-semibold mb-2">Stack Info:</h4>
                  <p className="text-gray-300">Size: {stack.length}</p>
                  <p className="text-gray-300">Top: {stack[stack.length - 1] || "empty"}</p>
                  <p className="text-gray-300">Empty: {stack.length === 0 ? "true" : "false"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {gameState === "finished" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/90">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Game Over!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300">Final Score: {score}</p>
              <p className="text-gray-300">Max Combo: {combo}</p>
              <p className="text-gray-300">Operations: {operations.length}</p>
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

export default StackAttack;
