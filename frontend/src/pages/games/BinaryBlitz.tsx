
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Binary, Clock, Trophy, Zap, Target, RotateCcw } from "lucide-react";

const BinaryBlitz = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);
  const [mode, setMode] = useState<"decimal-to-binary" | "binary-to-decimal">("decimal-to-binary");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateQuestion = () => {
    if (mode === "decimal-to-binary") {
      setCurrentNumber(Math.floor(Math.random() * 255) + 1); // 1-255
    } else {
      const binaryLength = Math.floor(Math.random() * 6) + 3; // 3-8 bits
      const decimal = Math.floor(Math.random() * Math.pow(2, binaryLength));
      setCurrentNumber(decimal);
    }
    setUserInput("");
  };

  const checkAnswer = () => {
    let correct = false;
    
    if (mode === "decimal-to-binary") {
      const correctBinary = currentNumber.toString(2);
      correct = userInput === correctBinary;
    } else {
      const correctDecimal = currentNumber.toString();
      correct = userInput === correctDecimal;
    }
    
    if (correct) {
      const points = Math.floor(50 * (1 + streak * 0.1));
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    setQuestionsAnswered(prev => prev + 1);
    generateQuestion();
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    setQuestionsAnswered(0);
    generateQuestion();
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  const addBinaryDigit = (digit: string) => {
    if (mode === "decimal-to-binary") {
      setUserInput(prev => prev + digit);
    }
  };

  const clearInput = () => {
    setUserInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Binary Blitz ⚡
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master binary and decimal conversions at lightning speed! 
            Test your number system knowledge under pressure.
          </p>
        </div>

        {gameState === "menu" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Binary, label: "Number Systems", value: "2", color: "text-cyan-400" },
                { icon: Clock, label: "Time Limit", value: "60s", color: "text-yellow-400" },
                { icon: Target, label: "Max Range", value: "255", color: "text-green-400" },
                { icon: Zap, label: "Streak Bonus", value: "x10", color: "text-purple-400" }
              ].map((stat, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-lg border-gray-700/50">
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`h-10 w-10 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-black/60 backdrop-blur-lg border-cyan-500/50">
              <CardHeader>
                <CardTitle className="text-white text-center">Choose Game Mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${
                      mode === "decimal-to-binary" ? 'ring-2 ring-cyan-500 bg-cyan-900/20' : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => setMode("decimal-to-binary")}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="text-white font-bold mb-2">Decimal → Binary</h3>
                      <p className="text-gray-300 text-sm">Convert decimal numbers to binary</p>
                      <p className="text-cyan-400 text-xs mt-1">Example: 42 → 101010</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${
                      mode === "binary-to-decimal" ? 'ring-2 ring-cyan-500 bg-cyan-900/20' : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => setMode("binary-to-decimal")}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="text-white font-bold mb-2">Binary → Decimal</h3>
                      <p className="text-gray-300 text-sm">Convert binary numbers to decimal</p>
                      <p className="text-cyan-400 text-xs mt-1">Example: 101010 → 42</p>
                    </CardContent>
                  </Card>
                </div>

                <Button onClick={startGame} size="lg" className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Zap className="h-6 w-6 mr-2" />
                  Start Binary Blitz
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
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
                  <span className="text-white">x{streak}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300">
                {mode === "decimal-to-binary" ? "Dec → Bin" : "Bin → Dec"}
              </Badge>
            </div>

            <Card className="bg-black/60 backdrop-blur-lg border-cyan-500/50">
              <CardHeader>
                <CardTitle className="text-white text-center text-3xl">
                  {mode === "decimal-to-binary" ? (
                    <>Convert {currentNumber} to binary</>
                  ) : (
                    <>Convert {currentNumber.toString(2)} to decimal</>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-4xl font-mono text-center bg-gray-800 border-2 border-cyan-500 rounded-lg p-4 text-white w-64"
                    placeholder={mode === "decimal-to-binary" ? "Binary" : "Decimal"}
                    autoFocus
                  />
                </div>

                {mode === "decimal-to-binary" && (
                  <div className="flex justify-center gap-2">
                    <Button onClick={() => addBinaryDigit("0")} size="lg" variant="outline">
                      0
                    </Button>
                    <Button onClick={() => addBinaryDigit("1")} size="lg" variant="outline">
                      1
                    </Button>
                    <Button onClick={clearInput} size="lg" variant="outline">
                      Clear
                    </Button>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <Button onClick={checkAnswer} size="lg" className="bg-green-600 hover:bg-green-700">
                    Submit
                  </Button>
                  <Button onClick={generateQuestion} size="lg" variant="outline">
                    Skip
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-gray-800/50 rounded">
                    <div className="text-xl font-bold text-white">{questionsAnswered}</div>
                    <div className="text-sm text-gray-400">Questions</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded">
                    <div className="text-xl font-bold text-purple-400">{streak}</div>
                    <div className="text-sm text-gray-400">Streak</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded">
                    <div className="text-xl font-bold text-green-400">{Math.round((score / (questionsAnswered || 1)) || 0)}</div>
                    <div className="text-sm text-gray-400">Avg Points</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Quick Reference:</h4>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {[1, 2, 4, 8, 16, 32, 64, 128].map((power, index) => (
                      <div key={power} className="text-center p-2 bg-gray-700/50 rounded">
                        <div className="text-cyan-400">2^{index}</div>
                        <div className="text-white">{power}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black/90">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Time's Up!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-6xl">⚡</div>
                <p className="text-gray-300">Final Score: {score}</p>
                <p className="text-gray-300">Questions Answered: {questionsAnswered}</p>
                <p className="text-gray-300">Best Streak: {streak}</p>
                <p className="text-gray-300">
                  Accuracy: {questionsAnswered > 0 ? Math.round((score / (questionsAnswered * 50)) * 100) : 0}%
                </p>
                <Button onClick={startGame} className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinaryBlitz;
