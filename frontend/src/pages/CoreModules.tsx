
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import LoginGate from "./LoginGate";
import { toast } from "@/hooks/use-toast";

import { 
  Code, Brain, Target, Users, Trophy, Zap, BookOpen, MessageSquare, 
  FileText, BarChart3, Sword, Upload, Video, Search, Lightbulb, Calendar 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CoreModules = () => {
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
      id: "weekly-contest",
      title: "Weekly Contest",
      description: "Compete with global programmers weekly",
      icon: Calendar,
      progress: 80,
      color: "bg-orange-500",
      problems: "5 contests",
      route: "/weekly-contest"
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

  const handleModuleClick = (route) => {
    navigate(route);
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
          <h1 className="text-3xl font-bold mb-2">Core Modules</h1>
          <p className="text-muted-foreground">Master coding skills with our comprehensive learning modules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card 
                key={module.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleModuleClick(module.route)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${module.color} bg-opacity-10`}>
                      <IconComponent className={`h-6 w-6 ${module.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {module.problems}
                      </span>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        Continue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoreModules;
