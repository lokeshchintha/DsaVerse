
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Code, AlertTriangle, CheckCircle, Zap, Eye, BarChart3, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const CodeAnalyzer = () => {
  const [codeInput, setCodeInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
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

  const analyzeCode = async () => {
    if (!codeInput.trim()) {
      toast({
        title: "Please enter code to analyze",
        description: "Paste your code in the editor above"
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch('http://localhost:5000/api/analyze-code1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: codeInput })
      });

      const data = await response.json();

      // Parse the JSON string from AI response content
      const parsed = JSON.parse(data.content);

      setAnalysisResult(parsed);

      toast({
        title: "AI Code Analysis Complete!",
        description: `Quality Score: ${parsed.qualityScore}/100`
      });
    } catch (error) {
      console.error("Failed to analyze code:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not parse or fetch the analysis result",
        variant: "destructive"
      });
    }

    setIsAnalyzing(false);
  };




  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Low": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
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
          <h1 className="text-3xl font-bold mb-2">Code Analyzer</h1>
          <p className="text-muted-foreground">Analyze your code for quality, performance, and best practices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Code Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Paste your code here for analysis..."
                className="min-h-[400px] font-mono text-sm"
              />
              <Button 
                onClick={analyzeCode} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analyze Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="issues">Issues</TabsTrigger>
                  <TabsTrigger value="patterns">Patterns</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Code Quality Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisResult.qualityScore)}`}>
                          {analysisResult.qualityScore}/100
                        </div>
                        <p className="text-muted-foreground">Overall Quality Score</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded">
                          <div className="text-lg font-semibold">{analysisResult.complexity.time}</div>
                          <p className="text-xs text-muted-foreground">Time Complexity</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded">
                          <div className="text-lg font-semibold">{analysisResult.complexity.space}</div>
                          <p className="text-xs text-muted-foreground">Space Complexity</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Lines of Code:</span>
                          <span className="ml-2 font-medium">{analysisResult.metrics.lines}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Functions:</span>
                          <span className="ml-2 font-medium">{analysisResult.metrics.functions}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Classes:</span>
                          <span className="ml-2 font-medium">{analysisResult.metrics.classes}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Comments:</span>
                          <span className="ml-2 font-medium">{analysisResult.metrics.comments}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Key Suggestions</h4>
                        <ul className="space-y-1 text-sm">
                          {analysisResult.suggestions.slice(0, 3).map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="issues">
                  <Card>
                    <CardHeader>
                      <CardTitle>Issues Found</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysisResult.issues.map((issue, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="font-medium">{issue.type}</span>
                            </div>
                            <Badge variant={issue.severity === 'High' ? 'destructive' : issue.severity === 'Medium' ? 'default' : 'secondary'}>
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{issue.message}</p>
                          <p className="text-xs text-muted-foreground mb-2">Line {issue.line}</p>
                          <p className="text-xs font-medium">💡 {issue.suggestion}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="patterns">
                  <Card>
                    <CardHeader>
                      <CardTitle>Algorithm Patterns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysisResult.patterns.map((pattern, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <span className="font-medium">{pattern.name}</span>
                            <p className="text-xs text-muted-foreground">Relevance: {pattern.relevance}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {pattern.detected ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <Badge variant={pattern.detected ? 'default' : 'outline'}>
                              {pattern.detected ? 'Detected' : 'Suggested'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysisResult.securityIssues.map((issue, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="font-medium">{issue.type}</span>
                            <Badge variant={issue.severity === 'High' ? 'destructive' : 'default'}>
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-sm">{issue.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="h-[500px] flex items-center justify-center">
                <CardContent className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Paste your code and click "Analyze Code" to get detailed insights</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyzer;
