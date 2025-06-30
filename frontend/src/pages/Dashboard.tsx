import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, Brain, Target, Users, Trophy, Zap, BookOpen, MessageSquare, 
  FileText, BarChart3, Sword, Upload, Video, Search, Lightbulb, Star 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { LearningPath } from "@/components/dashboard/LearningPath";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import LoginGate from "./LoginGate";

const Dashboard = () => {
  const [user] = useState({
    name: "Alex Developer",
    level: 12,
    xp: 2847,
    nextLevelXp: 3000,
    streak: 7,
    problemsSolved: 156,
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

  const modules = [
    {
      id: "dsa",
      title: "DSA Arena",
      description: "300+ coding problems with visual learning",
      icon: Code,
      progress: 65,
      color: "bg-blue-500",
      problems: "156/300",
      route: "/dsa-arena"
    },
    {
      id: "aptitude",
      title: "Aptitude Grid",
      description: "Quant, Logical & Verbal reasoning",
      icon: Brain,
      progress: 42,
      color: "bg-purple-500",
      problems: "89/200",
      route: "/aptitude-grid"
    },
    {
      id: "ai-mentor",
      title: "AI Mentor",
      description: "GPT-4 powered coding assistant",
      icon: MessageSquare,
      progress: 78,
      color: "bg-green-500",
      problems: "Active",
      route: "/ai-mentor"
    },
    {
      id: "interview",
      title: "Interview Simulator",
      description: "Live simulation with AI interviewer",
      icon: Video,
      progress: 23,
      color: "bg-orange-500",
      problems: "3 completed",
      route: "/interview-simulator"
    },
    {
      id: "battles",
      title: "Peer Battles",
      description: "1v1 real-time coding competitions",
      icon: Sword,
      progress: 55,
      color: "bg-red-500",
      problems: "12 wins",
      route: "/peer-battle"
    },
    {
      id: "roadmap",
      title: "Learning Roadmap",
      description: "AI-powered personalized learning path",
      icon: BookOpen,
      progress: 34,
      color: "bg-indigo-500",
      problems: "In progress",
      route: "/learning-roadmap"
    }
  ];

  const advancedTools = [
    {
      id: "code-analyzer",
      title: "Code Analyzer",
      description: "Analyze code quality and performance",
      icon: BarChart3,
      color: "bg-cyan-500",
      route: "/code-analyzer"
    },
    {
      id: "resume-analyzer", 
      title: "Resume Analyzer",
      description: "AI-powered resume optimization",
      icon: FileText,
      color: "bg-emerald-500",
      route: "/resume-analyzer"
    },
    {
      id: "pattern-detector",
      title: "Pattern Detector",
      description: "Identify algorithmic patterns",
      icon: Search,
      color: "bg-violet-500",
      route: "/pattern-detector"
    },
    {
      id: "hint-generator",
      title: "Smart Hints",
      description: "Context-aware problem hints",
      icon: Lightbulb,
      color: "bg-amber-500",
      route: "/smart-hints"
    },
    {
      id: "code-rewrite",
      title: "Code Rewrite Challenge",
      description: "Improve messy code quality",
      icon: Code,
      color: "bg-pink-500",
      route: "/code-rewrite-challenge"
    },
    {
      id: "project-generator",
      title: "DSA Project Generator",
      description: "Generate project ideas from DSA tags",
      icon: BookOpen,
      color: "bg-teal-500",
      route: "/dsa-project-generator"
    },
    {
      id: "system-design",
      title: "System Design Playground",
      description: "Design distributed systems with AI feedback",
      icon: Target,
      color: "bg-indigo-500",
      route: "/system-design-playground"
    },
    {
      id: "behavioral-analytics",
      title: "Behavioral Analytics",
      description: "Deep insights into learning patterns",
      icon: BarChart3,
      color: "bg-orange-500",
      route: "/behavioral-analytics"
    },
    {
      id: "anti-cheat",
      title: "Anti-Cheat Engine",
      description: "Secure coding assessment monitoring",
      icon: Users,
      color: "bg-red-500",
      route: "/anti-cheat-engine"
    }
  ];

  const achievements = [
    { title: "First Blood", description: "Solved your first problem", icon: Trophy },
    { title: "Speed Demon", description: "Solved 5 problems in under 10 minutes", icon: Zap },
    { title: "Streak Master", description: "7-day solving streak", icon: Target }
  ];

  const weeklyContestData = {
    currentContest: {
      title: "Weekly Contest 124",
      status: "upcoming",
      participants: 15420,
      timeLeft: "2h 30m",
      problems: 4
    },
    userStats: {
      totalContests: 45,
      bestRank: 89,
      currentRating: 6,
      maxRating: 7
    },
    recentPerformance: [
      { week: "Week 123", rank: 145, score: 2890, rating: 7 },
      { week: "Week 122", rank: 289, score: 2640, rating: 6 },
      { week: "Week 121", rank: 198, score: 2750, rating: 6 }
    ]
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 7 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  const handleModuleClick = (route: string) => {
    navigate(route);
  };

  const handleTabClick = (value: string) => {
    if (value === "modules") {
      navigate("/core-modules");
    } else if (value === "tools") {
      navigate("/ai-tools");
    } else if (value === "progress") {
      navigate("/progress");
    } else if (value === "games") {
      navigate("/games");
    } else if (value === "weekly-contest") {
      navigate("/weekly-contest");
    } else if (value == "dsa-visualization") {
      navigate("/dsa-visualization")
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to level up your coding skills today?
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="px-3 py-1">
                  Level {user.level}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  🔥 {user.streak} day streak
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {user.xp}/{user.nextLevelXp} XP to next level
              </div>
              <Progress 
                value={(user.xp / user.nextLevelXp) * 100} 
                className="w-48 h-2 mt-1"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules" onClick={() => handleTabClick("modules")}>Core Modules</TabsTrigger>
            <TabsTrigger value="tools" onClick={() => handleTabClick("tools")}>AI Tools</TabsTrigger>
            <TabsTrigger value="progress" onClick={() => handleTabClick("progress")}>Progress</TabsTrigger>
            <TabsTrigger value="games" onClick={() => handleTabClick("games")}>Games</TabsTrigger>
            <TabsTrigger value="dsa-visualization" onClick={() => handleTabClick("dsa-visualization")}>DSA Viusalization</TabsTrigger>

            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard
                title="Problems Solved"
                value={user.problemsSolved}
                icon={Code}
                change="+12 this week"
                color="text-blue-500"
              />
              <StatsCard
                title="Accuracy Rate"
                value={`${user.accuracy}%`}
                icon={Target}
                change="+3% this month"
                color="text-green-500"
              />
              <StatsCard
                title="Current Streak"
                value={`${user.streak} days`}
                icon={Zap}
                change="Personal best!"
                color="text-orange-500"
              />
              <StatsCard
                title="XP Earned"
                value={user.xp}
                icon={Trophy}
                change="+127 today"
                color="text-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              <div>
                <LearningPath />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full w-16 h-16 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-yellow-600" />
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

export default Dashboard;
