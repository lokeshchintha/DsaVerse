import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { 
  Zap, 
  Eye, 
  Lightbulb, 
  Trophy, 
  Star,
  Gift,
  Lock,
  CheckCircle,
  CreditCard,
  DollarSign,
  Crown
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const XPStore = () => {
  const [userXP, setUserXP] = useState(2847);
  const [ownedItems, setOwnedItems] = useState<number[]>([]);
  const [isPremium, setIsPremium] = useState(false);
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

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setIsPremium(userRole === "premium");
  }, []);

  const xpPackages = [
    {
      id: "xp_100",
      name: "100 XP",
      description: "Small XP boost for quick purchases",
      price: 0.99,
      xp: 100,
      color: "bg-green-500"
    },
    {
      id: "xp_500", 
      name: "500 XP",
      description: "Popular choice for regular users",
      price: 3.99,
      xp: 500,
      color: "bg-blue-500",
      popular: true
    },
    {
      id: "xp_1000",
      name: "1000 XP", 
      description: "Great value for serious learners",
      price: 6.99,
      xp: 1000,
      color: "bg-purple-500"
    },
    {
      id: "xp_2500",
      name: "2500 XP",
      description: "Best value pack for power users",
      price: 14.99,
      xp: 2500,
      color: "bg-orange-500",
      bestValue: true
    }
  ];

  const storeItems = [
    {
      id: 1,
      name: "Hidden Test Cases",
      description: "Reveal all hidden test cases for any problem",
      price: 50,
      icon: Eye,
      category: "Problem Solving",
      color: "bg-blue-500",
      benefits: ["See all test cases", "Better debugging", "Learn edge cases"]
    },
    {
      id: 2,
      name: "AI Hint Generator",
      description: "Get smart hints for any problem you're stuck on",
      price: 75,
      icon: Lightbulb,
      category: "Learning",
      color: "bg-yellow-500",
      benefits: ["Personalized hints", "Step-by-step guidance", "No direct answers"]
    },
    {
      id: 3,
      name: "Solution Explanation",
      description: "Get detailed explanation of optimal solutions",
      price: 100,
      icon: CheckCircle,
      category: "Learning",
      color: "bg-green-500",
      benefits: ["Algorithm explanation", "Time complexity analysis", "Multiple approaches"]
    },
    {
      id: 4,
      name: "Skip Problem Cooldown",
      description: "Bypass the 24-hour cooldown for attempting problems",
      price: 25,
      icon: Zap,
      category: "Convenience",
      color: "bg-purple-500",
      benefits: ["Instant retry", "No waiting time", "Practice more"]
    },
    {
      id: 5,
      name: "Custom Problem Generator",
      description: "Generate personalized problems based on your weak areas",
      price: 150,
      icon: Star,
      category: "Practice",
      color: "bg-orange-500",
      benefits: ["Tailored problems", "Focus on weaknesses", "Unlimited generation"]
    },
    {
      id: 6,
      name: "VIP Contest Access",
      description: "Access to exclusive VIP-only coding contests",
      price: 200,
      icon: Trophy,
      category: "Competition",
      color: "bg-red-500",
      benefits: ["Exclusive contests", "Better prizes", "Elite leaderboard"],
      premium: true
    },
    {
      id: 7,
      name: "Profile Themes",
      description: "Unlock premium themes for your coding profile",
      price: 30,
      icon: Gift,
      category: "Customization",
      color: "bg-pink-500",
      benefits: ["10+ themes", "Animated backgrounds", "Custom colors"]
    },
    {
      id: 8,
      name: "Code Review Service",
      description: "Get your code reviewed by expert programmers",
      price: 125,
      icon: Eye,
      category: "Learning",
      color: "bg-indigo-500",
      benefits: ["Expert feedback", "Best practices", "Performance tips"],
      premium: true
    }
  ];

  const categories = [...new Set(storeItems.map(item => item.category))];

  const purchaseXP = (xpPackage: typeof xpPackages[0]) => {
    toast({
      title: "Payment Processing...",
      description: `Processing payment for ${xpPackage.name} ($${xpPackage.price})`
    });
    
    setTimeout(() => {
      setUserXP(prev => prev + xpPackage.xp);
      toast({
        title: "Purchase Successful! 🎉",
        description: `You've purchased ${xpPackage.xp} XP for $${xpPackage.price}.`
      });
    }, 2000);
  };

  const purchaseItem = (item: typeof storeItems[0]) => {
    if (item.premium && !isPremium) {
      toast({
        title: "Premium Required",
        description: "This item requires a premium membership.",
        variant: "destructive"
      });
      return;
    }

    if (userXP >= item.price) {
      setUserXP(prev => prev - item.price);
      setOwnedItems(prev => [...prev, item.id]);
      toast({
        title: "Purchase Successful! ✨",
        description: `You've purchased ${item.name} for ${item.price} XP.`
      });
    } else {
      toast({
        title: "Insufficient XP",
        description: `You need ${item.price - userXP} more XP to purchase this item.`,
        variant: "destructive"
      });
    }
  };

  const isOwned = (itemId: number) => ownedItems.includes(itemId);

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">XP Store</h1>
              <p className="text-muted-foreground">Use your experience points to unlock powerful features and tools</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-purple-600" />
                <div className="text-3xl font-bold text-purple-600">{userXP}</div>
              </div>
              <div className="text-sm text-muted-foreground">Available XP</div>
              {isPremium && (
                <div className="flex items-center gap-1 mt-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-yellow-500">Premium Member</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* XP Purchase Packages */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Buy XP with Real Money
            </CardTitle>
            <p className="text-muted-foreground">Purchase XP instantly to unlock premium features</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {xpPackages.map((xpPackage) => (
                <Card key={xpPackage.id} className={`relative ${xpPackage.popular ? 'border-blue-500 border-2' : ''} ${xpPackage.bestValue ? 'border-orange-500 border-2' : ''}`}>
                  {xpPackage.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500">Most Popular</Badge>
                    </div>
                  )}
                  {xpPackage.bestValue && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500">Best Value</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div className={`mx-auto p-3 rounded-full ${xpPackage.color} bg-opacity-10 mb-2`}>
                      <Zap className={`h-8 w-8 ${xpPackage.color.replace('bg-', 'text-')}`} />
                    </div>
                    <CardTitle className="text-xl">{xpPackage.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{xpPackage.description}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold mb-2">${xpPackage.price}</div>
                    <div className="text-sm text-muted-foreground mb-4">{xpPackage.xp} XP</div>
                    <Button 
                      onClick={() => purchaseXP(xpPackage)}
                      className="w-full"
                      size="sm"
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* XP Earning Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              How to Earn XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">+10 XP</div>
                <div className="text-sm text-muted-foreground">Solve Easy Problem</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">+25 XP</div>
                <div className="text-sm text-muted-foreground">Solve Medium Problem</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">+50 XP</div>
                <div className="text-sm text-muted-foreground">Solve Hard Problem</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">+100 XP</div>
                <div className="text-sm text-muted-foreground">Win Weekly Contest</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Items by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storeItems
                .filter(item => item.category === category)
                .map((item) => {
                  const IconComponent = item.icon;
                  const owned = isOwned(item.id);
                  const canAfford = userXP >= item.price;
                  const needsPremium = item.premium && !isPremium;

                  return (
                    <Card key={item.id} className={`relative ${owned ? 'border-green-500' : ''}`}>
                      {owned && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Owned
                          </Badge>
                        </div>
                      )}
                      {item.premium && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-yellow-500">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${item.color} bg-opacity-10`}>
                            <IconComponent className={`h-6 w-6 ${item.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Benefits:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {item.benefits.map((benefit, idx) => (
                              <li key={idx}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-purple-500" />
                            <span className="font-bold">{item.price} XP</span>
                          </div>
                          <Button
                            onClick={() => purchaseItem(item)}
                            disabled={owned || !canAfford || needsPremium}
                            variant={owned ? "secondary" : "default"}
                            size="sm"
                          >
                            {owned ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Owned
                              </>
                            ) : needsPremium ? (
                              <>
                                <Crown className="h-4 w-4 mr-1" />
                                Premium Only
                              </>
                            ) : !canAfford ? (
                              <>
                                <Lock className="h-4 w-4 mr-1" />
                                Need {item.price - userXP} XP
                              </>
                            ) : (
                              "Purchase"
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XPStore;
