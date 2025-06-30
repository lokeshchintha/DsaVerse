import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { 
  BarChart3, FileText, Search, Lightbulb, Code, BookOpen, Target, Users, Bug
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const AITools = () => {
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


  const advancedTools = [
    {
      id: "code-language-converter",
      title: "Code Language Converter",
      description: "Convert code between programming languages with AI",
      icon: Code,
      color: "bg-blue-500",
      route: "/code-language-converter"
    },
    {
      id: "code-debugger",
      title: "Code Debugger",
      description: "Step-by-step code execution visualization",
      icon: Bug,
      color: "bg-red-500",
      route: "/code-debugger"
    },
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

  const handleToolClick = (route) => {
    navigate(route);
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
  
  if (loading) return null;
  
  if (!isLoggedIn) {
    return (
      <LoginGate 
      title="Ai Tools" 
      description="Compete with coders worldwide in our weekly programming contests"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Tools</h1>
          <p className="text-muted-foreground">Leverage AI to enhance your coding and interview preparation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleToolClick(tool.route)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${tool.color} bg-opacity-10`}>
                      <IconComponent className={`h-6 w-6 ${tool.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AITools;
