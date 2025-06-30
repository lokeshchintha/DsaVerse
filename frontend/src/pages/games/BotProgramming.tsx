
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Bot, Brain, Zap, Trophy, Play, Code, Eye, Settings } from "lucide-react";

const BotProgramming = () => {
  const [selectedArena, setSelectedArena] = useState(0);
  const [botCode, setBotCode] = useState(`// AI Bot Strategy
class MyBot {
  constructor() {
    this.strategy = 'aggressive';
  }
  
  makeMove(gameState) {
    // Implement your AI logic here
    return this.calculateBestMove(gameState);
  }
  
  calculateBestMove(state) {
    // Your algorithm here
    return { action: 'move', direction: 'forward' };
  }
}`);

  const arenas = [
    {
      id: 1,
      title: "Clash of Bots",
      description: "Program bots to fight in tactical combat scenarios",
      difficulty: "Medium",
      type: "Combat AI",
      participants: 1247,
      prize: "5000 XP",
      status: "active"
    },
    {
      id: 2,
      title: "Mad Pod Racing",
      description: "Build AI drivers for high-speed pod racing championships",
      difficulty: "Hard",
      type: "Racing AI",
      participants: 892,
      prize: "8000 XP",
      status: "active"
    },
    {
      id: 3,
      title: "Code a la Mode",
      description: "Cooperative AI for restaurant management and cooking",
      difficulty: "Expert",
      type: "Cooperation AI",
      participants: 634,
      prize: "12000 XP",
      status: "active"
    },
    {
      id: 4,
      title: "Seabed Security",
      description: "Underwater defense AI against mysterious threats",
      difficulty: "Legendary",
      type: "Defense AI",
      participants: 423,
      prize: "20000 XP",
      status: "tournament"
    }
  ];

  const botRankings = [
    { rank: 1, name: "DeepMindBot", rating: 2847, wins: 1432, creator: "AlgoMaster" },
    { rank: 2, name: "NeuralNinja", rating: 2756, wins: 1298, creator: "BotBuilder" },
    { rank: 3, name: "QuantumAI", rating: 2689, wins: 1156, creator: "CodeGuru" },
    { rank: 4, name: "MyBot", rating: 1456, wins: 234, creator: "You" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Expert': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'Legendary': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'tournament': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const currentArena = arenas[selectedArena];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bot Programming Arena 🤖
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build intelligent agents to compete in simulated environments! 
            Program AI bots with advanced strategies and watch them battle in real-time.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Bot, label: "Active Bots", value: "3.2K", color: "text-cyan-400" },
            { icon: Brain, label: "AI Algorithms", value: "127", color: "text-purple-400" },
            { icon: Zap, label: "Battles Today", value: "1,547", color: "text-yellow-400" },
            { icon: Trophy, label: "Your Rank", value: "#4", color: "text-green-400" }
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

        <Tabs defaultValue="arenas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="arenas">Battle Arenas</TabsTrigger>
            <TabsTrigger value="code">Bot Editor</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="replays">Replays</TabsTrigger>
          </TabsList>

          <TabsContent value="arenas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {arenas.map((arena, index) => (
                <Card 
                  key={arena.id} 
                  className={`bg-black/60 backdrop-blur-lg border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer ${
                    selectedArena === index ? 'border-cyan-500/50 bg-cyan-500/10' : ''
                  }`}
                  onClick={() => setSelectedArena(index)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={getDifficultyColor(arena.difficulty)}>
                        {arena.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(arena.status)}>
                        {arena.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white">{arena.title}</CardTitle>
                    <div className="text-sm text-cyan-400">{arena.type}</div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">
                      {arena.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Participants:</span>
                        <span className="text-white">{arena.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Prize Pool:</span>
                        <span className="text-yellow-400">{arena.prize}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Deploy Bot
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="h-5 w-5 text-cyan-400" />
                    Bot Code Editor - {currentArena.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Save & Deploy
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300">{currentArena.description}</p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={botCode}
                  onChange={(e) => setBotCode(e.target.value)}
                  className="min-h-[400px] font-mono bg-gray-900 border-gray-700 text-white"
                  placeholder="Write your AI bot code here..."
                />
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    Test Bot
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Global Bot Rankings - {currentArena.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {botRankings.map((bot) => (
                    <div key={bot.rank} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          bot.rank === 1 ? 'bg-yellow-500 text-black' :
                          bot.rank === 2 ? 'bg-gray-400 text-black' :
                          bot.rank === 3 ? 'bg-orange-500 text-black' :
                          'bg-gray-600 text-white'
                        }`}>
                          {bot.rank}
                        </div>
                        <div>
                          <div className={`font-medium ${bot.creator === 'You' ? 'text-cyan-400' : 'text-white'}`}>
                            {bot.name}
                          </div>
                          <div className="text-sm text-gray-400">by {bot.creator}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{bot.rating}</div>
                        <div className="text-sm text-gray-400">{bot.wins} wins</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="replays" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Battle Replays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((replay) => (
                    <div key={replay} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Battle #{replay + 42}</div>
                          <div className="text-sm text-gray-400">MyBot vs DeepMindBot</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-red-400">Defeat</div>
                          <div className="text-xs text-gray-500">2 hours ago</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Eye className="h-4 w-4 mr-2" />
                        Watch Replay
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BotProgramming;
