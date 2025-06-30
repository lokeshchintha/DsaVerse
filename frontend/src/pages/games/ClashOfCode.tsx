
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Swords, Users, Clock, Trophy, Play, Zap, Code, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ClashOfCode = () => {
  const [gameMode, setGameMode] = useState<'fastest' | 'shortest' | 'reverse' | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [players, setPlayers] = useState([
    { id: 1, name: "CodeNinja", status: "coding", progress: 45, rank: 2 },
    { id: 2, name: "SpeedDemon", status: "finished", progress: 100, rank: 1 },
    { id: 3, name: "AlgoMaster", status: "coding", progress: 78, rank: 3 },
    { id: 4, name: "You", status: "coding", progress: 0, rank: 4 }
  ]);

  useEffect(() => {
    if (gameMode && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameMode, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startGame = (mode: 'fastest' | 'shortest' | 'reverse') => {
    setGameMode(mode);
    setTimeLeft(900);
    toast({
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Started! ⚔️`,
      description: "Battle has begun! Code your way to victory!"
    });
  };

  const gameModes = [
    {
      id: 'fastest',
      title: 'Fastest Mode',
      description: 'Be the first to solve the problem correctly',
      icon: Zap,
      color: 'from-yellow-600 to-orange-600',
      timeLimit: '15 minutes',
      players: '2-8 players'
    },
    {
      id: 'shortest',
      title: 'Shortest Mode', 
      description: 'Write the most concise code solution',
      icon: Code,
      color: 'from-green-600 to-emerald-600',
      timeLimit: '15 minutes',
      players: '2-8 players'
    },
    {
      id: 'reverse',
      title: 'Reverse Mode',
      description: 'Infer the logic from input/output examples only',
      icon: Eye,
      color: 'from-purple-600 to-pink-600',
      timeLimit: '15 minutes',
      players: '2-8 players'
    }
  ];

  const currentProblem = {
    title: "Two Sum",
    description: "Given an array of integers and a target sum, return the indices of two numbers that add up to the target.",
    examples: [
      { input: "[2,7,11,15], target = 9", output: "[0,1]" },
      { input: "[3,2,4], target = 6", output: "[1,2]" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Clash of Code ⚔️
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fast-paced coding battles for 2-8 players! Choose your mode and prove your coding superiority in real-time duels.
          </p>
        </div>

        {!gameMode ? (
          // Mode Selection
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: Swords, label: "Active Clashes", value: "342", color: "text-red-400" },
                { icon: Users, label: "Players Online", value: "8.2K", color: "text-blue-400" },
                { icon: Trophy, label: "Wins Today", value: "23", color: "text-yellow-400" },
                { icon: Clock, label: "Avg Duration", value: "8m", color: "text-green-400" }
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gameModes.map((mode) => (
                <Card key={mode.id} className="bg-black/60 backdrop-blur-lg border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-2xl group-hover:animate-pulse`}>
                        <mode.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-white text-center group-hover:text-red-300 transition-colors">
                      {mode.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-center">
                      {mode.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time Limit:</span>
                        <span className="text-white">{mode.timeLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Players:</span>
                        <span className="text-white">{mode.players}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => startGame(mode.id as any)}
                      className={`w-full bg-gradient-to-r ${mode.color} hover:shadow-lg font-bold transform transition-all duration-200 hover:scale-105`}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Join Battle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Game Interface
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Game Status */}
            <div className="lg:col-span-1">
              <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-400" />
                    Time Remaining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400 text-center mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress value={(timeLeft / 900) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Players ({players.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          player.status === 'finished' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className={`text-sm ${player.name === 'You' ? 'text-blue-400 font-bold' : 'text-white'}`}>
                          {player.name}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        #{player.rank}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Problem & Code Editor */}
            <div className="lg:col-span-3">
              <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{currentProblem.title}</CardTitle>
                    <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/50">
                      {gameMode?.charAt(0).toUpperCase() + gameMode?.slice(1)} Mode
                    </Badge>
                  </div>
                  <p className="text-gray-300">{currentProblem.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Examples:</h4>
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="bg-gray-800/50 p-3 rounded-lg mb-2">
                        <div className="text-sm">
                          <span className="text-gray-400">Input: </span>
                          <span className="text-green-400 font-mono">{example.input}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Output: </span>
                          <span className="text-blue-400 font-mono">{example.output}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg min-h-[300px] border border-gray-700">
                    <div className="text-gray-400 mb-2 text-sm">// Write your solution here...</div>
                    <div className="text-white font-mono">
                      function twoSum(nums, target) {`{`}<br />
                      &nbsp;&nbsp;// Your code here<br />
                      {`}`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Submit Solution
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Test Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClashOfCode;
