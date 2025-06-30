
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Sword, Shield, Heart, Zap, Trophy, Clock, Play } from "lucide-react";

const DSABossBattles = () => {
  const [selectedBoss, setSelectedBoss] = useState(0);
  const [playerHP, setPlayerHP] = useState(100);
  const [bossHP, setBossHP] = useState(100);
  const [userCode, setUserCode] = useState("");
  const [battlePhase, setBattlePhase] = useState<"lobby" | "fighting" | "victory" | "defeat">("lobby");
  const [timeLeft, setTimeLeft] = useState(600);

  const bosses = [
    {
      name: "Array Dragon",
      difficulty: "Easy",
      hp: 100,
      avatar: "🐉",
      problem: "Two Sum",
      description: "Find two numbers in an array that add up to a target sum",
      weakness: "Optimal Time Complexity O(n)",
      rewards: ["500 XP", "Array Master Badge", "Dragon Scale Item"]
    },
    {
      name: "Linked List Hydra",
      difficulty: "Medium",
      hp: 150,
      avatar: "🐍",
      problem: "Reverse Linked List",
      description: "Reverse a singly linked list iteratively and recursively",
      weakness: "In-place reversal",
      rewards: ["800 XP", "Hydra Slayer Title", "Mystical Pointer"]
    },
    {
      name: "Tree Titan",
      difficulty: "Hard",
      hp: 200,
      avatar: "🌳",
      problem: "Binary Tree Maximum Path Sum",
      description: "Find the maximum path sum in a binary tree",
      weakness: "Dynamic Programming approach",
      rewards: ["1200 XP", "Tree Whisperer Badge", "Titan's Crown"]
    },
    {
      name: "Graph Goliath",
      difficulty: "Expert",
      hp: 300,
      avatar: "🗿",
      problem: "Shortest Path in Weighted Graph",
      description: "Implement Dijkstra's algorithm for shortest paths",
      weakness: "Optimal graph traversal",
      rewards: ["2000 XP", "Graph Master Title", "Goliath's Hammer"]
    }
  ];

  const startBattle = () => {
    setBattlePhase("fighting");
    setPlayerHP(100);
    setBossHP(bosses[selectedBoss].hp);
    setTimeLeft(600);
    setUserCode("");
  };

  const submitSolution = () => {
    if (!userCode.trim()) return;
    
    // Simulate code evaluation
    const codeQuality = Math.random() * 100;
    const damage = Math.floor(codeQuality / 2);
    const newBossHP = Math.max(0, bossHP - damage);
    
    setBossHP(newBossHP);
    
    if (newBossHP <= 0) {
      setBattlePhase("victory");
    } else {
      // Boss attacks back
      const bossDamage = Math.floor(Math.random() * 30) + 10;
      const newPlayerHP = Math.max(0, playerHP - bossDamage);
      setPlayerHP(newPlayerHP);
      
      if (newPlayerHP <= 0) {
        setBattlePhase("defeat");
      }
    }
  };

  useEffect(() => {
    if (battlePhase !== "fighting") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setBattlePhase("defeat");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [battlePhase]);

  const currentBoss = bosses[selectedBoss];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            DSA Boss Battles ⚔️
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Face legendary algorithmic bosses in epic coding battles! 
            Each boss represents a different DSA concept - defeat them with optimal solutions!
          </p>
        </div>

        {battlePhase === "lobby" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bosses.map((boss, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all ${
                    selectedBoss === index ? 'ring-2 ring-red-500 bg-red-900/20' : 'hover:bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedBoss(index)}
                >
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-2">{boss.avatar}</div>
                    <CardTitle className="text-white">{boss.name}</CardTitle>
                    <Badge variant="outline" className="bg-red-500/20 text-red-300">
                      {boss.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">HP:</span>
                      <span className="text-red-400">{boss.hp}</span>
                    </div>
                    <div className="text-sm text-gray-300">{boss.problem}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-black/60 backdrop-blur-lg border-red-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sword className="h-5 w-5 text-red-400" />
                  Boss Details: {currentBoss.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Challenge</h4>
                    <p className="text-gray-300 text-sm">{currentBoss.description}</p>
                    
                    <h4 className="text-white font-semibold mb-2 mt-4">Weakness</h4>
                    <p className="text-yellow-400 text-sm">{currentBoss.weakness}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Victory Rewards</h4>
                    <ul className="space-y-1">
                      {currentBoss.rewards.map((reward, index) => (
                        <li key={index} className="text-green-400 text-sm flex items-center gap-2">
                          <Trophy className="h-3 w-3" />
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button onClick={startBattle} size="lg" className="w-full bg-red-600 hover:bg-red-700">
                  <Play className="h-5 w-5 mr-2" />
                  Challenge {currentBoss.name}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {battlePhase === "fighting" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-black/60 backdrop-blur-lg border-red-500/50">
              <CardHeader>
                <CardTitle className="text-white text-center">Battle Arena</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Boss */}
                <div className="text-center">
                  <div className="text-8xl mb-2">{currentBoss.avatar}</div>
                  <h3 className="text-xl font-bold text-white">{currentBoss.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <Progress value={(bossHP / currentBoss.hp) * 100} className="flex-1" />
                    <span className="text-white text-sm">{bossHP}/{currentBoss.hp}</span>
                  </div>
                </div>

                {/* VS */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">⚔️ VS ⚔️</div>
                </div>

                {/* Player */}
                <div className="text-center">
                  <div className="text-6xl mb-2">🧑‍💻</div>
                  <h3 className="text-xl font-bold text-white">You</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <Progress value={playerHP} className="flex-1" />
                    <span className="text-white text-sm">{playerHP}/100</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-400">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Card className="bg-black/60 backdrop-blur-lg border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-white">{currentBoss.problem}</CardTitle>
                  <p className="text-gray-300">{currentBoss.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Write your solution here..."
                    className="min-h-[300px] font-mono bg-gray-900 border-gray-700 text-white"
                  />
                  
                  <Button onClick={submitSolution} className="w-full bg-green-600 hover:bg-green-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Attack with Code!
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {(battlePhase === "victory" || battlePhase === "defeat") && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black/90">
              <CardHeader className="text-center">
                <CardTitle className={`text-2xl ${battlePhase === "victory" ? "text-green-400" : "text-red-400"}`}>
                  {battlePhase === "victory" ? "Victory!" : "Defeat!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-6xl">
                  {battlePhase === "victory" ? "🏆" : "💀"}
                </div>
                
                {battlePhase === "victory" && (
                  <div>
                    <p className="text-gray-300 mb-2">Rewards Earned:</p>
                    {currentBoss.rewards.map((reward, index) => (
                      <p key={index} className="text-green-400 text-sm">{reward}</p>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button onClick={() => setBattlePhase("lobby")} className="flex-1">
                    Return to Lobby
                  </Button>
                  {battlePhase === "defeat" && (
                    <Button onClick={startBattle} variant="outline" className="flex-1">
                      Try Again
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSABossBattles;
