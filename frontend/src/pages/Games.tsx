import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { 
  Gamepad2, Trophy, Users, Clock, Star, Play, 
  Grid3X3, Bug, Sword, Car, Lock, Zap, Map, Layers,
  Repeat, BarChart3, Binary, Network, Search, Crown,
  Target, Code2, Gauge, Swords, Bot, Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";
import { toast } from "@/hooks/use-toast";

const Games = () => {
  const games = [
    {
      id: "code-tetris",
      title: "Code Tetris",
      description: "Stack algorithm blocks and clear lines to optimize your code!",
      category: "Puzzle",
      difficulty: "Medium",
      players: "Single Player",
      estimatedTime: "15-30 min",
      icon: Grid3X3,
      color: "from-purple-600 to-pink-600",
      shadowColor: "shadow-purple-500/50",
      route: "/games/code-tetris",
      locked: false,
      features: ["4 Game Modes", "Algorithm Pieces", "Particle Effects", "Progressive Difficulty"]
    },
    {
      id: "bug-hunt-arena",
      title: "Bug Hunt Arena",
      description: "Track and eliminate code bugs in their natural habitat!",
      category: "Debugging",
      difficulty: "Hard",
      players: "Single Player", 
      estimatedTime: "5-10 min",
      icon: Bug,
      color: "from-green-600 to-emerald-600",
      shadowColor: "shadow-green-500/50",
      route: "/games/bug-hunt-arena",
      locked: false,
      features: ["4 Hunt Modes", "6 Bug Types", "Streak System", "Realistic Bugs"]
    },
    {
      id: "dsa-boss-battles",
      title: "DSA Boss Battles",
      description: "Fight legendary algorithmic bosses with your coding mastery!",
      category: "RPG",
      difficulty: "Expert",
      players: "Single Player",
      estimatedTime: "10-20 min",
      icon: Sword,
      color: "from-red-600 to-orange-600", 
      shadowColor: "shadow-red-500/50",
      route: "/games/dsa-boss-battles",
      locked: false,
      features: ["6 Epic Bosses", "5 Battle Modes", "Combat System", "Boss Abilities"]
    },
    {
      id: "algorithm-racing",
      title: "Algorithm Racing",
      description: "Code your way to victory on algorithmic race tracks!",
      category: "Racing",
      difficulty: "Medium",
      players: "Single Player",
      estimatedTime: "10-15 min",
      icon: Car,
      color: "from-blue-600 to-cyan-600",
      shadowColor: "shadow-blue-500/50",
      route: "/games/algorithm-racing",
      locked: false,
      features: ["5 Race Tracks", "Performance System", "Fuel Management", "Speed Optimization"]
    },
    {
      id: "code-escape",
      title: "Code Escape Room",
      description: "Solve algorithmic puzzles to escape before time runs out!",
      category: "Puzzle",
      difficulty: "Hard",
      players: "Single Player",
      estimatedTime: "20-30 min",
      icon: Lock,
      color: "from-cyan-600 to-blue-600",
      shadowColor: "shadow-cyan-500/50",
      route: "/games/code-escape",
      locked: false,
      features: ["5 Escape Rooms", "4 Difficulty Modes", "Hint System", "Inventory Items"]
    },
    {
      id: "neural-network-wars",
      title: "Neural Network Wars",
      description: "Train AI models to battle in epic algorithmic combat!",
      category: "Strategy",
      difficulty: "Legendary",
      players: "Single/Multi",
      estimatedTime: "30-60 min",
      icon: Zap,
      color: "from-yellow-600 to-amber-600",
      shadowColor: "shadow-yellow-500/50",
      route: "/games/neural-network-wars",
      locked: false,
      features: ["AI Training", "Model Battles", "Neural Architecture", "Real-time Visualization"]
    },
    {
      id: "code-maze",
      title: "Code Maze Explorer",
      description: "Navigate through algorithmic mazes and collect code fragments!",
      category: "Adventure",
      difficulty: "Medium",
      players: "Single Player",
      estimatedTime: "15-25 min",
      icon: Map,
      color: "from-teal-600 to-green-600",
      shadowColor: "shadow-teal-500/50",
      route: "/games/code-maze",
      locked: false,
      features: ["4 Maze Types", "Code Collection", "Time Challenges", "Path Finding"]
    },
    {
      id: "stack-attack",
      title: "Stack Attack",
      description: "Master stack operations by executing commands at blazing speed!",
      category: "Action",
      difficulty: "Medium",
      players: "Single Player",
      estimatedTime: "10-15 min",
      icon: Layers,
      color: "from-indigo-600 to-purple-600",
      shadowColor: "shadow-indigo-500/50",
      route: "/games/stack-attack",
      locked: false,
      features: ["Stack Operations", "Combo System", "Speed Challenges", "Visual Stack"]
    },
    {
      id: "recursion-runner",
      title: "Recursion Runner",
      description: "Trace through recursive function calls and predict outputs!",
      category: "Logic",
      difficulty: "Hard",
      players: "Single Player",
      estimatedTime: "20-30 min",
      icon: Repeat,
      color: "from-emerald-600 to-teal-600",
      shadowColor: "shadow-emerald-500/50",
      route: "/games/recursion-runner",
      locked: false,
      features: ["Call Stack Viz", "4 Problem Types", "Execution Tracing", "Base Cases"]
    },
    {
      id: "sorting-showdown",
      title: "Sorting Showdown",
      description: "Watch sorting algorithms battle it out in visual duels!",
      category: "Educational",
      difficulty: "Medium",
      players: "Single Player",
      estimatedTime: "15-20 min",
      icon: BarChart3,
      color: "from-pink-600 to-rose-600",
      shadowColor: "shadow-pink-500/50",
      route: "/games/sorting-showdown",
      locked: false,
      features: ["5 Algorithms", "Live Animation", "Performance Metrics", "Comparison Mode"]
    },
    {
      id: "binary-blitz",
      title: "Binary Blitz",
      description: "Lightning-fast binary number conversions and operations!",
      category: "Speed",
      difficulty: "Easy",
      players: "Single Player",
      estimatedTime: "5-10 min",
      icon: Binary,
      color: "from-sky-600 to-blue-600",
      shadowColor: "shadow-sky-500/50",
      route: "/games/binary-blitz",
      locked: false,
      features: ["5 Game Modes", "Bitwise Ops", "Speed Rounds", "Streak System"]
    },
    {
      id: "graph-navigator",
      title: "Graph Navigator",
      description: "Explore graph traversal algorithms in interactive networks!",
      category: "Exploration",
      difficulty: "Hard",
      players: "Single Player",
      estimatedTime: "25-35 min",
      icon: Network,
      color: "from-violet-600 to-purple-600",
      shadowColor: "shadow-violet-500/50",
      route: "/games/graph-navigator",
      locked: false,
      features: ["4 Algorithms", "Path Visualization", "Dynamic Graphs", "BFS/DFS/Dijkstra/A*"]
    },
    {
      id: "regex-rider",
      title: "Regex Rider",
      description: "Master regular expressions through pattern matching challenges!",
      category: "Pattern",
      difficulty: "Expert",
      players: "Single Player",
      estimatedTime: "20-40 min",
      icon: Search,
      color: "from-amber-600 to-yellow-600",
      shadowColor: "shadow-amber-500/50",
      route: "/games/regex-rider",
      locked: false,
      features: ["4 Difficulty Levels", "Pattern Challenges", "Regex Builder", "Test Strings"]
    },
    {
      id: "solo-puzzles",
      title: "Solo Puzzles",
      description: "Classic training problems - algorithmic and logic puzzles by difficulty!",
      category: "Puzzle",
      difficulty: "Various",
      players: "Single Player",
      estimatedTime: "10-60 min",
      icon: Target,
      color: "from-purple-600 to-blue-600",
      shadowColor: "shadow-purple-500/50",
      route: "/games/solo-puzzles",
      locked: false,
      features: ["Easy to Expert", "100+ Puzzles", "Logic Training", "Progressive Difficulty"]
    },
    {
      id: "code-golf",
      title: "Code Golf",
      description: "Challenge yourself to write the shortest possible code to solve puzzles!",
      category: "Optimization",
      difficulty: "Expert",
      players: "Single Player",
      estimatedTime: "15-45 min",
      icon: Code2,
      color: "from-green-600 to-teal-600",
      shadowColor: "shadow-green-500/50",
      route: "/games/code-golf",
      locked: false,
      features: ["Character Count", "Multiple Languages", "Leaderboards", "Code Sharing"]
    },
    {
      id: "optimization-challenges",
      title: "Optimization Challenges",
      description: "Tackle problems where scoring depends on runtime and memory usage!",
      category: "Performance",
      difficulty: "Hard",
      players: "Single Player",
      estimatedTime: "20-60 min",
      icon: Gauge,
      color: "from-orange-600 to-red-600",
      shadowColor: "shadow-orange-500/50",
      route: "/games/optimization-challenges",
      locked: false,
      features: ["Runtime Scoring", "Memory Analysis", "Heuristic Quality", "Performance Metrics"]
    },
    {
      id: "clash-of-code",
      title: "Clash of Code",
      description: "Fast-paced contests for 2-8 players in three engaging modes!",
      category: "Multiplayer",
      difficulty: "Medium",
      players: "2-8 Players",
      estimatedTime: "1-15 min",
      icon: Swords,
      color: "from-red-600 to-pink-600",
      shadowColor: "shadow-red-500/50",
      route: "/games/clash-of-code",
      locked: false,
      features: ["Fastest Mode", "Shortest Mode", "Reverse Mode", "Real-time Battles"]
    },
    {
      id: "bot-programming",
      title: "Bot Programming",
      description: "Build intelligent agents to compete in simulated environments!",
      category: "AI",
      difficulty: "Legendary",
      players: "Single/Multi",
      estimatedTime: "60-180 min",
      icon: Bot,
      color: "from-cyan-600 to-purple-600",
      shadowColor: "shadow-cyan-500/50",
      route: "/games/bot-programming",
      locked: false,
      features: ["AI Agents", "Live Replays", "Strategy Building", "Tournament Mode"]
    },
    {
      id: "global-contests",
      title: "Global Contests",
      description: "Time-limited events with XP, leaderboards, and company sponsorships!",
      category: "Competition",
      difficulty: "Various",
      players: "Global",
      estimatedTime: "60-240 min",
      icon: Globe,
      color: "from-yellow-600 to-orange-600",
      shadowColor: "shadow-yellow-500/50",
      route: "/games/global-contests",
      locked: false,
      features: ["Timed Events", "Global Rankings", "Sponsored Challenges", "Recruitment"]
    },
    {
      id: "dummy-game",
      title: "Premium Arena",
      description: "Exclusive premium content with advanced algorithms and features!",
      category: "Premium",
      difficulty: "Legendary",
      players: "Premium Only",
      estimatedTime: "Unlimited",
      icon: Crown,
      color: "from-gold-600 to-yellow-600",
      shadowColor: "shadow-gold-500/50",
      route: "/games/dummy-game",
      locked: true,
      features: ["Premium Algorithms", "Exclusive Content", "Advanced Features", "Priority Support"]
    }
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // NEW: track loading

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
    setLoading(false); // done checking login
  }, []);

  // NEW: Don't render until login status is known
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "See you next time!"
    });
    navigate("/");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'border-green-500/50 text-green-300 bg-green-500/20';
      case 'Medium': return 'border-yellow-500/50 text-yellow-300 bg-yellow-500/20';
      case 'Hard': return 'border-red-500/50 text-red-300 bg-red-500/20';
      case 'Expert': return 'border-purple-500/50 text-purple-300 bg-purple-500/20';
      case 'Legendary': return 'border-orange-500/50 text-orange-300 bg-orange-500/20';
      case 'Various': return 'border-blue-500/50 text-blue-300 bg-blue-500/20';
      default: return 'border-gray-500/50 text-gray-300 bg-gray-500/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Puzzle': return 'border-blue-500/50 text-blue-300 bg-blue-500/20';
      case 'Debugging': return 'border-green-500/50 text-green-300 bg-green-500/20';
      case 'RPG': return 'border-red-500/50 text-red-300 bg-red-500/20';
      case 'Racing': return 'border-cyan-500/50 text-cyan-300 bg-cyan-500/20';
      case 'Strategy': return 'border-yellow-500/50 text-yellow-300 bg-yellow-500/20';
      case 'Adventure': return 'border-teal-500/50 text-teal-300 bg-teal-500/20';
      case 'Action': return 'border-indigo-500/50 text-indigo-300 bg-indigo-500/20';
      case 'Logic': return 'border-emerald-500/50 text-emerald-300 bg-emerald-500/20';
      case 'Educational': return 'border-pink-500/50 text-pink-300 bg-pink-500/20';
      case 'Speed': return 'border-sky-500/50 text-sky-300 bg-sky-500/20';
      case 'Exploration': return 'border-violet-500/50 text-violet-300 bg-violet-500/20';
      case 'Pattern': return 'border-amber-500/50 text-amber-300 bg-amber-500/20';
      case 'Optimization': return 'border-orange-500/50 text-orange-300 bg-orange-500/20';
      case 'Performance': return 'border-red-500/50 text-red-300 bg-red-500/20';
      case 'Multiplayer': return 'border-pink-500/50 text-pink-300 bg-pink-500/20';
      case 'AI': return 'border-cyan-500/50 text-cyan-300 bg-cyan-500/20';
      case 'Competition': return 'border-yellow-500/50 text-yellow-300 bg-yellow-500/20';
      case 'Premium': return 'border-gold-500/50 text-gold-300 bg-gold-500/20';
      default: return 'border-gray-500/50 text-gray-300 bg-gray-500/20';
    }
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
  
  if (loading) return null;
  
  if (!isLoggedIn) {
    return (
      <LoginGate 
      title="Weekly Contest" 
      description="Compete with coders worldwide in our weekly programming contests"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Algorithm Gaming Arena 🎮
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master data structures and algorithms through immersive gaming experiences. 
            Each game is designed to challenge your programming skills while providing hours of entertainment!
          </p>
        </div>

        {/* Featured stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Gamepad2, label: "Total Games", value: "20", color: "text-purple-400" },
            { icon: Trophy, label: "Difficulty Levels", value: "6", color: "text-yellow-400" },
            { icon: Users, label: "Active Players", value: "25.8K", color: "text-green-400" },
            { icon: Clock, label: "Hours Played", value: "89.5K", color: "text-blue-400" }
          ].map((stat, index) => (
            <Card key={index} className="bg-black/40 backdrop-blur-lg border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div key={game.id} className="group relative">
              {/* Glowing border effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${game.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              
              <Card className="relative bg-black/60 backdrop-blur-lg border-gray-700/50 group-hover:border-purple-500/50 rounded-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
                {game.locked && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                    <div className="text-center">
                      <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-400 animate-pulse" />
                      <div className="text-2xl font-bold text-yellow-400 mb-2">Premium Only</div>
                      <div className="text-gray-400">Unlock with Subscription</div>
                    </div>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-2xl ${game.shadowColor} group-hover:animate-pulse`}>
                      <game.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(game.category)}>
                        {game.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Players:</span>
                      <span className="text-white font-medium">{game.players}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white font-medium">{game.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-700/50 pt-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {game.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-400">
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    {game.locked ? (
                      <Button 
                        disabled
                        className="w-full bg-gray-600 hover:bg-gray-600 cursor-not-allowed font-bold"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Premium Required
                      </Button>
                    ) : (
                      <Link to={game.route}>
                        <Button 
                          className={`w-full bg-gradient-to-r ${game.color} hover:shadow-lg ${game.shadowColor} font-bold transform transition-all duration-200 hover:scale-105`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Play Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg border-purple-500/30 shadow-2xl shadow-purple-500/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Level Up Your Coding Skills? 🚀
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of developers who are mastering algorithms through gaming. 
                Start your journey today and become a coding champion!
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/games/code-tetris">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold px-8 py-4 text-lg">
                    <Play className="h-6 w-6 mr-2" />
                    Start Playing
                  </Button>
                </Link>
                <Link to="/dsa-arena">
                  <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 font-bold px-8 py-4 text-lg">
                    <Trophy className="h-6 w-6 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Games;
