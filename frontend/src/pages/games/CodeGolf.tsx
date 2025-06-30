
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Code2, Trophy, Target, Users, Play, Send, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CodeGolf = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState(0);

  const challenges = [
    {
      id: 1,
      title: "Hello World",
      description: "Output 'Hello, World!' to the console",
      difficulty: "Easy",
      bestScore: 18,
      yourBest: 25,
      leaderboard: [
        { rank: 1, name: "GolfMaster", score: 13, language: "Perl" },
        { rank: 2, name: "CodeNinja", score: 15, language: "Python" },
        { rank: 3, name: "ShortStack", score: 18, language: "JS" }
      ]
    },
    {
      id: 2,
      title: "FizzBuzz",
      description: "Print numbers 1-100, but 'Fizz' for multiples of 3, 'Buzz' for 5, 'FizzBuzz' for both",
      difficulty: "Medium",
      bestScore: 67,
      yourBest: null,
      leaderboard: [
        { rank: 1, name: "FizzGuru", score: 67, language: "Perl" },
        { rank: 2, name: "BuzzKill", score: 72, language: "Python" },
        { rank: 3, name: "LoopLord", score: 89, language: "Ruby" }
      ]
    },
    {
      id: 3,
      title: "Prime Checker",
      description: "Check if a given number is prime",
      difficulty: "Hard",
      bestScore: 42,
      yourBest: null,
      leaderboard: [
        { rank: 1, name: "PrimePro", score: 42, language: "Haskell" },
        { rank: 2, name: "MathWiz", score: 48, language: "Python" },
        { rank: 3, name: "AlgoAce", score: 51, language: "C" }
      ]
    }
  ];

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "ruby", label: "Ruby" },
    { value: "perl", label: "Perl" },
    { value: "haskell", label: "Haskell" }
  ];

  const submitCode = () => {
    if (!code.trim()) {
      toast({
        title: "Code Required",
        description: "Please write some code before submitting!",
        variant: "destructive"
      });
      return;
    }

    const charCount = code.length;
    toast({
      title: "Code Submitted! ⛳",
      description: `Your solution: ${charCount} characters. Check the leaderboard!`
    });
    setCode("");
  };

  const resetCode = () => {
    setCode("");
    toast({
      title: "Code Reset",
      description: "Editor cleared. Ready for a new approach!"
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const currentChallenge = challenges[selectedChallenge];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Code Golf Championship ⛳
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Write the shortest possible code to solve programming challenges. 
            Every character counts in this ultimate test of code efficiency!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Code2, label: "Total Challenges", value: "50+", color: "text-green-400" },
            { icon: Trophy, label: "Best Rank", value: "#12", color: "text-yellow-400" },
            { icon: Target, label: "Solved", value: "1", color: "text-blue-400" },
            { icon: Users, label: "Players", value: "5.2K", color: "text-purple-400" }
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge List */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenges.map((challenge, index) => (
                  <div
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(index)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedChallenge === index
                        ? 'border-green-500/50 bg-green-500/20'
                        : 'border-gray-700/50 hover:border-green-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{challenge.title}</h3>
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{challenge.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Best: {challenge.bestScore} chars</span>
                      {challenge.yourBest && (
                        <span className="text-green-400">Your: {challenge.yourBest} chars</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{currentChallenge.title}</CardTitle>
                  <Badge variant="outline" className={getDifficultyColor(currentChallenge.difficulty)}>
                    {currentChallenge.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-300">{currentChallenge.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Character Count</label>
                    <div className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white">
                      {code.length} characters
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Code</label>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your shortest solution here..."
                    className="min-h-[300px] font-mono bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={submitCode} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Solution
                  </Button>
                  <Button onClick={resetCode} variant="outline" className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="mt-6 bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Leaderboard - {currentChallenge.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentChallenge.leaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.rank === 1 ? 'bg-yellow-500 text-black' :
                          entry.rank === 2 ? 'bg-gray-400 text-black' :
                          entry.rank === 3 ? 'bg-orange-500 text-black' :
                          'bg-gray-600 text-white'
                        }`}>
                          {entry.rank}
                        </div>
                        <div>
                          <div className="font-medium text-white">{entry.name}</div>
                          <div className="text-sm text-gray-400">{entry.language}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-400">
                        {entry.score} chars
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGolf;
