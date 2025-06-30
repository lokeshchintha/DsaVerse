
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Code, 
  User, 
  LogOut, 
  Menu,
  Brain,
  Gamepad2,
  Trophy,
  Zap,
  TreePine,
  BarChart3,
  Hash,
  List,
  Layers,
  Network,
  GitBranch,
  Search,
  Shuffle,
  Binary
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const Navbar = () => {
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
  if (loading) return null;

  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

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

  const dsaTopics = [
    { name: "Arrays", icon: BarChart3, path: "/arrays" },
    { name: "Strings", icon: Hash, path: "/strings" },
    { name: "Linked Lists", icon: List, path: "/linked-list" },
    { name: "Stack", icon: Layers, path: "/stack" },
    { name: "Queue", icon: Layers, path: "/queue" },
    { name: "Trees", icon: TreePine, path: "/trees" },
    { name: "Graphs", icon: Network, path: "/graphs" },
    { name: "Recursion", icon: GitBranch, path: "/recursion" },
    { name: "Backtracking", icon: Search, path: "/backtracking" },
    { name: "Dynamic Programming", icon: Binary, path: "/dynamic-programming" },
    { name: "Searching", icon: Search, path: "/searching" },
    { name: "Sorting", icon: Shuffle, path: "/sorting" },
    { name: "Greedy", icon: Zap, path: "/greedy" },
    { name: "Bit Manipulation", icon: Binary, path: "/bit-manipulation" }
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              codeVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/xp-store" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-zap h-6 w-6 text-purple-600" data-lov-id="src\pages\XPStore.tsx:212:16" data-lov-name="Zap" data-component-path="src\pages\XPStore.tsx" data-component-line="212" data-component-file="XPStore.tsx" data-component-name="Zap" data-component-content="%7B%22className%22%3A%22h-6%20w-6%20text-purple-600%22%7D"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>  
                     XP Store
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <ThemeToggle />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/progress")}>
                    Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/dsa-arena")}>
                  DSA Arena
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dsa-visualization")}>
                  DSA Visualization
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/peer-battle")}>
                  Peer Battles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/games")}>
                  Games
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/xp-store")}>
                  XP Store
                </DropdownMenuItem>
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/login")}>
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/signup")}>
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
