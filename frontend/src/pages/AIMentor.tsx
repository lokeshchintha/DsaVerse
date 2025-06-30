
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { MessageSquare, Code, Lightbulb, Zap, Send, Bot, User, FileText, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const AIMentor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content: "Hi! I'm your AI coding mentor. I can help you with code problems, explain algorithms, suggest optimizations, and provide hints. What would you like to work on today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [codeToAnalyze, setCodeToAnalyze] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
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


  const quickActions = [
    { label: "Explain this algorithm", icon: FileText },
    { label: "Optimize my code", icon: Zap },
    { label: "Find edge cases", icon: Search },
    { label: "Code review", icon: Code }
  ];

  const codeExamples = [
    {
      title: "Two Sum Problem",
      code: `function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`,
      issues: ["O(n²) time complexity", "Can be optimized using hash map"],
      optimization: "Use hash map for O(n) solution"
    },
    {
      title: "Binary Search",
      code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      issues: [],
      optimization: "Well optimized - O(log n) complexity"
    }
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    const aiTypingMessage = {
      id: messages.length + 2,
      sender: "ai",
      content: "Typing...",
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, aiTypingMessage]);

    try {
      const response = await fetch('http://localhost:5000/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: inputMessage
            }
          ]
        })
      });

      const result = await response.text();

      const aiResponse = {
        id: messages.length + 3,
        sender: "ai",
        content: result,
        timestamp: new Date().toLocaleTimeString()
      };

      // Replace the "Typing..." message with the real response
      setMessages(prev => [...prev.slice(0, -1), aiResponse]);
    } catch (error) {
      console.error("AI API Error:", error);
      toast({
        title: "AI Response Failed",
        description: "Unable to get a response from the AI.",
        variant: "destructive"
      });

      setMessages(prev => [...prev.slice(0, -1), {
        id: messages.length + 3,
        sender: "ai",
        content: "Sorry, something went wrong while fetching AI response.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };
  
  const analyzeCode = async () => {
    if (!codeToAnalyze.trim()) {
      toast({
        title: "Please enter code to analyze",
        description: "Paste your code in the text area above"
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/analyze-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: codeToAnalyze
        })
      });

      const result = await response.text();

      setAnalysisResult({
        resultText: result
      });

      toast({
        title: "Code Analysis Complete! 🔍",
        description: "AI has reviewed your code."
      });
    } catch (error) {
      console.error("Analysis API Error:", error);
      toast({
        title: "Code Analysis Failed",
        description: "Unable to fetch code analysis from AI.",
        variant: "destructive"
      });
    }
  };



  const useQuickAction = (action) => {
    setInputMessage(action);
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
  
  if (loading) return null;
  
  if (!isLoggedIn) {
    return (
      <LoginGate 
      title="Ai Mentor" 
      description="Compete with coders worldwide in our weekly programming contests"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">AI Mentor</h1>
          <p className="text-muted-foreground">Get instant help with coding problems and algorithm explanations</p>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="analyzer">Code Analyzer</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {quickActions.map((action) => {
                      const IconComponent = action.icon;
                      return (
                        <Button
                          key={action.label}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => useQuickAction(action.label)}
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {action.label}
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      AI Coding Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div className={`flex gap-3 max-w-[80%] ${
                              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                            }`}>
                              <div className={`p-2 rounded-full ${
                                message.sender === 'user' ? 'bg-primary' : 'bg-muted'
                              }`}>
                                {message.sender === 'user' ? (
                                  <User className="h-4 w-4 text-primary-foreground" />
                                ) : (
                                  <Bot className="h-4 w-4" />
                                )}
                              </div>
                              <div className={`p-3 rounded-lg ${
                                message.sender === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                  message.sender === 'user'
                                    ? 'text-primary-foreground/70'
                                    : 'text-muted-foreground'
                                }`}>
                                  {message.timestamp}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="flex gap-2 mt-4">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask me anything about coding..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <Button onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analyzer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={codeToAnalyze}
                    onChange={(e) => setCodeToAnalyze(e.target.value)}
                    placeholder="Paste your code here for analysis..."
                    className="min-h-[300px] font-mono"
                  />
                  <Button onClick={analyzeCode} className="w-full">
                    <Code className="h-4 w-4 mr-2" />
                    Analyze Code
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Quality Score:</span>
                        <Badge variant={analysisResult.score >= 80 ? 'default' : analysisResult.score >= 60 ? 'secondary' : 'destructive'}>
                          {analysisResult.score}/100
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Complexity Analysis</h4>
                        <div className="space-y-1 text-sm">
                          <div>Time Complexity: <code className="bg-muted px-1 rounded">{analysisResult.complexity.time}</code></div>
                          <div>Space Complexity: <code className="bg-muted px-1 rounded">{analysisResult.complexity.space}</code></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Issues Found</h4>
                        <ul className="space-y-1">
                          {analysisResult.issues.map((issue, idx) => (
                            <li key={idx} className="text-sm text-red-600 flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Suggestions</h4>
                        <ul className="space-y-1">
                          {analysisResult.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sm text-green-600 flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Enter your code and click "Analyze Code" to get detailed feedback
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid gap-6">
              {codeExamples.map((example, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Code</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Issues</h4>
                        {example.issues.length > 0 ? (
                          <ul className="space-y-1">
                            {example.issues.map((issue, issueIdx) => (
                              <li key={issueIdx} className="text-sm text-red-600 flex items-start gap-2">
                                <span className="text-red-400 mt-1">•</span>
                                {issue}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-green-600">No issues found!</p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Optimization</h4>
                        <p className="text-sm text-blue-600">{example.optimization}</p>
                      </div>
                    </div>

                    <Button variant="outline" onClick={() => setCodeToAnalyze(example.code)}>
                      <Code className="h-4 w-4 mr-2" />
                      Analyze This Code
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIMentor;
