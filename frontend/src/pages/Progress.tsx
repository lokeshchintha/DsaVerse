
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { 
  Trophy, 
  Target, 
  Zap, 
  Code, 
  Star,
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import LoginGate from "./LoginGate";

const ProgressPage = () => {
  const [user] = useState({
    name: "Alex Developer",
    level: 12,
    xp: 2847,
    totalProblems: 156,
    accuracy: 87
  });

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

  const topicProgress = [
    { topic: "Arrays", solved: 45, total: 80, accuracy: 89, color: "bg-blue-500" },
    { topic: "Strings", solved: 32, total: 60, accuracy: 85, color: "bg-green-500" },
    { topic: "Trees", solved: 28, total: 70, accuracy: 82, color: "bg-purple-500" },
    { topic: "Graphs", solved: 15, total: 50, accuracy: 78, color: "bg-orange-500" },
    { topic: "Dynamic Programming", solved: 12, total: 45, accuracy: 75, color: "bg-red-500" },
    { topic: "Backtracking", solved: 8, total: 30, accuracy: 80, color: "bg-pink-500" },
    { topic: "Binary Search", solved: 16, total: 25, accuracy: 92, color: "bg-indigo-500" }
  ];

  const languageProgress = [
    { language: "Python", problems: 65, accuracy: 88, color: "bg-blue-600" },
    { language: "JavaScript", problems: 42, accuracy: 85, color: "bg-yellow-500" },
    { language: "Java", problems: 28, accuracy: 82, color: "bg-orange-600" },
    { language: "C++", problems: 21, accuracy: 79, color: "bg-purple-600" }
  ];

  const weeklyContests = [
    { week: "Week 23", rank: 145, score: 2890, participants: 12450, rating: 7 },
    { week: "Week 22", rank: 289, score: 2640, participants: 11890, rating: 6 },
    { week: "Week 21", rank: 198, score: 2750, participants: 12100, rating: 6 },
    { week: "Week 20", rank: 324, score: 2580, participants: 11200, rating: 6 },
    { week: "Week 19", rank: 156, score: 2820, participants: 12800, rating: 7 }
  ];

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your coding journey and achievements</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">By Topics</TabsTrigger>
            <TabsTrigger value="languages">By Languages</TabsTrigger>
            <TabsTrigger value="contests">Weekly Contests</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Problems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.totalProblems}</div>
                  <p className="text-xs text-muted-foreground">+12 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.accuracy}%</div>
                  <p className="text-xs text-muted-foreground">+3% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.level}</div>
                  <p className="text-xs text-muted-foreground">Expert level</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.xp}</div>
                  <p className="text-xs text-muted-foreground">+127 today</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "solved", problem: "Two Sum", time: "2 hours ago", difficulty: "Easy" },
                    { type: "attempted", problem: "Longest Palindromic Substring", time: "5 hours ago", difficulty: "Medium" },
                    { type: "solved", problem: "Valid Parentheses", time: "1 day ago", difficulty: "Easy" },
                    { type: "solved", problem: "Merge Two Sorted Lists", time: "2 days ago", difficulty: "Easy" }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded">
                      <div className="flex items-center gap-3">
                        <div className={`p-1 rounded ${activity.type === 'solved' ? 'bg-green-500' : 'bg-orange-500'}`}>
                          <Target className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.problem}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant={activity.difficulty === 'Easy' ? 'secondary' : 'default'}>
                        {activity.difficulty}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress by Topics</CardTitle>
                <CardDescription>Your performance across different algorithm topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicProgress.map((topic) => (
                    <div key={topic.topic} className="space-y-3 p-4 border rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${topic.color}`} />
                          <h3 className="font-medium">{topic.topic}</h3>
                        </div>
                        <Badge variant="outline">{topic.accuracy}% accuracy</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Problems Solved</span>
                          <span>{topic.solved}/{topic.total}</span>
                        </div>
                        <Progress value={(topic.solved / topic.total) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress by Programming Languages</CardTitle>
                <CardDescription>Your coding experience across different languages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {languageProgress.map((lang) => (
                    <div key={lang.language} className="space-y-3 p-4 border rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                          <h3 className="font-medium">{lang.language}</h3>
                        </div>
                        <Badge variant="outline">{lang.accuracy}% accuracy</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Problems Solved</span>
                          <span>{lang.problems}</span>
                        </div>
                        <div className="text-2xl font-bold">{lang.problems}</div>
                        <p className="text-sm text-muted-foreground">problems solved</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Weekly Contest Performance
                </CardTitle>
                <CardDescription>Your performance in weekly coding contests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyContests.map((contest, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded">
                      <div className="space-y-1">
                        <h4 className="font-medium">{contest.week}</h4>
                        <p className="text-sm text-muted-foreground">
                          Rank {contest.rank} of {contest.participants} participants
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1">
                          {renderStars(contest.rating)}
                        </div>
                        <div className="text-lg font-bold">{contest.score}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "First Blood", description: "Solved your first problem", icon: Trophy, unlocked: true },
                { title: "Speed Demon", description: "Solved 5 problems in under 10 minutes", icon: Zap, unlocked: true },
                { title: "Polyglot", description: "Solved problems in 4+ languages", icon: Code, unlocked: true },
                { title: "Streak Master", description: "30-day solving streak", icon: Target, unlocked: false },
                { title: "Contest Winner", description: "Ranked in top 10 in a contest", icon: Award, unlocked: false },
                { title: "Problem Setter", description: "Created 5 custom problems", icon: Star, unlocked: false }
              ].map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={index} className={`text-center ${achievement.unlocked ? '' : 'opacity-50'}`}>
                    <CardHeader>
                      <div className={`mx-auto p-3 rounded-full w-16 h-16 flex items-center justify-center ${
                        achievement.unlocked ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <IconComponent className={`h-8 w-8 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressPage;
