
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { 
  Repeat, Trophy, Clock, Zap, RotateCcw, Play, 
  ChevronDown, ChevronUp, Target
} from "lucide-react";

const RecursionRunner = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu");
  const [currentProblem, setCurrentProblem] = useState(0);
  const [callStack, setCallStack] = useState<Array<{id: number, func: string, args: string, level: number}>>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [stackDepth, setStackDepth] = useState(0);
  const [maxDepth, setMaxDepth] = useState(0);

  const recursionProblems = [
    {
      name: "Factorial",
      description: "Calculate n! = n × (n-1)!",
      baseCase: "factorial(0) = 1",
      difficulty: "Easy",
      func: "factorial",
      examples: [
        { input: "5", output: "120", steps: 5 },
        { input: "3", output: "6", steps: 3 },
        { input: "4", output: "24", steps: 4 }
      ]
    },
    {
      name: "Fibonacci",
      description: "Find nth Fibonacci number",
      baseCase: "fib(0)=0, fib(1)=1",
      difficulty: "Medium",
      func: "fibonacci",
      examples: [
        { input: "5", output: "5", steps: 8 },
        { input: "6", output: "8", steps: 12 },
        { input: "4", output: "3", steps: 5 }
      ]
    },
    {
      name: "Binary Tree Height",
      description: "Calculate tree height recursively",
      baseCase: "height(null) = 0",
      difficulty: "Hard",
      func: "height",
      examples: [
        { input: "balanced_tree", output: "3", steps: 7 },
        { input: "left_skewed", output: "4", steps: 4 },
        { input: "single_node", output: "1", steps: 1 }
      ]
    },
    {
      name: "Tower of Hanoi",
      description: "Move disks between towers",
      baseCase: "hanoi(1) = 1 move",
      difficulty: "Expert",
      func: "hanoi",
      examples: [
        { input: "3", output: "7", steps: 15 },
        { input: "2", output: "3", steps: 7 },
        { input: "4", output: "15", steps: 31 }
      ]
    }
  ];

  const [currentExample, setCurrentExample] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const simulateRecursion = useCallback((func: string, input: string) => {
    const newStack: Array<{id: number, func: string, args: string, level: number}> = [];
    let id = 0;

    switch (func) {
      case "factorial":
        const n = parseInt(input);
        for (let i = n; i > 0; i--) {
          newStack.push({
            id: id++,
            func: `factorial(${i})`,
            args: `n=${i}`,
            level: n - i
          });
        }
        break;
      case "fibonacci":
        // Simplified visualization
        const fibN = parseInt(input);
        for (let i = 0; i <= fibN; i++) {
          newStack.push({
            id: id++,
            func: `fib(${i})`,
            args: `n=${i}`,
            level: i % 3
          });
        }
        break;
      default:
        newStack.push({
          id: 0,
          func: `${func}(${input})`,
          args: input,
          level: 0
        });
    }

    setCallStack(newStack);
    setMaxDepth(Math.max(maxDepth, newStack.length));
  }, [maxDepth]);

  const checkAnswer = () => {
    const problem = recursionProblems[currentProblem];
    const example = problem.examples[currentExample];
    
    if (userAnswer === example.output) {
      setScore(prev => prev + (100 * (problem.difficulty === "Easy" ? 1 : problem.difficulty === "Medium" ? 2 : problem.difficulty === "Hard" ? 3 : 4)));
      setCorrectAnswers(prev => prev + 1);
      
      if (currentExample < problem.examples.length - 1) {
        setCurrentExample(prev => prev + 1);
      } else if (currentProblem < recursionProblems.length - 1) {
        setCurrentProblem(prev => prev + 1);
        setCurrentExample(0);
      } else {
        setGameState("finished");
      }
      setUserAnswer("");
    }
  };

  const startGame = () => {
    setGameState("playing");
    setCurrentProblem(0);
    setCurrentExample(0);
    setCallStack([]);
    setScore(0);
    setTimeLeft(90);
    setCorrectAnswers(0);
    setStackDepth(0);
    setMaxDepth(0);
    setUserAnswer("");
  };

  useEffect(() => {
    if (gameState === "playing") {
      const problem = recursionProblems[currentProblem];
      const example = problem.examples[currentExample];
      simulateRecursion(problem.func, example.input);
    }
  }, [gameState, currentProblem, currentExample, simulateRecursion]);

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

  const currentProblemData = recursionProblems[currentProblem];
  const currentExampleData = currentProblemData?.examples[currentExample];

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Recursion Runner 🔄
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master recursive thinking! Visualize call stacks and trace through recursive algorithms step by step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {recursionProblems.map((problem, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-lg border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-center">{problem.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {problem.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-2">{problem.description}</p>
                  <p className="text-green-400 text-xs">{problem.baseCase}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
              <Play className="h-6 w-6 mr-2" />
              Start Recursion Training
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black">
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
                <Target className="h-5 w-5 text-blue-400" />
                <span className="text-white">{correctAnswers} solved</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setGameState("menu")}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-black/60 backdrop-blur-lg border-green-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Repeat className="h-5 w-5 text-green-400" />
                    Call Stack Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 min-h-[400px]">
                    {callStack.map((call, index) => (
                      <div
                        key={call.id}
                        className={`p-3 rounded border-l-4 border-green-500 bg-green-900/20 animate-in slide-in-from-right`}
                        style={{ marginLeft: `${call.level * 20}px` }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-green-400">{call.func}</span>
                          <span className="text-xs text-gray-400">Level {call.level}</span>
                        </div>
                        <div className="text-xs text-gray-300">{call.args}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-black/60 backdrop-blur-lg border-green-500/50">
                <CardHeader>
                  <CardTitle className="text-white">{currentProblemData?.name}</CardTitle>
                  <Badge variant="outline" className="bg-green-500/20 text-green-300">
                    {currentProblemData?.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm mb-2">{currentProblemData?.description}</p>
                    <p className="text-green-400 text-xs">{currentProblemData?.baseCase}</p>
                  </div>

                  {currentExampleData && (
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Current Problem:</h4>
                      <p className="text-green-400 font-mono">
                        {currentProblemData.func}({currentExampleData.input}) = ?
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Steps: {currentExampleData.steps}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Answer:
                    </label>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      placeholder="Enter the result..."
                    />
                  </div>

                  <Button onClick={checkAnswer} className="w-full bg-green-600 hover:bg-green-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Submit Answer
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border-green-500/50">
                <CardHeader>
                  <CardTitle className="text-white">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Problem:</span>
                    <span className="text-white">{currentProblem + 1}/{recursionProblems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Example:</span>
                    <span className="text-white">{currentExample + 1}/{currentProblemData?.examples.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Max Stack Depth:</span>
                    <span className="text-white">{maxDepth}</span>
                  </div>
                  <Progress 
                    value={((currentProblem * 3 + currentExample) / (recursionProblems.length * 3)) * 100} 
                    className="h-2"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {gameState === "finished" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/90">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Training Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl">🎯</div>
              <p className="text-gray-300">Final Score: {score}</p>
              <p className="text-gray-300">Problems Solved: {correctAnswers}</p>
              <p className="text-gray-300">Max Stack Depth: {maxDepth}</p>
              <Button onClick={startGame} className="w-full">
                Train Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RecursionRunner;
