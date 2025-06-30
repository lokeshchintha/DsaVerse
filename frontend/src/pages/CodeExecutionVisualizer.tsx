
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  Code, 
  Brain,
  Zap,
  Database,
  Clock,
  BarChart3,
  Cpu,
  ArrowRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const CodeExecutionVisualizer = () => {
  const [code, setCode] = useState(`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

result = fibonacci(5)
print(result)`);
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

  const [language, setLanguage] = useState("python");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [step, setStep] = useState(0);
  const [variables, setVariables] = useState({});
  const [callStack, setCallStack] = useState([]);
  const [input, setInput] = useState("5");
  const [output, setOutput] = useState("");

  const executionSteps = [
    {
      line: 1,
      code: "def fibonacci(n):",
      explanation: "Function definition - defines a function named 'fibonacci' that takes parameter 'n'",
      variables: {},
      callStack: [],
      memory: { heap: {}, stack: [] }
    },
    {
      line: 2,
      code: "if n <= 1:",
      explanation: "Conditional check - tests if n is less than or equal to 1 (base case)",
      variables: { n: 5 },
      callStack: ["fibonacci(5)"],
      memory: { heap: {}, stack: [{ function: "fibonacci", args: { n: 5 } }] }
    },
    {
      line: 4,
      code: "return fibonacci(n-1) + fibonacci(n-2)",
      explanation: "Recursive calls - calls fibonacci(4) and fibonacci(3), then adds results",
      variables: { n: 5 },
      callStack: ["fibonacci(5)", "fibonacci(4)"],
      memory: { heap: {}, stack: [{ function: "fibonacci", args: { n: 5 } }, { function: "fibonacci", args: { n: 4 } }] }
    },
    {
      line: 6,
      code: "result = fibonacci(5)",
      explanation: "Function call - calls fibonacci with argument 5 and stores result in 'result' variable",
      variables: { result: 5 },
      callStack: [],
      memory: { heap: { result: 5 }, stack: [] }
    },
    {
      line: 7,
      code: "print(result)",
      explanation: "Output statement - prints the value of 'result' variable to console",
      variables: { result: 5 },
      callStack: [],
      memory: { heap: { result: 5 }, stack: [] }
    }
  ];

  const complexityAnalysis = {
    time: "O(2^n)",
    space: "O(n)",
    explanation: "Exponential time due to overlapping subproblems, linear space due to recursion depth",
    improvements: [
      "Use memoization to cache results",
      "Convert to iterative approach",
      "Use dynamic programming bottom-up approach"
    ]
  };

  const playExecution = () => {
    setIsPlaying(true);
    toast({
      title: "Execution Started",
      description: "Step-by-step execution visualization beginning..."
    });
  };

  const pauseExecution = () => {
    setIsPlaying(false);
  };

  const stepForward = () => {
    if (step < executionSteps.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setCurrentLine(executionSteps[nextStep].line);
      setVariables(executionSteps[nextStep].variables);
      setCallStack(executionSteps[nextStep].callStack);
    }
  };

  const stepBackward = () => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      setCurrentLine(executionSteps[prevStep].line);
      setVariables(executionSteps[prevStep].variables);
      setCallStack(executionSteps[prevStep].callStack);
    }
  };

  const resetExecution = () => {
    setStep(0);
    setCurrentLine(0);
    setVariables({});
    setCallStack([]);
    setIsPlaying(false);
    setOutput("");
  };

  const currentStepData = executionSteps[step] || executionSteps[0];

  const renderCodeWithHighlight = () => {
    const lines = code.split('\n');
    return lines.map((line, index) => (
      <div
        key={index}
        className={`p-2 font-mono text-sm border-l-4 ${
          index + 1 === currentLine 
            ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/30' 
            : 'border-transparent'
        }`}
      >
        <span className="text-muted-foreground mr-4">{index + 1}</span>
        <span>{line}</span>
      </div>
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
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Code Execution Visualizer</h1>
          <p className="text-muted-foreground">
            Understand your code like never before — one line at a time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Editor
                  </CardTitle>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Write your code here..."
                />
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Input (stdin simulation)</label>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input values..."
                    className="font-mono"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Execution Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Execution Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={isPlaying ? pauseExecution : playExecution}
                    variant={isPlaying ? "secondary" : "default"}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" onClick={stepBackward} disabled={step === 0}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={stepForward} disabled={step >= executionSteps.length - 1}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={resetExecution}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Step {step + 1} of {executionSteps.length} | Line {currentLine}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Execution Visualization */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Code Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-[300px] overflow-y-auto">
                  {renderCodeWithHighlight()}
                </div>
              </CardContent>
            </Card>

            {/* AI Commentary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Commentary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{currentStepData.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <CardTitle>Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-muted/50 rounded font-mono text-sm min-h-[100px]">
                  {step >= executionSteps.length - 1 ? "5" : ""}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Memory & Analysis */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Memory State
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Variables</h4>
                  <div className="space-y-1">
                    {Object.entries(variables).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                        <span className="font-mono">{key}</span>
                        <span className="font-mono text-blue-600">{String(value)}</span>
                      </div>
                    ))}
                    {Object.keys(variables).length === 0 && (
                      <div className="text-sm text-muted-foreground italic">No variables yet</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Call Stack</h4>
                  <div className="space-y-1">
                    {callStack.map((call, index) => (
                      <div key={index} className="text-sm p-2 bg-orange-50 dark:bg-orange-950/30 rounded font-mono">
                        {call}
                      </div>
                    )).reverse()}
                    {callStack.length === 0 && (
                      <div className="text-sm text-muted-foreground italic">Empty</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complexity Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Complexity Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded">
                    <div className="text-xs font-medium text-red-700 dark:text-red-300">Time</div>
                    <div className="font-mono font-bold">{complexityAnalysis.time}</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
                    <div className="text-xs font-medium text-blue-700 dark:text-blue-300">Space</div>
                    <div className="font-mono font-bold">{complexityAnalysis.space}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Explanation</h5>
                  <p className="text-xs text-muted-foreground">{complexityAnalysis.explanation}</p>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Improvements</h5>
                  <ul className="space-y-1">
                    {complexityAnalysis.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground">• {improvement}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExecutionVisualizer;
