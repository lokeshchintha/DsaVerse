
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Car, Flag, Trophy, Clock, Zap, Users, Play } from "lucide-react";

const AlgorithmRacing = () => {
  const [raceState, setRaceState] = useState<"lobby" | "racing" | "finished">("lobby");
  const [playerPosition, setPlayerPosition] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [lapTime, setLapTime] = useState(0);

  const racers = [
    { name: "SpeedCoder", position: 95, car: "🏎️", status: "racing" },
    { name: "AlgoRacer", position: 87, car: "🚗", status: "racing" },
    { name: "You", position: playerPosition, car: "🚙", status: "racing" },
    { name: "CodeCruiser", position: 76, car: "🚓", status: "racing" },
    { name: "DataDriver", position: 65, car: "🚕", status: "racing" }
  ];

  const checkpoints = [
    {
      name: "Sorting Circuit",
      challenge: "Implement QuickSort",
      description: "Sort an array using the QuickSort algorithm",
      difficulty: "Medium",
      testCases: ["[3,1,4,1,5]", "[64,34,25,12,22,11,90]"]
    },
    {
      name: "Search Speedway", 
      challenge: "Binary Search",
      description: "Find target element in sorted array",
      difficulty: "Easy",
      testCases: ["[1,3,5,7,9], target=5", "[2,4,6,8,10], target=6"]
    },
    {
      name: "Graph Grand Prix",
      challenge: "Shortest Path",
      description: "Find shortest path between two nodes",
      difficulty: "Hard",
      testCases: ["Graph with 6 nodes", "Weighted graph example"]
    }
  ];

  const startRace = () => {
    setRaceState("racing");
    setPlayerPosition(0);
    setCurrentCheckpoint(0);
    setTimeLeft(300);
    setLapTime(0);
    setUserCode("");
  };

  const submitSolution = () => {
    if (!userCode.trim()) return;
    
    // Simulate solution evaluation
    const solutionQuality = Math.random() * 100;
    const progress = Math.floor(solutionQuality / 3);
    
    setPlayerPosition(prev => Math.min(100, prev + progress));
    
    if (playerPosition + progress >= 100) {
      setRaceState("finished");
    } else if (playerPosition + progress >= (currentCheckpoint + 1) * 33) {
      setCurrentCheckpoint(prev => prev + 1);
      setUserCode("");
    }
  };

  useEffect(() => {
    if (raceState !== "racing") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setRaceState("finished");
          return 0;
        }
        return prev - 1;
      });
      setLapTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [raceState]);

  const currentChallenge = checkpoints[currentCheckpoint];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Algorithm Racing 🏁
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Race against other developers in high-speed coding challenges! 
            Complete algorithm checkpoints to advance around the track.
          </p>
        </div>

        {raceState === "lobby" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Car, label: "Racers", value: "5", color: "text-blue-400" },
                { icon: Flag, label: "Checkpoints", value: "3", color: "text-green-400" },
                { icon: Clock, label: "Time Limit", value: "5 min", color: "text-yellow-400" },
                { icon: Trophy, label: "Best Lap", value: "2:34", color: "text-purple-400" }
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

            <Card className="bg-black/60 backdrop-blur-lg border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-white">Race Track Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {checkpoints.map((checkpoint, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Flag className="h-4 w-4 text-green-400" />
                        <h3 className="font-medium text-white">{checkpoint.name}</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{checkpoint.challenge}</p>
                      <Badge variant="outline" className="text-xs">
                        {checkpoint.difficulty}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={startRace} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Play className="h-6 w-6 mr-2" />
                Start Your Engines!
              </Button>
            </div>
          </div>
        )}

        {raceState === "racing" && (
          <div className="space-y-6">
            {/* Race Track */}
            <Card className="bg-black/60 backdrop-blur-lg border-blue-500/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Race Track</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-green-400" />
                      <span className="text-white">Lap: {Math.floor(lapTime / 60)}:{(lapTime % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {racers.sort((a, b) => b.position - a.position).map((racer, index) => (
                    <div key={racer.name} className="flex items-center gap-4">
                      <div className="w-8 text-center font-bold text-white">#{index + 1}</div>
                      <div className="text-2xl">{racer.car}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className={`${racer.name === 'You' ? 'text-blue-400 font-bold' : 'text-white'}`}>
                            {racer.name}
                          </span>
                          <span className="text-gray-400">{racer.position}%</span>
                        </div>
                        <Progress value={racer.position} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Challenge */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/60 backdrop-blur-lg border-blue-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Flag className="h-5 w-5 text-green-400" />
                      Checkpoint {currentCheckpoint + 1}: {currentChallenge.name}
                    </CardTitle>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-300">
                      {currentChallenge.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-300">{currentChallenge.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Test Cases:</h4>
                    {currentChallenge.testCases.map((testCase, index) => (
                      <div key={index} className="bg-gray-800/50 p-2 rounded text-sm text-green-400 font-mono">
                        {testCase}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                    <p className="text-white">Complete this challenge to advance!</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border-blue-500/50">
                <CardHeader>
                  <CardTitle className="text-white">Your Solution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Write your algorithm here..."
                    className="min-h-[250px] font-mono bg-gray-900 border-gray-700 text-white"
                  />
                  
                  <Button onClick={submitSolution} className="w-full bg-green-600 hover:bg-green-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Submit & Advance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {raceState === "finished" && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black/90">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Race Finished!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-6xl">🏁</div>
                <p className="text-gray-300">Final Position: {playerPosition}%</p>
                <p className="text-gray-300">Lap Time: {Math.floor(lapTime / 60)}:{(lapTime % 60).toString().padStart(2, '0')}</p>
                <p className="text-gray-300">Checkpoints: {currentCheckpoint + 1}/3</p>
                <Button onClick={startRace} className="w-full">
                  Race Again
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmRacing;
