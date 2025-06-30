
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Gauge, Clock, Cpu, HardDrive, Trophy, Play, BarChart3 } from "lucide-react";

const OptimizationChallenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);

  const challenges = [
    {
      id: 1,
      title: "Mars Lander",
      description: "Land your spacecraft safely while optimizing fuel consumption and landing precision",
      difficulty: "Hard",
      type: "Physics Simulation",
      metrics: {
        runtime: 85,
        memory: 72,
        fuelEfficiency: 91,
        precision: 78
      },
      bestScores: {
        runtime: "12.3ms",
        memory: "2.1MB",
        fuel: "89.5%",
        precision: "±0.2m"
      },
      yourScores: {
        runtime: "18.7ms",
        memory: "3.4MB", 
        fuel: "76.2%",
        precision: "±1.8m"
      }
    },
    {
      id: 2,
      title: "Travelling Salesman",
      description: "Find the shortest route visiting all cities exactly once",
      difficulty: "Expert",
      type: "Graph Optimization",
      metrics: {
        runtime: 64,
        memory: 89,
        pathLength: 82,
        efficiency: 71
      },
      bestScores: {
        runtime: "2.1s",
        memory: "512KB",
        path: "1,247km",
        efficiency: "98.2%"
      },
      yourScores: {
        runtime: "3.8s",
        memory: "1.2MB",
        path: "1,398km", 
        efficiency: "85.7%"
      }
    },
    {
      id: 3,
      title: "SameGame",
      description: "Remove connected groups of same-colored blocks to maximize score",
      difficulty: "Medium",
      type: "Heuristic Optimization",
      metrics: {
        runtime: 93,
        memory: 95,
        score: 67,
        efficiency: 74
      },
      bestScores: {
        runtime: "5.2ms",
        memory: "128KB",
        score: "89,450",
        efficiency: "92.1%"
      },
      yourScores: {
        runtime: "8.9ms",
        memory: "256KB",
        score: "67,230",
        efficiency: "78.4%"
      }
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Expert': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const currentChallenge = challenges[selectedChallenge];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Optimization Arena ⚡
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the art of algorithmic optimization! Score based on runtime, memory usage, and solution quality.
            Every millisecond and byte counts!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Gauge, label: "Challenges", value: "25", color: "text-orange-400" },
            { icon: Clock, label: "Best Runtime", value: "12.3ms", color: "text-green-400" },
            { icon: Cpu, label: "Avg Efficiency", value: "84.2%", color: "text-blue-400" },
            { icon: HardDrive, label: "Memory Saved", value: "2.1GB", color: "text-purple-400" }
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
                <CardTitle className="text-white">Optimization Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenges.map((challenge, index) => (
                  <div
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(index)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedChallenge === index
                        ? 'border-orange-500/50 bg-orange-500/20'
                        : 'border-gray-700/50 hover:border-orange-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{challenge.title}</h3>
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{challenge.description}</p>
                    <div className="text-xs text-gray-500">{challenge.type}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Challenge Details */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{currentChallenge.title}</CardTitle>
                  <Badge variant="outline" className={getDifficultyColor(currentChallenge.difficulty)}>
                    {currentChallenge.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-300">{currentChallenge.description}</p>
                <div className="text-sm text-gray-400">{currentChallenge.type}</div>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Optimization Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-400" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(currentChallenge.metrics).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`font-bold ${getMetricColor(value)}`}>{value}%</span>
                    </div>
                    <Progress 
                      value={value} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Score Comparison */}
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Score Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-green-400 font-semibold mb-3">World Best</h4>
                    <div className="space-y-2">
                      {Object.entries(currentChallenge.bestScores).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400 capitalize">{key}:</span>
                          <span className="text-green-400 font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-3">Your Best</h4>
                    <div className="space-y-2">
                      {Object.entries(currentChallenge.yourScores).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400 capitalize">{key}:</span>
                          <span className="text-blue-400 font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationChallenges;
