
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/Navbar";
import { Code, Play, Save, Clock, CheckCircle, AlertCircle, Lightbulb, Eye, Users, Plus, Trash2, Upload, Mic, MicOff, SendHorizonal, RefreshCw, Volume2, Camera, VideoOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LoginGate from "./LoginGate";
import { useNavigate, useLocation } from "react-router-dom";

const InterviewSimulator = () => {
  const [interviewSetup, setInterviewSetup] = useState({
    title: "",
    company: "",
    description: "",
    type: ""
  });
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [question, setQuestion] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState(50);
  const [useSpeechRecognition, setUseSpeechRecognition] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState("alloy");
  const [postureAnalysis, setPostureAnalysis] = useState("");
  const [eyeContactScore, setEyeContactScore] = useState(0);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const videoRef = useRef(null);
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

  const interviewTypes = [
    { value: "technical", label: "Technical Interview" },
    { value: "behavioral", label: "Behavioral Interview" },
    { value: "system-design", label: "System Design" },
    { value: "coding", label: "Coding Interview" },
    { value: "hr", label: "HR Round" }
  ];

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "assertive", label: "Assertive" }
  ];

  const voices = [
    { value: "alloy", label: "Alloy" },
    { value: "echo", label: "Echo" },
    { value: "fable", label: "Fable" },
    { value: "onyx", label: "Onyx" },
    { value: "nova", label: "Nova" },
    { value: "shimmer", label: "Shimmer" }
  ];

  const sampleQuestions = {
    technical: [
      "Explain the difference between var, let, and const in JavaScript.",
      "How does garbage collection work in your preferred programming language?",
      "What are the advantages of using a microservices architecture?"
    ],
    behavioral: [
      "Tell me about a time when you had to work with a difficult team member.",
      "Describe a situation where you had to learn a new technology quickly.",
      "How do you handle tight deadlines and pressure?"
    ],
    "system-design": [
      "How would you design a URL shortening service like bit.ly?",
      "Design a chat application that can handle millions of users.",
      "How would you design a distributed caching system?"
    ],
    coding: [
      "Implement a function to reverse a linked list.",
      "Find the longest palindromic substring in a given string.",
      "Design an algorithm to detect cycles in a directed graph."
    ],
    hr: [
      "Why do you want to work for our company?",
      "Where do you see yourself in 5 years?",
      "What are your greatest strengths and weaknesses?"
    ]
  };

  useEffect(() => {
    if (videoEnabled) {
      startVideoAnalysis();
    } else {
      stopVideoAnalysis();
    }
  }, [videoEnabled]);

  const startVideoAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      // Simulate posture and eye tracking analysis
      const analysisInterval = setInterval(() => {
        const postureScores = ["Good posture", "Slouching detected", "Excellent posture", "Adjust your sitting position"];
        const randomPosture = postureScores[Math.floor(Math.random() * postureScores.length)];
        setPostureAnalysis(randomPosture);
        setEyeContactScore(Math.floor(Math.random() * 100));
      }, 3000);
      
      return () => clearInterval(analysisInterval);
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access for posture and eye tracking analysis.",
        variant: "destructive"
      });
    }
  };

  const stopVideoAnalysis = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startInterview = () => {
    if (!interviewSetup.title || !interviewSetup.company || !interviewSetup.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before starting the interview.",
        variant: "destructive"
      });
      return;
    }

    setIsSessionActive(true);
    generateQuestion();
    toast({
      title: "Interview Started! 🎯",
      description: `${interviewSetup.type} interview for ${interviewSetup.company} has begun.`
    });
  };

  const generateQuestion = () => {
    const questions = sampleQuestions[interviewSetup.type] || sampleQuestions.behavioral;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
    
    if (isSpeaking) {
      speakText(randomQuestion);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes(voice)) || speechSynthesis.getVoices()[0];
      speechSynthesis.speak(utterance);
    }
  };

  const submitResponse = async () => {
  if (!userResponse.trim()) {
    toast({
      title: "Empty Response",
      description: "Please speak or type your answer before submitting.",
      variant: "destructive"
    });
    return;
  }

  setAiFeedback("Analyzing response...");

  const url = 'https://chatgpt-42.p.rapidapi.com/gpt4';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '65b88dcaffmshb89be45b7c240d0p1cab1fjsnaf98335909e6',
      'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: userResponse
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    setAiFeedback(result);
    toast({
      title: "Response Analyzed! 🤖",
      description: "AI has provided feedback on your answer."
    });
  } catch (error) {
    console.error("API Error:", error);
    toast({
      title: "Error Generating Feedback",
      description: "Something went wrong while contacting the AI API.",
      variant: "destructive"
    });
    setAiFeedback("Failed to analyze response.");
  }
};


  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserResponse(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition."
      });
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const resetInterview = () => {
    setIsSessionActive(false);
    setQuestion("");
    setUserResponse("");
    setAiFeedback("");
    setPostureAnalysis("");
    setEyeContactScore(0);
    setInterviewSetup({ title: "", company: "", description: "", type: "" });
    toast({
      title: "Interview Reset! 🔄",
      description: "Ready for a new interview session."
    });
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
  
  if (loading) return null;
  
  if (!isLoggedIn) {
    return (
      <LoginGate 
      title="Interview Simulator" 
      description="Compete with coders worldwide in our weekly programming contests"
      />
    );
  }

  if (!isSessionActive) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Interview Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Interview Title *</Label>
                  <Input
                    id="title"
                    value={interviewSetup.title}
                    onChange={(e) => setInterviewSetup({...interviewSetup, title: e.target.value})}
                    placeholder="e.g., Senior Frontend Developer Position"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={interviewSetup.company}
                    onChange={(e) => setInterviewSetup({...interviewSetup, company: e.target.value})}
                    placeholder="e.g., Google, Microsoft, Amazon"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={interviewSetup.description}
                    onChange={(e) => setInterviewSetup({...interviewSetup, description: e.target.value})}
                    placeholder="Brief description of the role or interview focus..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="type">Interview Type *</Label>
                  <Select value={interviewSetup.type} onValueChange={(value) => setInterviewSetup({...interviewSetup, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Settings</h3>
                  
                  <div>
                    <Label htmlFor="tone">Interviewer Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="voice">AI Voice</Label>
                    <Select value={voice} onValueChange={setVoice}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem key={voice.value} value={voice.value}>{voice.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="speech">Enable Text-to-Speech</Label>
                    <Switch id="speech" checked={isSpeaking} onCheckedChange={setIsSpeaking} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="speechRecognition">Enable Speech Recognition</Label>
                    <Switch id="speechRecognition" checked={useSpeechRecognition} onCheckedChange={setUseSpeechRecognition} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="video">Enable Video Analysis</Label>
                    <Switch id="video" checked={videoEnabled} onCheckedChange={setVideoEnabled} />
                  </div>
                </div>

                <Button onClick={startInterview} className="w-full" size="lg">
                  Start Interview Session
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Video Analysis Sidebar - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            {videoEnabled && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Video Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full rounded border"
                      style={{ height: '120px' }}
                    />
                    
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm">Posture Analysis</Label>
                        <p className="text-sm text-muted-foreground">{postureAnalysis || "Analyzing..."}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Eye Contact Score</Label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${eyeContactScore}%` }}
                            />
                          </div>
                          <span className="text-sm">{eyeContactScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Interview Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <p className="text-sm text-muted-foreground">{interviewSetup.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Company</Label>
                  <p className="text-sm text-muted-foreground">{interviewSetup.company}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <Badge variant="outline">{interviewSetup.type}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversation Area - 6 columns */}
          <div className="lg:col-span-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>AI Interviewer</span>
                  <div className="flex gap-2">
                    {isSpeaking && (
                      <Button variant="outline" size="sm" onClick={() => speakText(question)}>
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={generateQuestion}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Next Question
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{question || "Loading first question..."}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Response</CardTitle>
                  {useSpeechRecognition ? (
                    isListening ? (
                      <Button variant="destructive" size="sm" onClick={stopListening}>
                        <MicOff className="h-4 w-4 mr-1" />
                        Stop Listening
                      </Button>
                    ) : (
                      <Button variant="secondary" size="sm" onClick={startListening}>
                        <Mic className="h-4 w-4 mr-1" />
                        Start Listening
                      </Button>
                    )
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  className="min-h-[150px] font-mono text-sm"
                  placeholder="Type your response here or use speech recognition..."
                  disabled={useSpeechRecognition && isListening}
                />
                <div className="flex justify-end mt-2">
                  <Button onClick={submitResponse}>
                    <SendHorizonal className="h-4 w-4 mr-1" />
                    Submit Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback & Controls - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{aiFeedback || "No feedback yet. Submit a response to get feedback."}</p>
              </CardContent>
            </Card>

            <Button variant="destructive" onClick={resetInterview} className="w-full">
              End Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSimulator;
