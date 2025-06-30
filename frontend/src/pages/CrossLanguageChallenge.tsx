
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Code, Play, Save, Timer, ArrowLeft, RefreshCw, Trophy, Zap, Brain, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

interface LanguageSolution {
  language: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  executionTime: string;
  memoryUsage: string;
  isCompleted: boolean;
}

const CrossLanguageChallenge = () => {
  const [selectedProblem, setSelectedProblem] = useState("two-sum");
  const [currentLanguage, setCurrentLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [solutions, setSolutions] = useState<LanguageSolution[]>([]);
  const [challengeMode, setChallengeMode] = useState(false);
  const [targetLanguages, setTargetLanguages] = useState<string[]>([]);
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

  const languages = [
    { value: "python", label: "Python", color: "bg-blue-500" },
    { value: "java", label: "Java", color: "bg-orange-500" },
    { value: "cpp", label: "C++", color: "bg-purple-500" },
    { value: "javascript", label: "JavaScript", color: "bg-yellow-500" },
    { value: "go", label: "Go", color: "bg-cyan-500" },
    { value: "rust", label: "Rust", color: "bg-red-500" }
  ];

  const problems = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
    },
    {
      id: "longest-substring",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium", 
      description: "Given a string s, find the length of the longest substring without repeating characters."
    },
    {
      id: "merge-intervals",
      title: "Merge Intervals",
      difficulty: "Medium",
      description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals."
    }
  ];

  const sampleSolutions = {
    python: `def two_sum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
    java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[0];
}`,
    cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`,
    javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
  };

  const currentProblem = problems.find(p => p.id === selectedProblem);
  const currentLangData = languages.find(l => l.value === currentLanguage);

  const startChallenge = () => {
    setChallengeMode(true);
    setTargetLanguages(["python", "java", "cpp"]);
    setSolutions([]);
    toast({
      title: "🎮 Challenge Started!",
      description: "Solve this problem in 3 different languages to earn badges!"
    });
  };

  const submitSolution = () => {
    const mockMetrics = {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      executionTime: Math.floor(Math.random() * 200) + 50 + "ms",
      memoryUsage: Math.floor(Math.random() * 20) + 10 + "MB"
    };

    const newSolution: LanguageSolution = {
      language: currentLanguage,
      code: code,
      isCompleted: true,
      ...mockMetrics
    };

    setSolutions(prev => {
      const filtered = prev.filter(s => s.language !== currentLanguage);
      return [...filtered, newSolution];
    });

    toast({
      title: "✅ Solution Submitted!",
      description: `${currentLangData?.label} solution completed successfully.`
    });
  };

  const autoTranslate = (targetLang: string) => {
    if (sampleSolutions[targetLang as keyof typeof sampleSolutions]) {
      setCurrentLanguage(targetLang);
      setCode(sampleSolutions[targetLang as keyof typeof sampleSolutions]);
      toast({
        title: "🔄 Code Translated!",
        description: `Auto-translated to ${languages.find(l => l.value === targetLang)?.label}`
      });
    }
  };

  const completedLanguages = solutions.filter(s => s.isCompleted).length;
  const badgeEarned = completedLanguages >= 3;

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
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dsa-arena">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Arena
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Cross-Language Challenge</h1>
            {badgeEarned && (
              <Badge className="bg-yellow-500 text-black">
                <Trophy className="h-3 w-3 mr-1" />
                Polyglot Solver
              </Badge>
            )}
          </div>
          
          <Button onClick={startChallenge} className="bg-gradient-to-r from-purple-500 to-pink-500">
            <Zap className="h-4 w-4 mr-2" />
            Start Challenge Mode
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem Selection & Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Problem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedProblem} onValueChange={setSelectedProblem}>
                  <SelectTrigger>
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
                
                {currentProblem && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{currentProblem.title}</h3>
                      <Badge variant={currentProblem.difficulty === 'Easy' ? 'secondary' : 'default'}>
                        {currentProblem.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentProblem.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {challengeMode && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Challenge Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">{completedLanguages}/3</span> languages completed
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {targetLanguages.map((lang) => {
                        const isCompleted = solutions.some(s => s.language === lang && s.isCompleted);
                        const langData = languages.find(l => l.value === lang);
                        return (
                          <div
                            key={lang}
                            className={`p-2 rounded text-center text-xs ${
                              isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-muted'
                            }`}
                          >
                            {langData?.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Language Quick Switch */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Language Switch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.value}
                      variant={currentLanguage === lang.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentLanguage(lang.value)}
                      className="text-xs"
                    >
                      <div className={`w-2 h-2 rounded-full ${lang.color} mr-2`} />
                      {lang.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Editor - {currentLangData?.label}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => autoTranslate(currentLanguage)}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Auto-fill Sample
                    </Button>
                    <Button onClick={submitSolution}>
                      <Play className="h-4 w-4 mr-1" />
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  placeholder={`Write your ${currentLangData?.label} solution here...`}
                />
              </CardContent>
            </Card>

            {/* Auto-Translate Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Translation Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.filter(l => l.value !== currentLanguage).map((lang) => (
                    <Button
                      key={lang.value}
                      variant="outline"
                      size="sm"
                      onClick={() => autoTranslate(lang.value)}
                    >
                      Translate to {lang.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Solutions Comparison */}
            {solutions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Performance Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Language</th>
                          <th className="text-left p-2">Time Complexity</th>
                          <th className="text-left p-2">Execution Time</th>
                          <th className="text-left p-2">Memory Usage</th>
                          <th className="text-left p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {solutions.map((solution) => {
                          const langData = languages.find(l => l.value === solution.language);
                          return (
                            <tr key={solution.language} className="border-b">
                              <td className="p-2">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${langData?.color}`} />
                                  {langData?.label}
                                </div>
                              </td>
                              <td className="p-2 font-mono">{solution.timeComplexity}</td>
                              <td className="p-2 font-mono">{solution.executionTime}</td>
                              <td className="p-2 font-mono">{solution.memoryUsage}</td>
                              <td className="p-2">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  ✅ Completed
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {solutions.length >= 2 && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                      <h4 className="font-medium mb-2">🧠 Learning Insights</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Different languages show varying memory management approaches</li>
                        <li>• Hash map implementations differ across languages</li>
                        <li>• Consider language-specific optimizations for better performance</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossLanguageChallenge;
