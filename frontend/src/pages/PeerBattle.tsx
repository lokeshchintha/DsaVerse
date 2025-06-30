
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import LoginGate from "./LoginGate";
import { 
  Swords, 
  Clock, 
  Trophy,
  Users,
  Target,
  Zap,
  Brain,
  Code
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const PeerBattle = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [battleType, setBattleType] = useState<"quick" | "standard" | "room" | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);


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

  const difficulties = ["Easy", "Medium", "Hard"];
  const topics = [
    "Arrays", "Strings", "Linked Lists", "Trees", "Graphs",
    "Dynamic Programming", "Sorting", "Searching", "Recursion",
    "Hash Tables", "Stacks", "Queues", "Greedy", "Backtracking"
  ];

  const handleStartBattle = () => {
    if (!selectedDifficulty || !selectedTopic) {
      toast({
        title: "Please select difficulty and topic",
        description: "Both difficulty and topic are required to start a battle.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Finding opponent...",
      description: `Looking for a ${selectedDifficulty} ${selectedTopic} battle opponent.`
    });

    // Simulate finding opponent
    setTimeout(() => {
      toast({
        title: "Opponent found!",
        description: "Battle starting in 3 seconds..."
      });
    }, 2000);
  };

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
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
  <div className="min-h-screen bg-background">
    <Navbar />

    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Peer Battle Arena ⚔️
        </h1>
        <p className="text-xl text-muted-foreground">
          Challenge other developers in real-time coding competitions
        </p>
      </div>

      {!battleType ? (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Quick Match */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500"
              onClick={() => setBattleType("quick")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-500 rounded-xl w-fit">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Quick Match</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Fast-paced 10-minute coding battles. Get matched instantly with players of similar skill level.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">10 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Problems:</span>
                    <span className="font-semibold">2-3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matching:</span>
                    <span className="font-semibold">Auto</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Standard Match */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-500"
              onClick={() => setBattleType("standard")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-purple-500 rounded-xl w-fit">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Standard Match</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Comprehensive 30-minute battles with custom difficulty and topic selection.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Problems:</span>
                    <span className="font-semibold">4-5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matching:</span>
                    <span className="font-semibold">Custom</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Create Room */}
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-green-500"
              onClick={() => {
                setBattleType("room");
                const code = generateRoomCode();
                setRoomCode(code);
                setParticipants(["You"]);
              }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-500 rounded-xl w-fit">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Create Room</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Host a custom coding battle room with your friends. Share the code and start the challenge together.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span className="font-semibold">Multiplayer</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Joinable:</span>
                    <span className="font-semibold">Via Code</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Swords className="h-6 w-6" />
                {battleType === "room"
                  ? "Create Room Setup"
                  : battleType === "quick"
                  ? "Quick Match Setup"
                  : "Standard Match Setup"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Difficulty */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                difficulty === "Easy"
                                  ? "secondary"
                                  : difficulty === "Medium"
                                  ? "default"
                                  : "destructive"
                              }
                              className="text-xs"
                            >
                              {difficulty}
                            </Badge>
                            {difficulty}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Topic</label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            {topic}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedDifficulty && selectedTopic && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Battle Configuration</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium capitalize">{battleType} Match</span>
                    </div>
                    {battleType === "room" && roomCode && (
                      <div className="flex justify-between">
                        <span>Room Code:</span>
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{roomCode}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <Badge
                        variant={
                          selectedDifficulty === "Easy"
                            ? "secondary"
                            : selectedDifficulty === "Medium"
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {selectedDifficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Topic:</span>
                      <span className="font-medium">{selectedTopic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">
                        {battleType === "quick" ? "10" : battleType === "standard" ? "30" : "Custom"} minutes
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setBattleType(null)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleStartBattle}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-500"
                >
                  <Users className="h-4 w-4 mr-2" />
                  {battleType === "room" ? "Start Battle" : "Find Opponent"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  </div>
);

};

export default PeerBattle;
