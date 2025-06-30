
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/Navbar";
import { Brain, Clock, Target, CheckCircle, AlertCircle, Plus, Search, Timer } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const AptitudeGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [customTopic, setCustomTopic] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [timeLimit, setTimeLimit] = useState(15);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizResults, setQuizResults] = useState(null);
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
    { value: "quantitative", label: "Quantitative Aptitude" },
    { value: "logical", label: "Logical Reasoning" },
    { value: "verbal", label: "Verbal Ability" },
    { value: "technical", label: "Technical Knowledge" },
    { value: "general", label: "General Knowledge" }
  ];

  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ];

  const topics = [
    { 
      id: 1, 
      title: "Number Series", 
      category: "quantitative", 
      difficulty: "medium",
      questions: 15,
      timeLimit: 20,
      completed: true,
      score: 12,
      accuracy: 80
    },
    { 
      id: 2, 
      title: "Logical Sequences", 
      category: "logical", 
      difficulty: "easy",
      questions: 10,
      timeLimit: 15,
      completed: false,
      score: 0,
      accuracy: 0
    },
    { 
      id: 3, 
      title: "Reading Comprehension", 
      category: "verbal", 
      difficulty: "hard",
      questions: 12,
      timeLimit: 25,
      completed: true,
      score: 8,
      accuracy: 67
    },
    { 
      id: 4, 
      title: "Data Structures", 
      category: "technical", 
      difficulty: "medium",
      questions: 20,
      timeLimit: 30,
      completed: false,
      score: 0,
      accuracy: 0
    },
    { 
      id: 5, 
      title: "Profit and Loss", 
      category: "quantitative", 
      difficulty: "easy",
      questions: 8,
      timeLimit: 12,
      completed: true,
      score: 7,
      accuracy: 88
    }
  ];

  const [allTopics, setAllTopics] = useState(topics);

  // Sample questions for the quiz
  const sampleQuestions = [
    {
      question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: "42",
      explanation: "The differences are 4, 6, 8, 10, so the next difference is 12. 30 + 12 = 42"
    },
    {
      question: "If A = 1, B = 2, C = 3, what is the value of HELLO?",
      options: ["52", "54", "56", "58"],
      correct: "52",
      explanation: "H(8) + E(5) + L(12) + L(12) + O(15) = 52"
    }
  ];

  const addCustomTopic = () => {
    if (customTopic.trim()) {
      const newTopic = {
        id: allTopics.length + 1,
        title: customTopic,
        category: "custom",
        difficulty: "medium",
        questions: 10,
        timeLimit: timeLimit,
        completed: false,
        score: 0,
        accuracy: 0
      };
      setAllTopics([...allTopics, newTopic]);
      setCustomTopic("");
      toast({
        title: "Custom Topic Added! ✨",
        description: `${customTopic} has been added to your topics.`
      });
    }
  };

  const toggleTopicSelection = (topicId) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const startMultiTopicQuiz = () => {
    if (selectedTopics.length === 0) {
      toast({
        title: "No Topics Selected",
        description: "Please select at least one topic to start the quiz."
      });
      return;
    }

    const selectedTopicDetails = allTopics.filter(topic => selectedTopics.includes(topic.id));
    const totalQuestions = selectedTopicDetails.reduce((sum, topic) => sum + topic.questions, 0);
    
    const customQuiz = {
      id: 'multi-topic',
      title: `Multi-Topic Quiz (${selectedTopics.length} topics)`,
      questions: Math.min(totalQuestions, 50), // Cap at 50 questions
      timeLimit: timeLimit,
      topics: selectedTopicDetails.map(t => t.title)
    };

    startQuiz(customQuiz);
  };

  const startCategoryQuiz = (category) => {
    const categoryTopics = allTopics.filter(topic => topic.category === category);
    const totalQuestions = categoryTopics.reduce((sum, topic) => sum + topic.questions, 0);
    
    const categoryQuiz = {
      id: `category-${category}`,
      title: `${categories.find(c => c.value === category)?.label} Quiz`,
      questions: Math.min(totalQuestions, 30),
      timeLimit: timeLimit,
      category: category
    };

    startQuiz(categoryQuiz);
  };

  const filteredTopics = allTopics.filter(topic => {
    const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || topic.difficulty === selectedDifficulty;
    const matchesSearch = !searchTopic || topic.title.toLowerCase().includes(searchTopic.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const startQuiz = (topic) => {
    setCurrentQuiz(topic);
    setTimeRemaining(topic.timeLimit * 60); // Convert to seconds
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setQuizResults(null);
    
    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "Quiz Started! 🚀",
      description: `${topic.title} quiz has begun. Good luck!`
    });
  };

  const endQuiz = () => {
    // Simulate quiz results
    const results = {
      score: Math.floor(Math.random() * currentQuiz.questions) + 1,
      totalQuestions: currentQuiz.questions,
      timeTaken: currentQuiz.timeLimit - Math.floor(timeRemaining / 60),
      accuracy: Math.floor(Math.random() * 40) + 60
    };
    setQuizResults(results);
    
    // Update topic with results if it's a single topic quiz
    if (currentQuiz.id !== 'multi-topic' && !currentQuiz.id.startsWith('category-')) {
      const updatedTopics = allTopics.map(topic => 
        topic.id === currentQuiz.id 
          ? { ...topic, completed: true, score: results.score, accuracy: results.accuracy }
          : topic
      );
      setAllTopics(updatedTopics);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
  
  if (loading) return null;
  
  if (!isLoggedIn) {
    return (
      <LoginGate 
      title="Aptitude Grid" 
      description="Compete with coders worldwide in our weekly programming contests"
      />
    );
  }

  if (currentQuiz && !quizResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-6">
          {/* Quiz Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {currentQuiz.questions}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-mono bg-muted px-3 py-1 rounded">
                <Clock className="h-4 w-4 inline mr-1" />
                {formatTime(timeRemaining)}
              </div>
              <Button variant="destructive" onClick={endQuiz}>
                End Quiz
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <Progress value={(currentQuestion / currentQuiz.questions) * 100} className="h-2" />
          </div>

          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{sampleQuestions[currentQuestion]?.question}</p>
              
              <div className="space-y-2">
                {sampleQuestions[currentQuestion]?.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded cursor-pointer hover:bg-muted/50 ${
                      selectedAnswer === option ? 'bg-blue-50 border-blue-300 dark:bg-blue-950' : ''
                    }`}
                    onClick={() => setSelectedAnswer(option)}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => {
                    if (currentQuestion < currentQuiz.questions - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                      setSelectedAnswer("");
                    } else {
                      endQuiz();
                    }
                  }}
                  disabled={!selectedAnswer}
                >
                  {currentQuestion === currentQuiz.questions - 1 ? "Submit Quiz" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (quizResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">{quizResults.score}/{quizResults.totalQuestions}</h2>
                  <p className="text-muted-foreground">Questions Answered Correctly</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded">
                    <div className="text-2xl font-bold">{quizResults.accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="p-4 bg-muted rounded">
                    <div className="text-2xl font-bold">{quizResults.timeTaken}m</div>
                    <div className="text-sm text-muted-foreground">Time Taken</div>
                  </div>
                </div>

                <Button onClick={() => setCurrentQuiz(null)} className="w-full">
                  Back to Topics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Aptitude Grid</h1>
          <p className="text-muted-foreground">Test your aptitude skills across various topics</p>
        </div>

        {/* Filters and Custom Topic */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div>
            <Label>Category</Label>
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
            <Label>Difficulty</Label>
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
            <Label>Search Topics</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                placeholder="Search topics..."
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label>Custom Topic</Label>
            <Input
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Enter topic name..."
            />
          </div>

          <div>
            <Label>Time Limit (minutes)</Label>
            <Input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              min="5"
              max="120"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={addCustomTopic} className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Add Topic
            </Button>
          </div>
        </div>

        {/* Multi-Topic Quiz Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Multi-Topic Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Selected Topics: {selectedTopics.length}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedTopics([])}>
                  Clear All
                </Button>
                <Button onClick={startMultiTopicQuiz} disabled={selectedTopics.length === 0}>
                  <Timer className="h-4 w-4 mr-1" />
                  Start Multi-Topic Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Quiz Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Quick Category Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.slice(1).map((category) => (
                <Button
                  key={category.value}
                  variant="outline"
                  onClick={() => startCategoryQuiz(category.value)}
                  className="h-12"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedTopics.includes(topic.id)}
                      onCheckedChange={() => toggleTopicSelection(topic.id)}
                    />
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </div>
                  {topic.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{topic.category}</Badge>
                  <Badge variant={topic.difficulty === 'easy' ? 'secondary' : topic.difficulty === 'medium' ? 'default' : 'destructive'}>
                    {topic.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{topic.questions} questions</span>
                  <span>{topic.timeLimit} minutes</span>
                </div>

                {topic.completed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score: {topic.score}/{topic.questions}</span>
                      <span>Accuracy: {topic.accuracy}%</span>
                    </div>
                    <Progress value={topic.accuracy} className="h-2" />
                  </div>
                )}

                <Button 
                  onClick={() => startQuiz(topic)} 
                  className="w-full"
                  variant={topic.completed ? "outline" : "default"}
                >
                  {topic.completed ? "Retake Quiz" : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No topics found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or add a custom topic.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AptitudeGrid;
