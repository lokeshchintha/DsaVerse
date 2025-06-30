
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Bug, Search, CheckCircle, XCircle, Clock, Trophy, Target } from "lucide-react";

const BugHuntArena = () => {
  const [currentBug, setCurrentBug] = useState(0);
  const [userSolution, setUserSolution] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [bugsFound, setBugsFound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const bugChallenges = [
    {
      id: 1,
      title: "Array Index Bug",
      difficulty: "Easy",
      code: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
      bug: "Array index out of bounds",
      solution: "Change i <= arr.length to i < arr.length",
      points: 100
    },
    {
      id: 2,
      title: "Infinite Loop",
      difficulty: "Medium",
      code: `function countdown(n) {
  while (n > 0) {
    console.log(n);
    n++;
  }
  console.log("Done!");
}`,
      bug: "Increment instead of decrement",
      solution: "Change n++ to n--",
      points: 200
    },
    {
      id: 3,
      title: "Type Coercion Bug",
      difficulty: "Hard",
      code: `function addNumbers(a, b) {
  return a + b;
}
console.log(addNumbers("5", 3)); // Expected: 8, Got: "53"`,
      bug: "String concatenation instead of addition",
      solution: "Convert strings to numbers: return Number(a) + Number(b)",
      points: 300
    }
  ];

  useEffect(() => {
    if (!gameStarted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted]);

  const checkSolution = () => {
    const challenge = bugChallenges[currentBug];
    const isCorrect = userSolution.toLowerCase().includes(challenge.solution.toLowerCase().split(' ')[0]);
    
    if (isCorrect) {
      setScore(prev => prev + challenge.points);
      setBugsFound(prev => prev + 1);
      setUserSolution("");
      if (currentBug < bugChallenges.length - 1) {
        setCurrentBug(prev => prev + 1);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentBug(0);
    setScore(0);
    setBugsFound(0);
    setTimeLeft(300);
    setUserSolution("");
  };

  const currentChallenge = bugChallenges[currentBug];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Bug Hunt Arena 🐛
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track down and fix bugs in code snippets as fast as possible! 
            Each bug you catch brings you closer to becoming a debugging master.
          </p>
        </div>

        {!gameStarted ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Bug, label: "Bugs to Hunt", value: bugChallenges.length, color: "text-red-400" },
                { icon: Clock, label: "Time Limit", value: "5 min", color: "text-yellow-400" },
                { icon: Trophy, label: "Max Points", value: "600", color: "text-green-400" }
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

            <div className="text-center">
              <Button onClick={startGame} size="lg" className="bg-red-600 hover:bg-red-700">
                <Search className="h-6 w-6 mr-2" />
                Start Bug Hunt
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-black/60 backdrop-blur-lg border-red-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bug className="h-5 w-5 text-red-400" />
                      {currentChallenge.title}
                    </CardTitle>
                    <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/50">
                      {currentChallenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                      {currentChallenge.code}
                    </pre>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Describe the bug and your fix:
                    </label>
                    <Textarea
                      value={userSolution}
                      onChange={(e) => setUserSolution(e.target.value)}
                      placeholder="What's the bug? How would you fix it?"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <Button onClick={checkSolution} className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Fix
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-black/60 backdrop-blur-lg border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    Game Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-400">Time Remaining</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Score:</span>
                      <span className="text-white">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Bugs Found:</span>
                      <span className="text-white">{bugsFound}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Progress:</span>
                      <span className="text-white">{currentBug + 1}/{bugChallenges.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-white">Bug Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["Logic Errors", "Syntax Bugs", "Runtime Errors", "Performance Issues"].map((category, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded">
                        <Target className="h-4 w-4 text-red-400" />
                        <span className="text-gray-300 text-sm">{category}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {timeLeft === 0 && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black/90">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Hunt Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-300">Final Score: {score}</p>
                <p className="text-gray-300">Bugs Found: {bugsFound}</p>
                <Button onClick={startGame} className="w-full">
                  Hunt Again
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BugHuntArena;
