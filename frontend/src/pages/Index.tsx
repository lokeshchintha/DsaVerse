import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SimpleNavbar } from "@/components/SimpleNavbar";
import { 
  ArrowRight, 
  Code, 
  Brain, 
  Trophy, 
  Users, 
  Zap, 
  Target,
  BookOpen,
  Gamepad2,
  Star,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const features = [
    {
      icon: Code,
      title: "DSA Arena",
      description: "300+ coding problems with step-by-step solutions",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "AI Mentor",
      description: "GPT-4 powered coding assistant and guidance",
      color: "text-purple-500"
    },
    {
      icon: Trophy,
      title: "Peer Battles",
      description: "Real-time 1v1 coding competitions",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Interview Prep",
      description: "AI-powered mock interviews and feedback",
      color: "text-green-500"
    },
    {
      icon: Gamepad2,
      title: "Coding Games",
      description: "Learn through interactive gaming experiences",
      color: "text-red-500"
    },
    {
      icon: BarChart3,
      title: "DSA Visualization",
      description: "Interactive visualizations for data structures and algorithms",
      color: "text-indigo-500"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Problems Solved", value: "500K+" },
    { label: "Success Rate", value: "94%" },
    { label: "Companies", value: "200+" }
  ];

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
      <SimpleNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              🚀 New: AI-Powered Learning Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Master Coding with
              <br />
              CodeMaster OS
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate platform for mastering Data Structures, Algorithms, and coding skills. 
              Practice, compete, and learn with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dsa-visualization">
                  Try DSA Visualization
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From beginner-friendly tutorials to advanced algorithmic challenges, 
              we've got everything covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`p-3 rounded-lg bg-muted w-fit mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Learning Journey
              </h2>
              <p className="text-xl text-muted-foreground">
                Follow our structured path from basics to advanced concepts
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Foundation",
                  description: "Start with basic data structures and algorithms",
                  features: ["Arrays & Strings", "Basic Sorting", "Time Complexity"]
                },
                {
                  step: "02", 
                  title: "Intermediate",
                  description: "Dive deeper into advanced data structures",
                  features: ["Trees & Graphs", "Dynamic Programming", "Advanced Algorithms"]
                },
                {
                  step: "03",
                  title: "Expert",
                  description: "Master complex problems and system design",
                  features: ["System Design", "Optimization", "Mock Interviews"]
                }
              ].map((phase, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-background rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {phase.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                    <p className="text-muted-foreground mb-4">{phase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are already improving their skills with CodeMaster OS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600" asChild>
                <Link to="/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeMaster OS
                </span>
              </div>
              <p className="text-muted-foreground">
                The ultimate platform for mastering coding skills with AI-powered guidance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/dsa-arena" className="hover:text-foreground">DSA Arena</Link></li>
                <li><Link to="/dsa-visualization" className="hover:text-foreground">DSA Visualization</Link></li>
                <li><Link to="/games" className="hover:text-foreground">Games</Link></li>
                <li><Link to="/xp-store" className="hover:text-foreground">XP Store</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
            <div className="text-muted-foreground text-sm">
              © 2024 CodeMaster OS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
