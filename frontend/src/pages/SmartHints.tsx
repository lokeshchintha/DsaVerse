
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { 
  Lightbulb, 
  Code, 
  Brain, 
  Zap, 
  Target, 
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const SmartHints = () => {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Your implementation here
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`);
  
  const [selectedProblem, setSelectedProblem] = useState("two-sum");
  const [hintLevel, setHintLevel] = useState(1);
  const [showHints, setShowHints] = useState(false);
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

  const problems = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      description: "Find two numbers in an array that add up to a target sum."
    },
    {
      id: "binary-search",
      title: "Binary Search",
      difficulty: "Easy",
      description: "Search for a target value in a sorted array."
    },
    {
      id: "longest-substring",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      description: "Find the length of the longest substring without repeating characters."
    }
  ];

  const hints = {
    "two-sum": [
      {
        level: 1,
        type: "approach",
        content: "Think about what you need to find for each number in the array.",
        icon: Lightbulb
      },
      {
        level: 2,
        type: "optimization",
        content: "Can you avoid checking all pairs? What if you store what you've seen?",
        icon: Brain
      },
      {
        level: 3,
        type: "implementation",
        content: "Use a hash map to store numbers and their indices as you iterate.",
        icon: Code
      },
      {
        level: 4,
        type: "solution",
        content: "For each number, check if (target - current number) exists in your hash map.",
        icon: Target
      }
    ],
    "binary-search": [
      {
        level: 1,
        type: "approach",
        content: "How can you eliminate half of the search space in each step?",
        icon: Lightbulb
      },
      {
        level: 2,
        type: "implementation",
        content: "Use two pointers: left and right, and compare with the middle element.",
        icon: Code
      }
    ],
    "longest-substring": [
      {
        level: 1,
        type: "approach",
        content: "Think about using a sliding window technique.",
        icon: Lightbulb
      },
      {
        level: 2,
        type: "optimization",
        content: "Keep track of characters you've seen and their positions.",
        icon: Brain
      }
    ]
  };

  const codeAnalysis = {
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    issues: [
      "Nested loops lead to quadratic time complexity",
      "Could be optimized using hash map for O(n) solution"
    ],
    suggestions: [
      "Consider using a hash map to store complements",
      "Single pass solution is possible",
      "Think about trading space for time"
    ]
  };

  const generateHint = () => {
    const problemHints = hints[selectedProblem] || [];
    if (hintLevel <= problemHints.length) {
      setShowHints(true);
      toast({
        title: `Hint ${hintLevel} Revealed!`,
        description: "Check the hints panel for guidance."
      });
    } else {
      toast({
        title: "All hints revealed!",
        description: "You've seen all available hints for this problem."
      });
    }
  };

  const nextHint = () => {
    const problemHints = hints[selectedProblem] || [];
    if (hintLevel < problemHints.length) {
      setHintLevel(hintLevel + 1);
      generateHint();
    }
  };

  const resetHints = () => {
    setHintLevel(1);
    setShowHints(false);
  };

  const currentProblem = problems.find(p => p.id === selectedProblem);
  const currentHints = hints[selectedProblem] || [];
  const currentHint = currentHints[hintLevel - 1];

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
          <h1 className="text-3xl font-bold mb-2">Smart Hints System</h1>
          <p className="text-muted-foreground">
            Get intelligent, progressive hints tailored to your coding approach
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem Selection & Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Problem & Code</CardTitle>
                  <div className="flex gap-2">
                    <Select value={selectedProblem} onValueChange={setSelectedProblem}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {problems.map((problem) => (
                          <SelectItem key={problem.id} value={problem.id}>
                            {problem.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentProblem && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{currentProblem.title}</h3>
                      <Badge variant={currentProblem.difficulty === 'Easy' ? 'secondary' : 'default'}>
                        {currentProblem.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentProblem.description}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Code</label>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="Write your solution here..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Code Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Code Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">Time Complexity</div>
                    <div className="text-lg font-bold text-orange-600">{codeAnalysis.timeComplexity}</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">Space Complexity</div>
                    <div className="text-lg font-bold text-blue-600">{codeAnalysis.spaceComplexity}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Issues Detected
                  </h4>
                  <ul className="space-y-1">
                    {codeAnalysis.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {issue}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    Optimization Suggestions
                  </h4>
                  <ul className="space-y-1">
                    {codeAnalysis.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hints Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Smart Hints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={generateHint} className="flex-1">
                    <Zap className="h-4 w-4 mr-2" />
                    Get Hint {hintLevel}
                  </Button>
                  <Button variant="outline" onClick={resetHints}>
                    Reset
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Hint Level: {hintLevel} / {currentHints.length}
                </div>

                {showHints && currentHint && (
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30">
                      <div className="flex items-center gap-2 mb-2">
                        <currentHint.icon className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm capitalize">{currentHint.type} Hint</span>
                        <Badge variant="outline">Level {hintLevel}</Badge>
                      </div>
                      <p className="text-sm">{currentHint.content}</p>
                    </div>

                    {hintLevel < currentHints.length && (
                      <Button variant="outline" onClick={nextHint} className="w-full">
                        Next Hint <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                )}

                {!showHints && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Click "Get Hint" to receive intelligent guidance</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hint History */}
            {showHints && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hint History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentHints.slice(0, hintLevel).map((hint, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <hint.icon className="h-3 w-3" />
                          <span className="text-xs font-medium">Level {idx + 1}</span>
                          <Badge variant="outline" className="text-xs">{hint.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{hint.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHints;
