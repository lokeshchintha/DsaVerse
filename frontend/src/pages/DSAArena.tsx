
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Code, Play, Save, Clock, CheckCircle, AlertCircle, Lightbulb, Eye, Users, Plus, Trash2, Upload, CalendarDays, Trophy, Timer, Shuffle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";
import {programs} from "@/data/programs.js"

const DSAArena = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [randomDifficulty, setRandomDifficulty] = useState("all");
  const [randomTopic, setRandomTopic] = useState("all");
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
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "arrays", label: "Arrays & Strings" },
    { value: "trees", label: "Trees & Graphs" },
    { value: "dp", label: "Dynamic Programming" },
    { value: "linkedlist", label: "Linked Lists" },
    { value: "system", label: "System Design" },
    { value: "greedy", label: "Greedy Algorithms" }
  ];

  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "Basic", label: "Basic" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate"},
    { value: "Expert", label: "Expert" }
  ];

  const statuses = [
    { value: "all", label: "All Problems" },
    { value: "solved", label: "Solved" },
    { value: "unsolved", label: "Unsolved" },
    { value: "attempted", label: "Attempted" }
  ];

  const problems = programs
  
  const getTodaySeededIndex = (length) => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate(); // e.g., 20250627
    return seed % length;
  };

  const problemOfTheDay = problems[getTodaySeededIndex(problems.length)];

  // Calendar data (simplified)
  const calendarData = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    solved: Math.random() > 0.7,
    attempted: Math.random() > 0.5,
    unattempted: Math.random() > 0.3
  }));

  const filteredProblems = problems.filter(problem => {
    if (selectedCategory !== "all" && problem.category !== selectedCategory) return false;
    if (selectedDifficulty !== "all" && problem.difficulty !== selectedDifficulty) return false;
    if (selectedStatus === "solved" && !problem.solved) return false;
    if (selectedStatus === "unsolved" && problem.solved) return false;
    if (selectedStatus === "attempted" && !problem.attempted) return false;
    return true;
  });

  const getRandomProblem = () => {
    let availableProblems = problems;
    
    // Filter by difficulty if selected
    if (randomDifficulty !== "all") {
      availableProblems = availableProblems.filter(p => p.difficulty === randomDifficulty);
    }
    
    // Filter by topic if selected
    if (randomTopic !== "all") {
      availableProblems = availableProblems.filter(p => p.category === randomTopic);
    }
    
    if (availableProblems.length === 0) {
      toast({
        title: "No Problems Found",
        description: "No problems match your selected criteria. Try different filters.",
        variant: "destructive"
      });
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableProblems.length);
    const randomProblem = availableProblems[randomIndex];
    
    toast({
      title: "Random Problem Selected! 🎲",
      description: `Opening: ${randomProblem.Challenge} (${randomProblem.difficulty})`
    });
    
    // Navigate to the random problem
    window.location.href = `/dsa-arena/problem/${randomProblem.id}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (problem: any) => {
    if (problem.solved) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (problem.attempted) {
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
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
        {/* Problem of the Day */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <CardTitle>Problem of the Day</CardTitle>
              </div>
              <Badge variant="outline">Featured</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">{problemOfTheDay.Challenge}</h3>
                <p className="text-sm text-muted-foreground mb-2">{problemOfTheDay.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant={problemOfTheDay.difficulty === 'easy' ? 'secondary' : problemOfTheDay.difficulty === 'medium' ? 'default' : 'destructive'}>
                    {problemOfTheDay.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Accuracy: {problemOfTheDay.accuracy}%</span>
                </div>
              </div>
              <Link to={`/dsa-arena/problem/${problemOfTheDay.id}`}>
                <Button>Solve Challenge</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff.value} value={diff.value}>{diff.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Random Problem Generator */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shuffle className="h-5 w-5" />
                  Random Problem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty (Optional)</label>
                  <Select value={randomDifficulty} onValueChange={setRandomDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff.value} value={diff.value}>{diff.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Topic (Optional)</label>
                  <Select value={randomTopic} onValueChange={setRandomTopic}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={getRandomProblem} className="w-full" variant="outline">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Get Random Problem
                </Button>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Submission Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {calendarData.map((day) => (
                    <div
                      key={day.date}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                        day.solved ? 'bg-green-500 text-white' :
                        day.attempted ? 'bg-orange-300' :
                        'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      {day.date}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Solved</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-300 rounded"></div>
                    <span>Attempted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <span>Not Attempted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Problems List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Problems ({filteredProblems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredProblems.map((problem) => (
                    <div key={problem.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getStatusIcon(problem)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{problem.Challenge}</h3>
                              <Badge variant={problem.difficulty === 'easy' ? 'secondary' : problem.difficulty === 'medium' ? 'default' : 'destructive'} className="text-xs">
                                {problem.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{problem.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Accuracy: {problem.accuracy}%</span>
                              <span>Submissions: {problem.submissions.toLocaleString()}</span>
                            </div>
                            <div className="flex gap-1 mt-2">
                              {problem.topicTags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Link to={`/dsa-arena/problem/${problem.id}`}>
                          <Button variant="outline" size="sm">
                            Solve
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DSAArena;