
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import CodeDebugger from "@/components/CodeDebugger";
import { Play, RotateCcw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";
import { toast } from "@/hooks/use-toast";

const CodeDebuggerPage = () => {
  const [code, setCode] = useState(`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

result = bubble_sort([64, 34, 25, 12, 22, 11, 90])`);
  
  const [input, setInput] = useState("[64, 34, 25, 12, 22, 11, 90]");
  const [isDebugging, setIsDebugging] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // NEW: track loading
  const [debugResult, setDebugResult] = useState("");


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

  const startDebugging = async () => {
    setIsDebugging(true);
    toast({
      title: "Debugging started...",
      description: "Contacting AI to simulate debugging..."
    });

    const prompt = `You are a Python code debugger. Given this Python code:\n\n${code}\n\nand the input: ${input},\n\nsimulate the step-by-step execution, showing variable values and key state changes after each significant line. Output must be clear and readable.`

    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "65b88dcaffmshb89be45b7c240d0p1cab1fjsnaf98335909e6", // 🔐 Replace with your key
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        web_access: false
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      // Pass result to your debugger component (optionally store it in state)
      const debugResult = result.result || "No response from AI.";
      toast({
        title: "Debugging complete",
        description: "AI has analyzed your code."
      });

      // Optional: You can pass the output as a prop or log for now
      console.log("DEBUG OUTPUT:\n", debugResult);
      setDebugResult(debugResult);
      // You may enhance <CodeDebugger /> to accept and display this output

    } catch (error) {
      console.error("AI Debugging Error:", error);
      toast({
        title: "Debugging failed",
        description: "Something went wrong while contacting AI"
      });
      setIsDebugging(false);
    }
  };


  const resetDebugger = () => {
    setIsDebugging(false);
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
          <h1 className="text-3xl font-bold mb-2">Code Debugger</h1>
          <p className="text-muted-foreground">Step-by-step visualization of code execution with variable tracking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Code Input */}
          <Card>
            <CardHeader>
              <CardTitle>Code Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your code here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Test Input */}
          <Card>
            <CardHeader>
              <CardTitle>Test Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Input Data</label>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter test input..."
                  className="font-mono"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={startDebugging}
                  disabled={isDebugging}
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Start Debugging
                </Button>
                
                <Button
                  onClick={resetDebugger}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Debugger Component */}
        {isDebugging && (
          <CodeDebugger 
            code={code}
            input={input} // if supported
          />
        )}

      </div>
    </div>
  );
};

export default CodeDebuggerPage;
