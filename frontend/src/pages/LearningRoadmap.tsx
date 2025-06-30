
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Map, Target, BookOpen, CheckCircle, Clock, Star, TrendingUp, Award, Code, Brain, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const LearningRoadmap = () => {
  const [selectedTrack, setSelectedTrack] = useState("frontend");
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [completedModules, setCompletedModules] = useState(new Set());
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

  const tracks = [
    {
      id: "frontend",
      name: "Frontend Development",
      description: "Master modern web development with React, TypeScript, and more",
      icon: Code,
      color: "bg-blue-500",
      totalModules: 24,
      estimatedTime: "3-6 months"
    },
    {
      id: "backend",
      name: "Backend Development",
      description: "Build scalable server-side applications and APIs",
      icon: Brain,
      color: "bg-green-500",
      totalModules: 22,
      estimatedTime: "4-7 months"
    },
    {
      id: "fullstack",
      name: "Full Stack Development",
      description: "Complete end-to-end web development mastery",
      icon: Target,
      color: "bg-purple-500",
      totalModules: 36,
      estimatedTime: "6-12 months"
    },
    {
      id: "mobile",
      name: "Mobile Development",
      description: "Create native and cross-platform mobile applications",
      icon: User,
      color: "bg-orange-500",
      totalModules: 20,
      estimatedTime: "4-8 months"
    }
  ];

  const roadmapData = {
    frontend: {
      beginner: [
        {
          id: "html-css",
          title: "HTML & CSS Fundamentals",
          description: "Learn the building blocks of web development",
          duration: "2 weeks",
          difficulty: "Easy",
          topics: ["HTML5 Semantics", "CSS Grid & Flexbox", "Responsive Design", "CSS Variables"],
          completed: true
        },
        {
          id: "javascript-basics",
          title: "JavaScript Fundamentals",
          description: "Master core JavaScript concepts and ES6+ features",
          duration: "3 weeks",
          difficulty: "Medium",
          topics: ["Variables & Data Types", "Functions & Scope", "DOM Manipulation", "Async/Await"],
          completed: true
        },
        {
          id: "git-basics",
          title: "Version Control with Git",
          description: "Learn Git for code management and collaboration",
          duration: "1 week",
          difficulty: "Easy",
          topics: ["Git Commands", "Branching", "Merging", "GitHub Workflow"],
          completed: false
        },
        {
          id: "react-intro",
          title: "Introduction to React",
          description: "Build your first React applications",
          duration: "4 weeks",
          difficulty: "Medium",
          topics: ["Components & JSX", "Props & State", "Event Handling", "Conditional Rendering"],
          completed: false
        }
      ],
      intermediate: [
        {
          id: "react-hooks",
          title: "React Hooks & Context",
          description: "Advanced React patterns and state management",
          duration: "3 weeks",
          difficulty: "Medium",
          topics: ["useState & useEffect", "Custom Hooks", "Context API", "useReducer"],
          completed: false
        },
        {
          id: "typescript",
          title: "TypeScript for React",
          description: "Add type safety to your React applications",
          duration: "2 weeks",
          difficulty: "Medium",
          topics: ["Type Annotations", "Interfaces", "Generics", "React + TypeScript"],
          completed: false
        },
        {
          id: "testing",
          title: "Testing React Applications",
          description: "Write reliable tests for your components",
          duration: "2 weeks",
          difficulty: "Medium",
          topics: ["Jest", "React Testing Library", "Unit Tests", "Integration Tests"],
          completed: false
        }
      ],
      advanced: [
        {
          id: "performance",
          title: "React Performance Optimization",
          description: "Optimize your React apps for better performance",
          duration: "2 weeks",
          difficulty: "Hard",
          topics: ["React.memo", "useMemo & useCallback", "Code Splitting", "Bundle Analysis"],
          completed: false
        },
        {
          id: "nextjs",
          title: "Next.js Framework",
          description: "Build production-ready React applications",
          duration: "3 weeks",
          difficulty: "Hard",
          topics: ["SSR & SSG", "API Routes", "Authentication", "Deployment"],
          completed: false
        }
      ]
    },
    backend: {
      beginner: [
        {
          id: "nodejs-basics",
          title: "Node.js Fundamentals",
          description: "Server-side JavaScript development",
          duration: "2 weeks",
          difficulty: "Medium",
          topics: ["Node.js Runtime", "NPM", "File System", "HTTP Module"],
          completed: false
        },
        {
          id: "express-intro",
          title: "Express.js Framework",
          description: "Build web servers and APIs",
          duration: "3 weeks",
          difficulty: "Medium",
          topics: ["Routing", "Middleware", "Error Handling", "Request/Response"],
          completed: false
        }
      ],
      intermediate: [
        {
          id: "databases",
          title: "Database Integration",
          description: "Work with SQL and NoSQL databases",
          duration: "4 weeks",
          difficulty: "Medium",
          topics: ["MongoDB", "PostgreSQL", "ORMs", "Database Design"],
          completed: false
        },
        {
          id: "auth",
          title: "Authentication & Authorization",
          description: "Secure your applications",
          duration: "2 weeks",
          difficulty: "Medium",
          topics: ["JWT", "OAuth", "Sessions", "Security Best Practices"],
          completed: false
        }
      ],
      advanced: [
        {
          id: "microservices",
          title: "Microservices Architecture",
          description: "Build scalable distributed systems",
          duration: "4 weeks",
          difficulty: "Hard",
          topics: ["Service Communication", "API Gateway", "Load Balancing", "Monitoring"],
          completed: false
        }
      ]
    }
  };

  const toggleModuleCompletion = (moduleId) => {
    const newCompleted = new Set(completedModules);
    if (newCompleted.has(moduleId)) {
      newCompleted.delete(moduleId);
    } else {
      newCompleted.add(moduleId);
      toast({
        title: "Module Completed! 🎉",
        description: "Great progress on your learning journey!"
      });
    }
    setCompletedModules(newCompleted);
  };

  const getModulesForTrackAndLevel = () => {
    return roadmapData[selectedTrack]?.[selectedLevel] || [];
  };

  const calculateProgress = () => {
    const modules = getModulesForTrackAndLevel();
    if (modules.length === 0) return 0;
    const completed = modules.filter(module => 
      completedModules.has(module.id) || module.completed
    ).length;
    return Math.round((completed / modules.length) * 100);
  };

  const getRecommendations = () => {
    const modules = getModulesForTrackAndLevel();
    const nextModule = modules.find(module => 
      !completedModules.has(module.id) && !module.completed
    );
    
    if (!nextModule) return null;
    
    return {
      title: `Continue with: ${nextModule.title}`,
      description: nextModule.description,
      duration: nextModule.duration,
      topics: nextModule.topics.slice(0, 2)
    };
  };

  const selectedTrackData = tracks.find(track => track.id === selectedTrack);
  const currentModules = getModulesForTrackAndLevel();
  const progressPercentage = calculateProgress();
  const recommendation = getRecommendations();

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
          <h1 className="text-3xl font-bold mb-2">Learning Roadmap</h1>
          <p className="text-muted-foreground">Structured learning paths to master your chosen technology stack</p>
        </div>

        <div className="grid gap-8">
          {/* Track Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Choose Your Learning Track
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tracks.map((track) => {
                  const IconComponent = track.icon;
                  return (
                    <div
                      key={track.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTrack === track.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedTrack(track.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${track.color} bg-opacity-10`}>
                          <IconComponent className={`h-5 w-5 ${track.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{track.name}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{track.totalModules} modules</span>
                        <span>{track.estimatedTime}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{progressPercentage}%</div>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                  <Progress value={progressPercentage} />
                  <div className="text-sm text-muted-foreground text-center">
                    {selectedTrackData?.name} - {selectedLevel}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Modules Completed</span>
                    <Badge variant="secondary">{completedModules.size}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Streak</span>
                    <Badge variant="outline">7 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Skill Level</span>
                    <Badge>{selectedLevel}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendation ? (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{recommendation.title}</h4>
                    <p className="text-xs text-muted-foreground">{recommendation.description}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{recommendation.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {recommendation.topics.map((topic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">All modules completed! 🎉</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Learning Path */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Path: {selectedTrackData?.name}
                </CardTitle>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentModules.map((module, index) => {
                  const isCompleted = completedModules.has(module.id) || module.completed;
                  const isNext = !isCompleted && index === currentModules.findIndex(m => 
                    !completedModules.has(m.id) && !m.completed
                  );
                  
                  return (
                    <div
                      key={module.id}
                      className={`p-4 border rounded-lg transition-all ${
                        isCompleted ? 'bg-green-50 border-green-200' :
                        isNext ? 'bg-blue-50 border-blue-200' :
                        'bg-background border-border'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                              isNext ? 'border-blue-500 bg-blue-500 text-white' : 'border-muted-foreground'
                            }`}>
                              {index + 1}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{module.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={module.difficulty === 'Easy' ? 'secondary' : module.difficulty === 'Medium' ? 'default' : 'destructive'}>
                                {module.difficulty}
                              </Badge>
                              <Badge variant="outline">{module.duration}</Badge>
                              {isNext && <Star className="h-4 w-4 text-blue-500" />}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {module.topics.map((topic, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{topic}</Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant={isCompleted ? "secondary" : "default"}
                              size="sm"
                              onClick={() => toggleModuleCompletion(module.id)}
                            >
                              {isCompleted ? "Completed" : "Mark Complete"}
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {isNext && (
                              <Button size="sm">
                                Start Learning
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {currentModules.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No modules available for this level yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">Try selecting a different level or track.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personalized Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Practice More DSA</h4>
                  <p className="text-sm text-muted-foreground mb-3">Based on your current progress, focus on Tree and Graph problems</p>
                  <Button size="sm" variant="outline">View Problems</Button>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Take Mock Interview</h4>
                  <p className="text-sm text-muted-foreground mb-3">Practice behavioral questions for your target role</p>
                  <Button size="sm" variant="outline">Start Interview</Button>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Build a Project</h4>
                  <p className="text-sm text-muted-foreground mb-3">Apply your skills with a portfolio project</p>
                  <Button size="sm" variant="outline">Get Ideas</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;
