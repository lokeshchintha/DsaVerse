
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Target, Clock, Trophy, Star, Play, CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const SoloPuzzles = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const puzzles = [
    {
      id: 1,
      title: "Temperatures",
      difficulty: "Easy",
      category: "Arrays",
      timeLimit: "30 min",
      solved: true,
      accuracy: 85.3,
      description: "Find the temperature closest to zero in an array of temperatures."
    },
    {
      id: 2,
      title: "Crazy List",
      difficulty: "Easy", 
      category: "Strings",
      timeLimit: "25 min",
      solved: false,
      accuracy: 72.1,
      description: "Sort a list of items based on custom criteria."
    },
    {
      id: 3,
      title: "Personal Best",
      difficulty: "Easy",
      category: "Logic",
      timeLimit: "20 min",
      solved: true,
      accuracy: 68.9,
      description: "Calculate the best score from a series of attempts."
    },
    {
      id: 4,
      title: "The Urinal Problem",
      difficulty: "Medium",
      category: "Algorithms",
      timeLimit: "45 min",
      solved: false,
      accuracy: 45.7,
      description: "Find optimal placement to maximize distance between occupied spots."
    },
    {
      id: 5,
      title: "Code Breaker Puzzle",
      difficulty: "Medium",
      category: "Logic",
      timeLimit: "60 min",
      solved: false,
      accuracy: 38.2,
      description: "Crack codes using pattern recognition and logical deduction."
    },
    {
      id: 6,
      title: "The Bridge",
      difficulty: "Hard",
      category: "Graph Theory",
      timeLimit: "90 min",
      solved: false,
      accuracy: 23.5,
      description: "Find the optimal path across a bridge with weight constraints."
    },
    {
      id: 7,
      title: "Shadows of the Knight - Episode 2",
      difficulty: "Very Hard",
      category: "Search Algorithms",
      timeLimit: "120 min",
      solved: false,
      accuracy: 12.3,
      description: "Advanced binary search with multiple constraints and obstacles."
    },
    {
      id: 8,
      title: "Mars Lander - Episode 3",
      difficulty: "Expert",
      category: "Physics Simulation",
      timeLimit: "180 min",
      solved: false,
      accuracy: 8.7,
      description: "Control a Mars lander with complex physics and fuel optimization."
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Very Hard': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'Expert': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const filteredPuzzles = selectedDifficulty === "all" 
    ? puzzles 
    : puzzles.filter(p => p.difficulty.toLowerCase().replace(' ', '-') === selectedDifficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Solo Puzzles Arena 🎯
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Challenge yourself with classic algorithmic and logic puzzles. 
            Progress from easy temperature calculations to expert-level space missions!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Target, label: "Total Puzzles", value: "100+", color: "text-blue-400" },
            { icon: Trophy, label: "Solved", value: "2", color: "text-green-400" },
            { icon: Clock, label: "Avg Time", value: "45m", color: "text-yellow-400" },
            { icon: Star, label: "Best Streak", value: "3", color: "text-purple-400" }
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

        {/* Difficulty Filter */}
        <Card className="mb-8 bg-black/40 backdrop-blur-lg border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Filter by Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["all", "easy", "medium", "hard", "very-hard", "expert"].map((diff) => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty(diff)}
                  className="capitalize"
                >
                  {diff === "very-hard" ? "Very Hard" : diff}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Puzzles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPuzzles.map((puzzle) => (
            <Card key={puzzle.id} className="bg-black/60 backdrop-blur-lg border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={getDifficultyColor(puzzle.difficulty)}>
                    {puzzle.difficulty}
                  </Badge>
                  {puzzle.solved ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-400" />
                  )}
                </div>
                <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                  {puzzle.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  {puzzle.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{puzzle.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time Limit:</span>
                    <span className="text-white">{puzzle.timeLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="text-white">{puzzle.accuracy}%</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Play className="h-4 w-4 mr-2" />
                  {puzzle.solved ? "Solve Again" : "Start Puzzle"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoloPuzzles;
