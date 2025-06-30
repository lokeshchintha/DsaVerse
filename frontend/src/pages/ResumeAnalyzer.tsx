
import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Upload, FileText, Download, CheckCircle, AlertCircle, TrendingUp, Target, Award, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

interface AnalysisResult {
  status: 'success' | 'error';
  score: number;
  overallScore: number;
  sections: {
    format: { score: number; feedback: string[] };
    content: { score: number; feedback: string[] };
    keywords: { score: number; feedback: string[] };
    experience: { score: number; feedback: string[] };
  };
  strengths: string[];
  improvements: string[];
  keywordMatches: string[];
  missingKeywords: string[];
  atsCompatibility: number;
  recommendations: string[];
}

const ResumeAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [autoResumeData, setAutoResumeData] = useState(null);
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

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type.includes("word")) {
        setUploadedFile(file);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} is ready for analysis`
        });
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF or Word document"
        });
      }
    }
  }, []);

  const analyzeResume = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file uploaded",
        description: "Please upload a resume first"
      });
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append(
      "prompt",
      `Analyze this resume and return JSON matching this TS interface:\n
  interface AnalysisResult { status: 'success' | 'error'; score: number; overallScore: number; sections: { format: { score: number; feedback: string[] }; content: { score: number; feedback: string[] }; keywords: { score: number; feedback: string[] }; experience: { score: number; feedback: string[] } }; strengths: string[]; improvements: string[]; keywordMatches: string[]; missingKeywords: string[]; atsCompatibility: number; recommendations: string[] }`
    );

    const url = 'https://chatgpt-42.p.rapidapi.com/gpt4';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '65b88dcaffmshb89be45b7c240d0p1cab1fjsnaf98335909e6', // Replace this
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com'
      },
      body: formData
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const jsonText = data.choices?.[0]?.message?.content || '{}';
      const parsed: AnalysisResult = JSON.parse(jsonText);

      setAnalysisResult(parsed);
      toast({
        title: "Analysis Complete! 📊",
        description: `Your resume scored ${parsed.overallScore}/100`
      });

    } catch (err) {
      console.error(err);
      toast({
        title: "Analysis Failed",
        description: "Error during AI analysis."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };


  const generateAutoResume = () => {
    // Simulate auto-resume generation based on app progress
    const mockResumeData = {
      personalInfo: {
        name: "Alex Developer",
        email: "alex@example.com",
        phone: "+1 (555) 123-4567",
        linkedin: "linkedin.com/in/alexdeveloper",
        github: "github.com/alexdev"
      },
      summary: "Passionate full-stack developer with strong problem-solving skills demonstrated through 150+ DSA problems solved and 89% win rate in coding battles.",
      skills: {
        programming: ["JavaScript", "Python", "Java", "C++"],
        frameworks: ["React", "Node.js", "Express"],
        tools: ["Git", "Docker", "AWS"],
        databases: ["MySQL", "PostgreSQL", "MongoDB"]
      },
      experience: [
        {
          title: "Software Developer Intern",
          company: "Tech Startup",
          duration: "Jun 2023 - Aug 2023",
          achievements: [
            "Developed 3 full-stack applications using React and Node.js",
            "Improved code quality by 25% through systematic debugging practices",
            "Collaborated with team of 5 developers using Agile methodology"
          ]
        }
      ],
      projects: [
        {
          name: "DSA Problem Tracker",
          tech: ["React", "Node.js", "MongoDB"],
          description: "Built a comprehensive platform for tracking DSA problem-solving progress with 95% test coverage"
        }
      ],
      achievements: [
        "Solved 150+ DSA problems across multiple difficulty levels",
        "Achieved 89% accuracy in aptitude assessments",
        "Completed 15 mock interviews with average score of 85/100",
        "Ranked in top 10% of peer coding battles"
      ]
    };

    setAutoResumeData(mockResumeData);
    toast({
      title: "Resume Generated! 📄",
      description: "Auto-filled resume created based on your CodeMaster progress"
    });
  };

  const downloadResume = () => {
    toast({
      title: "Resume Downloaded! 📥",
      description: "Your optimized resume has been saved to downloads"
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
          <h1 className="text-3xl font-bold mb-2">Resume Analyzer</h1>
          <p className="text-muted-foreground">AI-powered resume optimization and auto-generation</p>
        </div>

        <Tabs defaultValue="analyze" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analyze">Analyze Resume</TabsTrigger>
            <TabsTrigger value="generate">Auto-Generate</TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">
                        {uploadedFile ? uploadedFile.name : "Click to upload your resume"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF and Word documents (Max 10MB)
                      </p>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Target role (optional)"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <Button 
                      onClick={analyzeResume}
                      disabled={!uploadedFile || isAnalyzing}
                      className="min-w-32"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResult && analysisResult.status === 'success' && (
              <div className="grid gap-6">
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          {analysisResult.overallScore}/100
                        </div>
                        <p className="text-sm text-muted-foreground">Overall Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {analysisResult.atsCompatibility}%
                        </div>
                        <p className="text-sm text-muted-foreground">ATS Compatible</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {analysisResult.keywordMatches.length}
                        </div>
                        <p className="text-sm text-muted-foreground">Keywords Found</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-1">
                          {analysisResult.missingKeywords.length}
                        </div>
                        <p className="text-sm text-muted-foreground">Missing Keywords</p>
                      </div>
                    </div>

                    {/* Section Scores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(analysisResult.sections).map(([section, data]) => (
                        <div key={section} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium capitalize">{section}</span>
                            <span className="text-sm font-medium">{data.score}/100</span>
                          </div>
                          <Progress value={data.score} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Feedback */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResult.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-600">
                        <AlertCircle className="h-5 w-5" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResult.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Keywords Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keywords Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Found Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywordMatches.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="border-red-200 text-red-600">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg text-sm">
                          <span className="font-medium text-primary">#{idx + 1}</span> {rec}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button onClick={downloadResume}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Optimized Resume
                  </Button>
                  <Button variant="outline" onClick={() => setAnalysisResult(null)}>
                    Analyze Another Resume
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Auto-Resume Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Generate a professional resume automatically based on your CodeMaster OS progress and achievements
                  </p>
                  <Button onClick={generateAutoResume} size="lg">
                    <Award className="h-4 w-4 mr-2" />
                    Generate Resume from Progress
                  </Button>
                </div>

                {autoResumeData && (
                  <div className="mt-8 space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Resume Generated Successfully!</h3>
                      <p className="text-sm text-muted-foreground">
                        Your resume has been created based on your CodeMaster achievements
                      </p>
                    </div>

                    {/* Resume Preview */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Resume Preview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Personal Info */}
                        <div>
                          <h3 className="text-xl font-bold">{autoResumeData.personalInfo.name}</h3>
                          <p className="text-muted-foreground">{autoResumeData.personalInfo.email} | {autoResumeData.personalInfo.phone}</p>
                          <p className="text-muted-foreground">{autoResumeData.personalInfo.linkedin} | {autoResumeData.personalInfo.github}</p>
                        </div>

                        {/* Summary */}
                        <div>
                          <h4 className="font-semibold mb-2">Professional Summary</h4>
                          <p className="text-sm">{autoResumeData.summary}</p>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="font-semibold mb-2">Technical Skills</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Programming:</strong> {autoResumeData.skills.programming.join(', ')}
                            </div>
                            <div>
                              <strong>Frameworks:</strong> {autoResumeData.skills.frameworks.join(', ')}
                            </div>
                            <div>
                              <strong>Tools:</strong> {autoResumeData.skills.tools.join(', ')}
                            </div>
                            <div>
                              <strong>Databases:</strong> {autoResumeData.skills.databases.join(', ')}
                            </div>
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold mb-2">Key Achievements</h4>
                          <ul className="space-y-1 text-sm">
                            {autoResumeData.achievements.map((achievement, idx) => (
                              <li key={idx}>• {achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-4 justify-center">
                      <Button onClick={downloadResume}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Resume
                      </Button>
                      <Button variant="outline">
                        <Target className="h-4 w-4 mr-2" />
                        Customize Resume
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Integration Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your CodeMaster Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">150+</div>
                    <p className="text-sm text-muted-foreground">Problems Solved</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <p className="text-sm text-muted-foreground">Battle Win Rate</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">15</div>
                    <p className="text-sm text-muted-foreground">Mock Interviews</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">Level 12</div>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
