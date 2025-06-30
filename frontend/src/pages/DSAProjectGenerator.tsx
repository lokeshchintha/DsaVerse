
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Code2, Download, Github, FolderOpen, FileText, Zap, Layers } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const DSAProjectGenerator = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projectType, setProjectType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [generatedProject, setGeneratedProject] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const dsaTags = [
    "Arrays", "Strings", "Trees", "Graphs", "Dynamic Programming",
    "Sorting", "Searching", "Hash Tables", "Linked Lists", "Stacks",
    "Queues", "Heaps", "Tries", "Backtracking", "Greedy", "Recursion"
  ];

  const techStacks = [
    "React + Node.js", "Vue + Express", "Angular + NestJS",
    "Python + Flask", "Python + Django", "Java + Spring Boot",
    "C# + .NET", "Go + Gin", "Rust + Actix"
  ];

  const projectTypes = [
    { value: "web-app", label: "Web Application" },
    { value: "api", label: "REST API" },
    { value: "cli", label: "CLI Tool" },
    { value: "mobile", label: "Mobile App" },
    { value: "desktop", label: "Desktop Application" }
  ];

  const generateProject = async () => {
    if (selectedTags.length === 0 || !projectType || !difficulty) {
      toast({
        title: "Missing Information",
        description: "Please select DSA tags, project type, and difficulty",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `
        Generate a detailed DSA project blueprint in JSON format with these fields:
        - name (string)
        - description (string)
        - features (array of strings)
        - structure (nested object describing files and folders with descriptions)
        - techStack (array of strings)
        - estimatedTime (string)
        - learningOutcomes (array of strings)

        The project should be based on:
        Tags: ${selectedTags.join(", ")}
        Project Type: ${projectType}
        Difficulty: ${difficulty}
        Preferred Tech Stack: ${techStack.length > 0 ? techStack.join(", ") : "React + Node.js"}

        Provide the response as JSON only.
      `;

      const response = await fetch("https://chatgpt-42.p.rapidapi.com/gpt4", {
        method: "POST",
        headers: {
          "x-rapidapi-key": "65b88dcaffmshb89be45b7c240d0p1cab1fjsnaf98335909e6",
          "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt.trim(),
            },
          ],
          web_access: false,
        }),
      });

      const textResult = await response.text();

      // Attempt to parse JSON from the response text
      let parsedResult;
      try {
        parsedResult = JSON.parse(textResult);
      } catch {
        const jsonMatch = textResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Could not parse project blueprint JSON from response");
        }
      }

      setGeneratedProject(parsedResult);

      toast({
        title: "Project Generated! 🎉",
        description: "Your DSA project blueprint is ready",
      });
    } catch (error: any) {
      console.error("Project generation error:", error);
      toast({
        title: "Generation Failed ❌",
        description: error.message || "An error occurred while generating the project",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadProject = () => {
    if (!generatedProject) return;

    // Simulate project download
    const projectData = JSON.stringify(generatedProject, null, 2);
    const blob = new Blob([projectData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedProject.name}-blueprint.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded! 📥",
      description: "Project blueprint saved to your device"
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleTechStack = (stack: string) => {
    setTechStack(prev => 
      prev.includes(stack) 
        ? prev.filter(t => t !== stack)
        : [...prev, stack]
    );
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
          <h1 className="text-3xl font-bold mb-2">DSA Project Generator</h1>
          <p className="text-muted-foreground">
            Generate full-stack project ideas based on your mastered DSA concepts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Select DSA Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {dsaTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Type</label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy (Beginner)</SelectItem>
                      <SelectItem value="medium">Medium (Intermediate)</SelectItem>
                      <SelectItem value="hard">Hard (Advanced)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tech Stack (Optional)</label>
                  <div className="space-y-2">
                    {techStacks.map((stack) => (
                      <div key={stack} className="flex items-center space-x-2">
                        <Checkbox
                          checked={techStack.includes(stack)}
                          onCheckedChange={() => toggleTechStack(stack)}
                        />
                        <label className="text-sm">{stack}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={generateProject} 
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Project
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Project Display */}
          <div className="lg:col-span-2">
            {generatedProject ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Code2 className="h-5 w-5" />
                        {generatedProject.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={downloadProject}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline">
                          <Github className="h-4 w-4 mr-2" />
                          Create Repo
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{generatedProject.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium">Estimated Time:</span>
                        <p className="text-sm text-muted-foreground">{generatedProject.estimatedTime}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Tech Stack:</span>
                        <p className="text-sm text-muted-foreground">{generatedProject.techStack.join(", ")}</p>
                      </div>
                    </div>

                    <Tabs defaultValue="features" className="mt-6">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="structure">Structure</TabsTrigger>
                        <TabsTrigger value="learning">Learning</TabsTrigger>
                        <TabsTrigger value="readme">README</TabsTrigger>
                      </TabsList>

                      <TabsContent value="features" className="space-y-3">
                        {generatedProject.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="structure">
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                          <FileStructure structure={generatedProject.structure} />
                        </div>
                      </TabsContent>

                      <TabsContent value="learning" className="space-y-3">
                        {generatedProject.learningOutcomes.map((outcome: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{outcome}</span>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="readme">
                        <div className="bg-muted p-4 rounded-lg">
                          <pre className="text-sm whitespace-pre-wrap">
{`# ${generatedProject.name}

${generatedProject.description}

## Features
${generatedProject.features.map((f: string) => `- ${f}`).join('\n')}

## Tech Stack
${generatedProject.techStack.join(', ')}

## Learning Outcomes
${generatedProject.learningOutcomes.map((o: string) => `- ${o}`).join('\n')}

## Setup Instructions
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Start the development server: \`npm start\`

## Project Structure
See the structure tab for detailed file organization.
`}
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Project Generated</h3>
                  <p className="text-muted-foreground text-center">
                    Configure your preferences and click "Generate Project" to create a custom DSA project
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FileStructure = ({ structure, indent = 0 }: { structure: any, indent?: number }) => {
  return (
    <div>
      {Object.entries(structure).map(([key, value]) => (
        <div key={key} style={{ marginLeft: `${indent * 16}px` }}>
          {typeof value === 'string' ? (
            <div className="flex items-center gap-2 py-1">
              <FileText className="h-3 w-3" />
              <span>{key}</span>
              <span className="text-xs text-muted-foreground ml-2">// {value}</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 py-1 font-medium">
                <FolderOpen className="h-3 w-3" />
                <span>{key}</span>
              </div>
              <FileStructure structure={value} indent={indent + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DSAProjectGenerator;
