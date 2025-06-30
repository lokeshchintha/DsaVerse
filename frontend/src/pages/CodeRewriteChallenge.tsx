
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Code, Target, Zap, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const CodeRewriteChallenge = () => {
  const [originalCode, setOriginalCode] = useState("");
  const [rewrittenCode, setRewrittenCode] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  const messyCodeExamples = [
    {
      title: "Nested Loops Optimization",
      code: `function findDuplicates(arr1, arr2) {
  var result = [];
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        var found = false;
        for (var k = 0; k < result.length; k++) {
          if (result[k] === arr1[i]) {
            found = true;
            break;
          }
        }
        if (!found) {
          result.push(arr1[i]);
        }
      }
    }
  }
  return result;
}`,
    },
    {
      title: "Complex Conditional Logic",
      code: `function processUser(user) {
  if (user) {
    if (user.age) {
      if (user.age >= 18) {
        if (user.status) {
          if (user.status === 'active') {
            if (user.permissions) {
              if (user.permissions.includes('read')) {
                return 'Access granted';
              } else {
                return 'No read permission';
              }
            } else {
              return 'No permissions';
            }
          } else {
            return 'User inactive';
          }
        } else {
          return 'No status';
        }
      } else {
        return 'Under age';
      }
    } else {
      return 'No age';
    }
  } else {
    return 'No user';
  }
}`,
    }
  ];

  const analyzeCode = async () => {
    if (!originalCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch("https://chatgpt-42.p.rapidapi.com/gpt4", {
        method: "POST",
        headers: {
          "x-rapidapi-key": "65b88dcaffmshb89be45b7c240d0p1cab1fjsnaf98335909e6", // <-- your key here
          "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Analyze this JavaScript code and return a JSON with keys: cleanliness, readability, modularity, performance (each 0-100), issues (array of strings), suggestions (array of strings). Code:\n\`\`\`javascript\n${originalCode}\n\`\`\``,
            },
          ],
          web_access: false,
        }),
      });

      const textResult = await response.text();

      // Try parse JSON from text
      let parsedResult;
      try {
        parsedResult = JSON.parse(textResult);
      } catch {
        // If not pure JSON, try extracting JSON block from text using regex
        const jsonMatch = textResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Could not parse response as JSON");
        }
      }

      // Validate expected structure
      if (
        parsedResult &&
        typeof parsedResult.cleanliness === "number" &&
        Array.isArray(parsedResult.issues) &&
        Array.isArray(parsedResult.suggestions)
      ) {
        setAnalysis(parsedResult);
        toast({
          title: "Analysis Complete! 🔍",
          description: "Your code has been analyzed using GPT-4.",
        });
      } else {
        throw new Error("API response missing expected fields");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Analysis Failed ❌",
        description: error.message || "Something went wrong",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };


  const loadExample = (example: any) => {
    setOriginalCode(example.code);
    setAnalysis(null);
    setRewrittenCode("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
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
          <h1 className="text-3xl font-bold mb-2">Code Rewrite Challenge</h1>
          <p className="text-muted-foreground">
            Improve messy code and get scored on cleanliness, readability, and modularity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Examples Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Example Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {messyCodeExamples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => loadExample(example)}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">{example.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Click to load example
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Quality Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Cleanliness", value: analysis.cleanliness },
                    { label: "Readability", value: analysis.readability },
                    { label: "Modularity", value: analysis.modularity },
                    { label: "Performance", value: analysis.performance }
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.label}</span>
                        <span className={`font-medium ${getScoreColor(metric.value)}`}>
                          {metric.value}/100
                        </span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {getScoreLabel(metric.value)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Original Code</CardTitle>
                  <Button 
                    onClick={analyzeCode} 
                    disabled={isAnalyzing}
                    className="flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Analyze Code
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={originalCode}
                  onChange={(e) => setOriginalCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Paste your messy code here..."
                />
              </CardContent>
            </Card>

            {analysis && (
              <Tabs defaultValue="issues" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="issues">Issues Found</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  <TabsTrigger value="rewrite">Your Rewrite</TabsTrigger>
                </TabsList>

                <TabsContent value="issues">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Code Issues Detected
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysis.issues.map((issue: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span className="text-sm">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="suggestions">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Improvement Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysis.suggestions.map((suggestion: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-sm">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rewrite">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Improved Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={rewrittenCode}
                        onChange={(e) => setRewrittenCode(e.target.value)}
                        className="min-h-[300px] font-mono text-sm"
                        placeholder="Write your improved version here..."
                      />
                      <div className="mt-4">
                        <Button className="w-full">
                          Submit for Re-analysis
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeRewriteChallenge;
