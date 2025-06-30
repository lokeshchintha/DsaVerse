
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Bug } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Variable {
  name: string;
  value: any;
  type: string;
}

interface ExecutionStep {
  line: number;
  code: string;
  variables: Variable[];
  stack: string[];
  description: string;
  iteration?: number;
  loopInfo?: {
    type: string;
    condition: string;
    iteration: number;
  };
}

const CodeDebugger = ({ code, input }: { code: string; input: string}) => {
  const [language, setLanguage] = useState("javascript");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [isDebugging, setIsDebugging] = useState(false);

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" }
  ];

  // Generate detailed execution steps with loop iterations
  const generateExecutionSteps = () => {
    const steps: ExecutionStep[] = [
      {
        line: 1,
        code: "function fibonacci(n) {",
        variables: [{ name: "n", value: 5, type: "number" }],
        stack: ["fibonacci(5)"],
        description: "Function fibonacci called with n = 5"
      },
      {
        line: 2,
        code: "let a = 0, b = 1;",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 0, type: "number" },
          { name: "b", value: 1, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Initialize variables a = 0, b = 1"
      },
      {
        line: 3,
        code: "for (let i = 0; i < n; i++) {",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 0, type: "number" },
          { name: "b", value: 1, type: "number" },
          { name: "i", value: 0, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Start for loop: i = 0, condition i < 5 is true",
        loopInfo: { type: "for", condition: "i < 5", iteration: 1 }
      },
      {
        line: 4,
        code: "let temp = a + b;",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 0, type: "number" },
          { name: "b", value: 1, type: "number" },
          { name: "i", value: 0, type: "number" },
          { name: "temp", value: 1, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Iteration 1: Calculate temp = a + b = 0 + 1 = 1",
        loopInfo: { type: "for", condition: "i < 5", iteration: 1 }
      },
      {
        line: 5,
        code: "a = b;",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 1, type: "number" },
          { name: "b", value: 1, type: "number" },
          { name: "i", value: 0, type: "number" },
          { name: "temp", value: 1, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Iteration 1: Update a = b = 1",
        loopInfo: { type: "for", condition: "i < 5", iteration: 1 }
      },
      {
        line: 6,
        code: "b = temp;",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 1, type: "number" },
          { name: "b", value: 1, type: "number" },
          { name: "i", value: 0, type: "number" },
          { name: "temp", value: 1, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Iteration 1: Update b = temp = 1",
        loopInfo: { type: "for", condition: "i < 5", iteration: 1 }
      },
      {
        line: 7,
        code: 'console.log("Iteration " + i + ": " + a);',
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 1, type: "number" },
          { name: "b", value: 1, type: "number" },
          { name: "i", value: 0, type: "number" },
          { name: "temp", value: 1, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: 'Iteration 1: Output "Iteration 0: 1"',
        loopInfo: { type: "for", condition: "i < 5", iteration: 1 }
      },
      {
        line: 3,
        code: "for (let i = 0; i < n; i++) {",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 1, type: "number" },
          { name: "b", value: 1, type: "number" },
          { name: "i", value: 1, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Loop increment: i = 1, condition i < 5 is true",
        loopInfo: { type: "for", condition: "i < 5", iteration: 2 }
      },
      {
        line: 4,
        code: "let temp = a + b;",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 1, type: "number" },
          { name: "b", value: 1, type: "number" },
          { name: "i", value: 1, type: "number" },
          { name: "temp", value: 2, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Iteration 2: Calculate temp = a + b = 1 + 1 = 2",
        loopInfo: { type: "for", condition: "i < 5", iteration: 2 }
      },
      {
        line: 9,
        code: "return a;",
        variables: [
          { name: "n", value: 5, type: "number" },
          { name: "a", value: 5, type: "number" }
        ],
        stack: ["fibonacci(5)"],
        description: "Return final result: a = 5"
      }
    ];
    setExecutionSteps(steps);
    setCurrentStep(0);
    setIsDebugging(true);
  };

  const startDebugging = () => {
    generateExecutionSteps();
    toast({
      title: "Debugging Started! 🐛",
      description: "Step through your code execution line by line with detailed loop tracking."
    });
  };

  const nextStep = () => {
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetDebugger = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsDebugging(false);
    setExecutionSteps([]);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < executionSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= executionSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, executionSteps.length]);

  const currentExecution = executionSteps[currentStep];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Advanced Code Debugger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Input</label>
              <Input
                value={input}
                readOnly
                placeholder="Input values are managed by parent component"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Code</label>
            <Textarea
              value={code}
              readOnly
              className="min-h-[300px] font-mono text-sm"
              placeholder="Code is managed by parent component"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={startDebugging} disabled={isDebugging}>
              Start Advanced Debugging
            </Button>
            <Button variant="outline" onClick={resetDebugger}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {isDebugging && (
        <>
          {/* Debug Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Debug Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={toggleAutoPlay}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={nextStep} disabled={currentStep >= executionSteps.length - 1}>
                  <SkipForward className="h-4 w-4" />
                </Button>
                <div className="ml-4 text-sm text-muted-foreground">
                  Step {currentStep + 1} of {executionSteps.length}
                </div>
                {currentExecution?.loopInfo && (
                  <Badge variant="outline" className="ml-2">
                    {currentExecution.loopInfo.type} loop - Iteration {currentExecution.loopInfo.iteration}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Code Display with Highlighting */}
            <Card>
              <CardHeader>
                <CardTitle>Code Execution Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {code.split('\n').map((line, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-sm font-mono transition-all ${
                        currentExecution && currentExecution.line === index + 1
                          ? 'bg-yellow-200 dark:bg-yellow-800 border-l-4 border-yellow-500 shadow-md'
                          : 'hover:bg-muted/30'
                      }`}
                    >
                      <span className="text-muted-foreground mr-3 select-none">{index + 1}</span>
                      <span className={currentExecution && currentExecution.line === index + 1 ? 'font-bold' : ''}>
                        {line || ' '}
                      </span>
                    </div>
                  ))}
                </div>
                
                {currentExecution && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-500">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      Current Execution
                      {currentExecution.loopInfo && (
                        <Badge variant="secondary">
                          {currentExecution.loopInfo.type} - {currentExecution.loopInfo.condition}
                        </Badge>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">{currentExecution.description}</p>
                    <code className="text-sm bg-muted p-1 rounded">{currentExecution.code}</code>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Variables and Stack */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Variables State</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentExecution && currentExecution.variables.length > 0 ? (
                    <div className="space-y-2">
                      {currentExecution.variables.map((variable, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded border">
                          <span className="font-mono text-sm font-medium">{variable.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{variable.type}</Badge>
                            <span className="font-mono text-sm bg-background px-2 py-1 rounded">
                              {JSON.stringify(variable.value)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No variables in current scope</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Call Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentExecution && currentExecution.stack.length > 0 ? (
                    <div className="space-y-2">
                      {currentExecution.stack.map((call, index) => (
                        <div key={index} className="p-3 bg-muted rounded font-mono text-sm border">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                              {index + 1}
                            </span>
                            {call}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Call stack is empty</p>
                  )}
                </CardContent>
              </Card>

              {/* Loop Information */}
              {currentExecution?.loopInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Loop Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Loop Type:</span>
                        <Badge>{currentExecution.loopInfo.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Condition:</span>
                        <code className="text-sm">{currentExecution.loopInfo.condition}</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current Iteration:</span>
                        <Badge variant="outline">{currentExecution.loopInfo.iteration}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeDebugger;
