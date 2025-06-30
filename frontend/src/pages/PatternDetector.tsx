
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import LoginGate from "./LoginGate";

const PatternDetector = () => {
  const [selectedPattern, setSelectedPattern] = useState("two-pointers");
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

  const patterns = [
    { 
      id: "two-pointers", 
      name: "Two Pointers",
      mastery: 85,
      problems: 23,
      accuracy: 89,
      color: "#3B82F6",
      description: "Technique using two pointers to traverse data structures",
      examples: ["Two Sum", "Container With Most Water", "3Sum"]
    },
    { 
      id: "sliding-window", 
      name: "Sliding Window",
      mastery: 72,
      problems: 18,
      accuracy: 78,
      color: "#10B981",
      description: "Optimize problems involving subarrays or substrings",
      examples: ["Longest Substring", "Max Sum Subarray", "Minimum Window"]
    },
    { 
      id: "binary-search", 
      name: "Binary Search",
      mastery: 91,
      problems: 31,
      accuracy: 94,
      color: "#8B5CF6",
      description: "Divide and conquer search in sorted arrays",
      examples: ["Search in Rotated Array", "Find Peak Element", "Square Root"]
    },
    { 
      id: "dynamic-programming", 
      name: "Dynamic Programming",
      mastery: 58,
      problems: 15,
      accuracy: 67,
      color: "#F59E0B",
      description: "Break down complex problems into simpler subproblems",
      examples: ["Fibonacci", "Coin Change", "Longest Common Subsequence"]
    },
    { 
      id: "backtracking", 
      name: "Backtracking",
      mastery: 45,
      problems: 9,
      accuracy: 56,
      color: "#EF4444",
      description: "Explore all possible solutions by trying partial solutions",
      examples: ["N-Queens", "Sudoku Solver", "Generate Parentheses"]
    },
    { 
      id: "graph-traversal", 
      name: "Graph Traversal",
      mastery: 76,
      problems: 20,
      accuracy: 82,
      color: "#14B8A6",
      description: "Navigate through graph structures using BFS/DFS",
      examples: ["Number of Islands", "Course Schedule", "Clone Graph"]
    }
  ];

  const radarData = patterns.map(pattern => ({
    pattern: pattern.name.split(' ')[0],
    mastery: pattern.mastery,
    accuracy: pattern.accuracy
  }));

  const pieData = patterns.map(pattern => ({
    name: pattern.name,
    value: pattern.problems,
    color: pattern.color
  }));

  const selectedPatternData = patterns.find(p => p.id === selectedPattern);

  const recommendations = [
    {
      type: "weak",
      pattern: "Backtracking",
      suggestion: "Focus on N-Queens and Sudoku problems to improve",
      priority: "High"
    },
    {
      type: "medium",
      pattern: "Dynamic Programming",
      suggestion: "Practice more 1D DP problems before moving to 2D",
      priority: "Medium"
    },
    {
      type: "strong",
      pattern: "Binary Search",
      suggestion: "Try advanced variations like binary search on answers",
      priority: "Low"
    }
  ];

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
          <h1 className="text-3xl font-bold mb-2">Pattern Detector</h1>
          <p className="text-muted-foreground">
            Identify your algorithmic patterns and get personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pattern Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Pattern Mastery Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-4">Mastery Radar</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="pattern" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                        <Radar
                          name="Mastery"
                          dataKey="mastery"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="Accuracy"
                          dataKey="accuracy"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-4">Problems Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pattern Details */}
            <Card>
              <CardHeader>
                <CardTitle>Pattern Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPattern === pattern.id ? 'border-primary bg-muted/50' : 'hover:bg-muted/30'
                      }`}
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{pattern.name}</h4>
                        <Badge 
                          variant={pattern.mastery >= 80 ? 'default' : pattern.mastery >= 60 ? 'secondary' : 'destructive'}
                        >
                          {pattern.mastery}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={pattern.mastery} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{pattern.problems} problems</span>
                          <span>{pattern.accuracy}% accuracy</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations & Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Pattern Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPatternData && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-2">{selectedPatternData.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {selectedPatternData.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Mastery Level</span>
                          <span className="font-medium">{selectedPatternData.mastery}%</span>
                        </div>
                        <Progress value={selectedPatternData.mastery} />
                        <div className="flex justify-between text-sm">
                          <span>Problems Solved</span>
                          <span className="font-medium">{selectedPatternData.problems}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Accuracy</span>
                          <span className="font-medium">{selectedPatternData.accuracy}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Example Problems</h5>
                      <div className="space-y-1">
                        {selectedPatternData.examples.map((example, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {rec.type === "weak" ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : rec.type === "medium" ? (
                        <TrendingUp className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="font-medium text-sm">{rec.pattern}</span>
                      <Badge variant="outline" className="text-xs">
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDetector;
