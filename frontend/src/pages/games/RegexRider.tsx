
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Search, CheckCircle, XCircle, Clock, Trophy, Target, RotateCcw } from "lucide-react";

const RegexRider = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userRegex, setUserRegex] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const challenges = [
    {
      title: "Email Validation",
      description: "Match valid email addresses",
      difficulty: "Easy",
      testCases: [
        { text: "user@domain.com", shouldMatch: true },
        { text: "test.email@site.org", shouldMatch: true },
        { text: "invalid.email", shouldMatch: false },
        { text: "@domain.com", shouldMatch: false }
      ],
      hint: "Remember: username@domain.extension",
      solution: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    {
      title: "Phone Number",
      description: "Match phone numbers in format (XXX) XXX-XXXX",
      difficulty: "Medium",
      testCases: [
        { text: "(123) 456-7890", shouldMatch: true },
        { text: "(999) 888-7777", shouldMatch: true },
        { text: "123-456-7890", shouldMatch: false },
        { text: "(12) 345-6789", shouldMatch: false }
      ],
      hint: "Format: (digits) digits-digits",
      solution: /^\(\d{3}\) \d{3}-\d{4}$/
    },
    {
      title: "IP Address",
      description: "Match valid IPv4 addresses",
      difficulty: "Hard",
      testCases: [
        { text: "192.168.1.1", shouldMatch: true },
        { text: "10.0.0.1", shouldMatch: true },
        { text: "256.1.1.1", shouldMatch: false },
        { text: "192.168.1", shouldMatch: false }
      ],
      hint: "Four numbers (0-255) separated by dots",
      solution: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    },
    {
      title: "Password Strength",
      description: "Match strong passwords (8+ chars, uppercase, lowercase, number, special)",
      difficulty: "Expert",
      testCases: [
        { text: "MyPass123!", shouldMatch: true },
        { text: "StrongP@ss1", shouldMatch: true },
        { text: "weakpass", shouldMatch: false },
        { text: "NoSpecial123", shouldMatch: false }
      ],
      hint: "Must have all character types and 8+ length",
      solution: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
    {
      title: "HTML Tags",
      description: "Match HTML opening and closing tag pairs",
      difficulty: "Expert",
      testCases: [
        { text: "<div>content</div>", shouldMatch: true },
        { text: "<span>text</span>", shouldMatch: true },
        { text: "<div>content</span>", shouldMatch: false },
        { text: "<div>content", shouldMatch: false }
      ],
      hint: "Opening tag should match closing tag",
      solution: /<(\w+)>.*<\/\1>/
    }
  ];

  const testRegex = () => {
    if (!userRegex.trim()) return;
    
    try {
      const regex = new RegExp(userRegex);
      const challenge = challenges[currentChallenge];
      let correct = 0;
      
      challenge.testCases.forEach(testCase => {
        const matches = regex.test(testCase.text);
        if (matches === testCase.shouldMatch) {
          correct++;
        }
      });
      
      if (correct === challenge.testCases.length) {
        // All test cases passed
        const difficultyPoints = {
          Easy: 100,
          Medium: 200,
          Hard: 300,
          Expert: 500
        }[challenge.difficulty] || 100;
        
        setScore(prev => prev + difficultyPoints);
        setChallengesCompleted(prev => prev + 1);
        
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(prev => prev + 1);
          setUserRegex("");
        } else {
          setGameState("finished");
        }
      }
    } catch (error) {
      // Invalid regex
      console.log("Invalid regex pattern");
    }
  };

  const startGame = () => {
    setGameState("playing");
    setCurrentChallenge(0);
    setUserRegex("");
    setScore(0);
    setTimeLeft(300);
    setChallengesCompleted(0);
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
      testRegex();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Expert': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-black">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Regex Rider 🎯
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master regular expressions through progressive challenges! 
              From simple patterns to complex validation rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-lg border-pink-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm text-center">{challenge.title}</CardTitle>
                  <Badge variant="outline" className={`mx-auto text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-300 text-xs text-center">{challenge.description}</p>
                  <div className="mt-2 text-xs text-center">
                    <span className="text-pink-400">{challenge.testCases.length} test cases</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startGame} size="lg" className="bg-pink-600 hover:bg-pink-700">
              <Search className="h-6 w-6 mr-2" />
              Start Regex Challenge
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const challenge = challenges[currentChallenge];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-black">
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
                <Target className="h-5 w-5 text-pink-400" />
                <span className="text-white">{challengesCompleted}/{challenges.length}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setGameState("menu")}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-black/60 backdrop-blur-lg border-pink-500/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{challenge.title}</CardTitle>
                <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
              </div>
              <p className="text-gray-300">{challenge.description}</p>
              <p className="text-pink-400 text-sm">💡 {challenge.hint}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Regular Expression:
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center">
                    <span className="text-gray-400 mr-2 font-mono">/</span>
                    <Input
                      value={userRegex}
                      onChange={(e) => setUserRegex(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your regex pattern here..."
                      className="font-mono bg-gray-800 border-gray-700 text-white"
                      autoFocus
                    />
                    <span className="text-gray-400 ml-2 font-mono">/g</span>
                  </div>
                  <Button onClick={testRegex} className="bg-green-600 hover:bg-green-700">
                    <Search className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Test Cases:</h4>
                <div className="space-y-2">
                  {challenge.testCases.map((testCase, index) => {
                    let result = null;
                    let isCorrect = false;
                    
                    if (userRegex.trim()) {
                      try {
                        const regex = new RegExp(userRegex);
                        const matches = regex.test(testCase.text);
                        isCorrect = matches === testCase.shouldMatch;
                        result = matches;
                      } catch (error) {
                        result = "error";
                      }
                    }
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border ${
                          result === null ? 'border-gray-600 bg-gray-800/30' :
                          isCorrect ? 'border-green-500 bg-green-900/30' :
                          'border-red-500 bg-red-900/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-white">{testCase.text}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">
                              Should {testCase.shouldMatch ? 'match' : 'not match'}
                            </span>
                            {result !== null && (
                              <div className="flex items-center gap-1">
                                {isCorrect ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-400" />
                                )}
                                <span className="text-xs text-gray-300">
                                  {result === "error" ? "Error" : result ? "Match" : "No match"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-gray-800/30 rounded-lg">
                <h4 className="text-white font-medium mb-2">Regex Quick Reference:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="text-pink-400">. = any character</div>
                  <div className="text-pink-400">* = 0 or more</div>
                  <div className="text-pink-400">+ = 1 or more</div>
                  <div className="text-pink-400">? = 0 or 1</div>
                  <div className="text-pink-400">\d = digit</div>
                  <div className="text-pink-400">\w = word char</div>
                  <div className="text-pink-400">\s = whitespace</div>
                  <div className="text-pink-400">^ = start, $ = end</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {gameState === "finished" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-black/90">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">
                {challengesCompleted === challenges.length ? "All Patterns Mastered!" : "Time's Up!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl">
                {challengesCompleted === challenges.length ? "🎯" : "⏰"}
              </div>
              <p className="text-gray-300">Final Score: {score}</p>
              <p className="text-gray-300">Challenges Completed: {challengesCompleted}/{challenges.length}</p>
              <p className="text-gray-300">
                Success Rate: {Math.round((challengesCompleted / challenges.length) * 100)}%
              </p>
              <Button onClick={startGame} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Ride Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RegexRider;
