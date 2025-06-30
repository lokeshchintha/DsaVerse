
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Crown, Lock, Star, Zap, Gift, Check, X, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const DummyGame = () => {
  const premiumFeatures = [
    "Advanced AI Algorithms",
    "Exclusive Premium Challenges", 
    "Priority Support & Mentoring",
    "Custom Code Analysis",
    "Advanced Visualization Tools",
    "Unlimited Game Sessions",
    "Premium-only Tournaments",
    "Expert-level Difficulty Modes"
  ];

  const subscriptionPlans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      features: [
        "Access to all free games",
        "Basic hints system",
        "Standard support",
        "5 premium games/month"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$19.99", 
      period: "month",
      features: [
        "All Basic features",
        "Unlimited premium games",
        "Advanced AI mentor",
        "Priority support",
        "Custom learning paths",
        "Performance analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "month", 
      features: [
        "All Pro features",
        "Team collaboration tools",
        "Custom enterprise content",
        "Dedicated account manager",
        "Advanced reporting",
        "SSO integration"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Premium Lock Screen */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-yellow-500/50 animate-pulse">
              <Crown className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Premium Arena 👑
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Unlock the full potential of your coding journey with exclusive premium content, 
            advanced algorithms, and expert-level challenges designed for serious developers.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <Lock className="h-6 w-6 text-yellow-400" />
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50 text-lg px-4 py-2">
              Premium Subscription Required
            </Badge>
          </div>
        </div>

        {/* Premium Features Preview */}
        <Card className="mb-12 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-lg border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center flex items-center justify-center gap-3">
              <Star className="h-8 w-8 text-yellow-400" />
              Exclusive Premium Features
              <Star className="h-8 w-8 text-yellow-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="p-4 bg-black/40 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-white text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative bg-black/60 backdrop-blur-lg border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-yellow-500/50 scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-black font-bold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {plan.price}
                    <span className="text-lg text-gray-400">/{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full font-bold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                  }`}>
                    <Gift className="h-4 w-4 mr-2" />
                    Get {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Content Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Quantum Algorithms",
              description: "Explore quantum computing with Shor's and Grover's algorithms",
              difficulty: "Legendary",
              icon: Zap
            },
            {
              title: "Advanced ML Models",
              description: "Build neural networks and deep learning architectures",
              difficulty: "Expert",
              icon: Star
            },
            {
              title: "Blockchain Challenges",
              description: "Master cryptographic hashing and consensus algorithms",
              difficulty: "Expert", 
              icon: Lock
            },
            {
              title: "System Design Mastery",
              description: "Design scalable distributed systems and microservices",
              difficulty: "Legendary",
              icon: Crown
            },
            {
              title: "Competitive Programming",
              description: "Practice ICPC-style problems and contest strategies",
              difficulty: "Expert",
              icon: Trophy
            },
            {
              title: "AI Research Lab",
              description: "Implement cutting-edge AI research papers",
              difficulty: "Legendary", 
              icon: Star
            }
          ].map((game, index) => (
            <Card key={index} className="relative bg-black/60 backdrop-blur-lg border-gray-700/50 overflow-hidden">
              {/* Lock Overlay */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-12 w-12 mx-auto mb-3 text-yellow-400" />
                  <div className="text-yellow-400 font-bold">Premium Only</div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <game.icon className="h-8 w-8 text-yellow-400" />
                  <Badge variant="outline" className="bg-orange-500/20 text-orange-300 border-orange-500/50">
                    {game.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">{game.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                <Button disabled className="w-full bg-gray-600 cursor-not-allowed">
                  <Lock className="h-4 w-4 mr-2" />
                  Requires Premium
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-16 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 backdrop-blur-lg border-yellow-500/30">
          <CardContent className="p-12 text-center">
            <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Unlock Premium? 🚀
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have upgraded their skills with our premium content. 
              Start your premium journey today!
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg">
                <Crown className="h-6 w-6 mr-2" />
                Start Premium Trial
              </Button>
              <Link to="/games">
                <Button size="lg" variant="outline" className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20 font-bold px-8 py-4 text-lg">
                  <X className="h-6 w-6 mr-2" />
                  Back to Free Games
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DummyGame;
