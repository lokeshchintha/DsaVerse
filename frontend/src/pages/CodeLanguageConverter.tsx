
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Copy, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const CodeLanguageConverter = () => {
  const [sourceCode, setSourceCode] = useState(`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`);
  
  const [sourceLang, setSourceLang] = useState("python");
  const [targetLang, setTargetLang] = useState("java");
  const [convertedCode, setConvertedCode] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [explanation, setExplanation] = useState("");
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
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "kotlin", label: "Kotlin" },
    { value: "swift", label: "Swift" },
    { value: "csharp", label: "C#" }
  ];

  const convertCode = async () => {
    setIsConverting(true);
    setConvertedCode("");
    setExplanation("");

    const prompt = `Convert the following ${sourceLang} code to ${targetLang}. Also give a short explanation in 4-5 points:\n\n${sourceCode}`;

    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "65b88dcaffmshb89be45b7c240d0p1cab1fjsnaf98335909e6", // 🔐 Replace with your actual RapidAPI key
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

      // Try to split code and explanation if AI responds with both
      const [codePart, explanationPart] = result.result.split(/(?:Explanation|Notes)[:\n]/i);

      setConvertedCode(codePart?.trim() || "");
      setExplanation(explanationPart?.trim() || "Explanation not found.");
      
      toast({
        title: "Code converted successfully!",
        description: `From ${sourceLang} to ${targetLang}`
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "❌ Conversion failed",
        description: "Something went wrong while contacting AI"
      });
    } finally {
      setIsConverting(false);
    }
  };


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Code has been copied to your clipboard."
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Code Language Converter</h1>
          <p className="text-muted-foreground">Convert code between programming languages with AI-powered translation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Code */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Source Code</CardTitle>
                <Select value={sourceLang} onValueChange={setSourceLang}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Paste your code here..."
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Converted Code */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Converted Code</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {convertedCode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(convertedCode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={convertedCode}
                readOnly
                placeholder="Converted code will appear here..."
                className="min-h-[300px] font-mono text-sm bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>

        {/* Convert Button */}
        <div className="flex justify-center my-6">
          <Button
            onClick={convertCode}
            disabled={isConverting || !sourceCode.trim()}
            size="lg"
            className="flex items-center gap-2"
          >
            {isConverting ? (
              <Zap className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
            {isConverting ? "Converting..." : "Convert Code"}
          </Button>
        </div>

        {/* Explanation */}
        {explanation && (
          <Card>
            <CardHeader>
              <CardTitle>Conversion Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm">{explanation}</pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Smart</Badge>
                <h3 className="font-semibold">AI-Powered</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Uses advanced AI to understand context and convert code accurately
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">10+</Badge>
                <h3 className="font-semibold">Languages</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Support for major programming languages with more being added
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Learn</Badge>
                <h3 className="font-semibold">Educational</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Detailed explanations help you understand language differences
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeLanguageConverter;
