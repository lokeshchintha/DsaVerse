
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Code, Play, Save, Clock, CheckCircle, AlertCircle, Timer, ArrowLeft, Lightbulb, RefreshCw, Plus, Bug, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import LoginGate from "./LoginGate";

const DSAProblemSolver = () => {
  const { problemId } = useParams();
  const [code, setCode] = useState("// Write your solution here\n");
  const [language, setLanguage] = useState("javascript");
  const [customInput, setCustomInput] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [codeToConvert, setCodeToConvert] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("python");
  const [convertedCode, setConvertedCode] = useState("");
  const [debugInput, setDebugInput] = useState("");
  const [debugSteps, setDebugSteps] = useState([]);
  const [currentDebugStep, setCurrentDebugStep] = useState(0);
  const [isDebugging, setIsDebugging] = useState(false);
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
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "typescript", label: "TypeScript" }
  ];

  // Sample problem data
  const problem = {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    inputFormat: "The first line contains n, the number of elements in the array.\nThe second line contains n space-separated integers representing the array.\nThe third line contains the target integer.",
    outputFormat: "Return two space-separated integers representing the indices of the two numbers that add up to the target.",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    topics: ["Array", "Hash Table", "Two Pointers"],
    publicTestCases: [
      {
        input: "4\n2 7 11 15\n9",
        expectedOutput: "0 1",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "3\n3 2 4\n6",
        expectedOutput: "1 2",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        input: "2\n3 3\n6",
        expectedOutput: "0 1",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ]
  };

  const [customTestCases, setCustomTestCases] = useState([]);

  // Timer functionality
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimeElapsed(0);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeElapsed(0);
  };

  const addCustomTestCase = () => {
    if (customInput.trim()) {
      const newTestCase = {
        id: Date.now(),
        input: customInput,
        isCustom: true
      };
      setCustomTestCases([...customTestCases, newTestCase]);
      setCustomInput("");
    }
  };

  const removeCustomTestCase = (id) => {
    setCustomTestCases(customTestCases.filter(tc => tc.id !== id));
  };

  const runCode = () => {
    const allTestCases = [
      ...problem.publicTestCases.map((tc, idx) => ({ ...tc, id: `public-${idx}`, isCustom: false })),
      ...customTestCases
    ];

    const results = allTestCases.map((testCase) => ({
      ...testCase,
      passed: Math.random() > 0.3,
      actualOutput: testCase.expectedOutput || "Sample output",
      runtime: Math.floor(Math.random() * 50) + "ms",
      memory: Math.floor(Math.random() * 20) + 10 + "MB"
    }));

    setTestResults(results);
    
    const passedTests = results.filter(r => r.passed).length;
    toast({
      title: `Test Results: ${passedTests}/${results.length} passed`,
      description: passedTests === results.length ? "All tests passed! 🎉" : "Some tests failed. Check your logic."
    });
  };

  const convertCode = () => {
    const sampleConversions = {
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
}`
    };
    
    setConvertedCode(sampleConversions[targetLanguage] || "// Conversion not available for this language");
    toast({
      title: "Code Converted! 🔄",
      description: `Successfully converted to ${targetLanguage}`
    });
  };

  const startDebugging = () => {
    if (!code.trim() || !debugInput.trim()) {
      toast({
        title: "Missing Input",
        description: "Please provide both code and input for debugging."
      });
      return;
    }

    // Simulate debug steps
    const steps = [
      { line: 1, code: "def two_sum(nums, target):", explanation: "Function definition starts", variables: {} },
      { line: 2, code: "    hash_map = {}", explanation: "Initialize empty hash map", variables: { hash_map: {} } },
      { line: 3, code: "    for i, num in enumerate(nums):", explanation: "Start iterating through array", variables: { hash_map: {}, i: 0, num: 2 } },
      { line: 4, code: "        complement = target - num", explanation: "Calculate complement", variables: { hash_map: {}, i: 0, num: 2, complement: 7 } },
      { line: 5, code: "        if complement in hash_map:", explanation: "Check if complement exists in map", variables: { hash_map: {}, i: 0, num: 2, complement: 7 } },
      { line: 7, code: "        hash_map[num] = i", explanation: "Store current number and index", variables: { hash_map: { 2: 0 }, i: 0, num: 2, complement: 7 } }
    ];

    setDebugSteps(steps);
    setCurrentDebugStep(0);
    setIsDebugging(true);
    toast({
      title: "Debugging Started! 🐛",
      description: "Step through your code execution."
    });
  };

  const nextDebugStep = () => {
    if (currentDebugStep < debugSteps.length - 1) {
      setCurrentDebugStep(currentDebugStep + 1);
    }
  };

  const prevDebugStep = () => {
    if (currentDebugStep > 0) {
      setCurrentDebugStep(currentDebugStep - 1);
    }
  };

  const saveCode = () => {
    const codeData = {
      problemId,
      code,
      language,
      timeElapsed,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`problem_${problemId}_${language}`, JSON.stringify(codeData));
    toast({
      title: "Code Saved! 💾",
      description: `Saved with ${formatTime(timeElapsed)} elapsed time`
    });
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
      
      <div className="container mx-auto px-4 py-6">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dsa-arena">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Problems
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <Badge variant={problem.difficulty === 'easy' ? 'secondary' : problem.difficulty === 'medium' ? 'default' : 'destructive'}>
              {problem.difficulty}
            </Badge>
          </div>
          
          {/* Timer */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-muted p-2 rounded">
              <Timer className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeElapsed)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={isTimerRunning ? stopTimer : startTimer}
            >
              {isTimerRunning ? "Stop" : "Start"}
            </Button>
            <Button variant="outline" size="sm" onClick={resetTimer}>
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Problem Statement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Example Test Cases</h4>
                  <div className="space-y-3">
                    {problem.publicTestCases.map((testCase, idx) => (
                      <div key={idx} className="border rounded p-3 bg-muted/30">
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div>
                            <label className="text-xs font-medium text-blue-600">Input</label>
                            <pre className="text-xs bg-background p-2 rounded mt-1 whitespace-pre-wrap">{testCase.input}</pre>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-green-600">Output</label>
                            <pre className="text-xs bg-background p-2 rounded mt-1">{testCase.expectedOutput}</pre>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-purple-600">Explanation</label>
                          <p className="text-xs text-muted-foreground mt-1">{testCase.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Input Format</h4>
                  <pre className="text-sm bg-muted p-3 rounded whitespace-pre-wrap">{problem.inputFormat}</pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Output Format</h4>
                  <pre className="text-sm bg-muted p-3 rounded whitespace-pre-wrap">{problem.outputFormat}</pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Constraints</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {problem.constraints.map((constraint, idx) => (
                      <li key={idx}>• {constraint}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Testing */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={saveCode}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button onClick={runCode} size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Write your solution here..."
                />
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Custom Test Case */}
                <div className="border rounded p-3">
                  <h4 className="font-medium mb-2">Add Custom Test Case</h4>
                  <div className="flex gap-2">
                    <Textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter custom input..."
                      className="flex-1"
                      rows={3}
                    />
                    <Button onClick={addCustomTestCase} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Public Test Cases */}
                <div className="space-y-3">
                  <h4 className="font-medium">Public Test Cases</h4>
                  {problem.publicTestCases.map((testCase, idx) => (
                    <div key={idx} className="border rounded p-3 bg-muted/50">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium">Input</label>
                          <pre className="text-xs bg-background p-2 rounded mt-1 whitespace-pre-wrap">{testCase.input}</pre>
                        </div>
                        <div>
                          <label className="text-xs font-medium">Expected Output</label>
                          <pre className="text-xs bg-background p-2 rounded mt-1">{testCase.expectedOutput}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Test Cases */}
                {customTestCases.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Custom Test Cases</h4>
                    {customTestCases.map((testCase) => (
                      <div key={testCase.id} className="border rounded p-3 bg-blue-50 dark:bg-blue-950">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <label className="text-xs font-medium">Input</label>
                            <pre className="text-xs bg-background p-2 rounded mt-1 whitespace-pre-wrap">{testCase.input}</pre>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCustomTestCase(testCase.id)}
                          >
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {testResults.map((result, idx) => (
                      <div key={result.id || idx} className={`p-3 rounded border ${
                        result.passed ? 'bg-green-50 border-green-200 dark:bg-green-950' : 'bg-red-50 border-red-200 dark:bg-red-950'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">
                            {result.isCustom ? 'Custom' : 'Public'} Test Case {idx + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-muted-foreground">{result.runtime}</span>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div><strong>Input:</strong> <pre className="inline">{result.input}</pre></div>
                          <div><strong>Output:</strong> {result.actualOutput}</div>
                          {result.expectedOutput && (
                            <div><strong>Expected:</strong> {result.expectedOutput}</div>
                          )}
                          <div className="text-xs text-muted-foreground">Memory: {result.memory}</div>
                        </div>
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

export default DSAProblemSolver;
