import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import LoginGate from "./LoginGate";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Trophy, 
  Star, 
  TrendingUp, 
  Calendar, 
  Award,
  Users,
  Clock,
  Target,
  Play,
  CheckCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";


const WeeklyContest = () => {// This would be connected to actual auth
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); 
  
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

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

  const [activeContest] = useState({
    id: 1,
    title: "Weekly Contest 124",
    startTime: "2024-01-20 14:00",
    endTime: "2024-01-20 15:30",
    duration: 90,
    participants: 15420,
    problems: 4,
    status: "upcoming"
  });

  const contestProblems = [
    { 
      id: 'A', 
      name: "Array Manipulation", 
      difficulty: "Easy", 
      points: 500,
      description: "Given an array of integers, find the maximum sum of contiguous subarray.",
      solved: false
    },
    { 
      id: 'B', 
      name: "String Transformation", 
      difficulty: "Medium", 
      points: 1000,
      description: "Transform string A to string B using minimum operations.",
      solved: false
    },
    { 
      id: 'C', 
      name: "Tree Traversal", 
      difficulty: "Medium", 
      points: 1500,
      description: "Find the path with maximum sum in a binary tree.",
      solved: false
    },
    { 
      id: 'D', 
      name: "Dynamic Programming", 
      difficulty: "Hard", 
      points: 2000,
      description: "Solve the coin change problem with minimum coins.",
      solved: false
    }
  ];

  const leaderboard = [
    { rank: 1, username: "CodeMaster2024", score: 3250, time: "1:15:30", problems: 4, rating: 7 },
    { rank: 2, username: "AlgoExpert", score: 3180, time: "1:22:45", problems: 4, rating: 7 },
    { rank: 3, username: "ByteWizard", score: 3120, time: "1:28:15", problems: 4, rating: 6 },
    { rank: 4, username: "CodeNinja", score: 2950, time: "1:35:20", problems: 3, rating: 6 },
    { rank: 5, username: "DevGuru", score: 2890, time: "1:40:10", problems: 3, rating: 6 },
    { rank: 6, username: "AlexDev", score: 2750, time: "1:42:30", problems: 3, rating: 6 },
    { rank: 7, username: "TechProdigy", score: 2680, time: "1:45:15", problems: 3, rating: 5 },
    { rank: 8, username: "CodeCrusher", score: 2590, time: "1:48:45", problems: 3, rating: 5 },
    { rank: 9, username: "DataStructGod", score: 2520, time: "1:52:20", problems: 3, rating: 5 },
    { rank: 10, username: "AlgorithmKing", score: 2480, time: "1:55:10", problems: 2, rating: 5 }
  ];

  const pastContests = [
    { week: "Week 123", userRank: 145, score: 2890, participants: 14230, rating: 7, problems: 3 },
    { week: "Week 122", userRank: 289, score: 2640, participants: 13890, rating: 6, problems: 2 },
    { week: "Week 121", userRank: 198, score: 2750, participants: 14100, rating: 6, problems: 3 },
    { week: "Week 120", userRank: 324, score: 2580, participants: 13200, rating: 6, problems: 2 },
    { week: "Week 119", userRank: 156, score: 2820, participants: 14800, rating: 7, problems: 3 }
  ];

  const userStats = {
    totalContests: 45,
    bestRank: 89,
    averageRank: 234,
    totalScore: 125680,
    currentRating: 6,
    maxRating: 7
  };

  const getRatingStars = (score) => {
    if (score >= 2500) return 7;
    if (score >= 2200) return 6;
    if (score >= 1900) return 5;
    if (score >= 1600) return 4;
    if (score >= 1300) return 3;
    if (score >= 1000) return 2;
    return 1;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 7 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 7) return "text-red-500";
    if (rating >= 6) return "text-orange-500";
    if (rating >= 5) return "text-purple-500";
    if (rating >= 4) return "text-blue-500";
    if (rating >= 3) return "text-green-500";
    if (rating >= 2) return "text-yellow-500";
    return "text-gray-500";
  };

  const handleRegister = () => {
    setIsRegistered(true);
    toast({
      title: "Registration Successful!",
      description: "You've been registered for Weekly Contest 124. Good luck!"
    });
  };

  const openProblem = (problemId: string) => {
    // Navigate to problem solving page with contest context
    window.location.href = `/dsa-problem-solver?contest=${activeContest.id}&problem=${problemId}`;
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Weekly Contest</h1>
          <p className="text-muted-foreground">Compete with coders worldwide in our weekly programming contests</p>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Contest</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="history">Contest History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{activeContest.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {activeContest.startTime} - {activeContest.endTime}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={isRegistered ? "default" : "secondary"} className="text-lg px-4 py-2">
                      {isRegistered ? "Registered" : activeContest.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeContest.duration}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeContest.problems}</div>
                    <div className="text-sm text-muted-foreground">Problems</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{activeContest.participants.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                  </div>
                  <div className="flex items-center justify-center">
                    {!isRegistered ? (
                      <Button onClick={handleRegister} size="lg" className="w-full">
                        Register Now
                      </Button>
                    ) : (
                      <Button size="lg" className="w-full" disabled={activeContest.status === 'upcoming'}>
                        <Play className="h-4 w-4 mr-2" />
                        {activeContest.status === 'upcoming' ? 'Contest Starts Soon' : 'Enter Contest'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="problems" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contest Problems</CardTitle>
                <p className="text-muted-foreground">
                  Click on any problem to start solving. Problems are arranged in increasing order of difficulty.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contestProblems.map((problem) => (
                    <div key={problem.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">
                              {problem.id}. {problem.name}
                            </h3>
                            <Badge variant={
                              problem.difficulty === 'Easy' ? 'secondary' : 
                              problem.difficulty === 'Medium' ? 'default' : 'destructive'
                            }>
                              {problem.difficulty}
                            </Badge>
                            {problem.solved && <CheckCircle className="h-5 w-5 text-green-500" />}
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">
                            {problem.description}
                          </p>
                          <div className="text-sm font-medium text-green-600">
                            {problem.points} points
                          </div>
                        </div>
                        <Button 
                          onClick={() => openProblem(problem.id)}
                          disabled={!isRegistered}
                          className="ml-4"
                        >
                          {problem.solved ? 'View Solution' : 'Solve'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded border ${
                        user.rank <= 3 ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-yellow-500 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          user.rank === 3 ? 'bg-amber-600 text-white' : 'bg-muted'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.problems} problems • {user.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(user.rating)}
                        </div>
                        <div className="font-bold">{user.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Previous Contest Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastContests.map((contest, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded">
                      <div className="space-y-1">
                        <h4 className="font-medium">{contest.week}</h4>
                        <p className="text-sm text-muted-foreground">
                          Rank {contest.userRank} of {contest.participants.toLocaleString()} • {contest.problems} problems solved
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1">
                          {renderStars(contest.rating)}
                        </div>
                        <div className="text-lg font-bold">{contest.score}</div>
                      </div>
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

export default WeeklyContest;
