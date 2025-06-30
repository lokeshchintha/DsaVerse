
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { 
  Database, 
  Server, 
  Globe, 
  Zap, 
  Shield, 
  BarChart3, 
  Play, 
  Save, 
  Download,
  Plus,
  Trash2,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const SystemDesignPlayground = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [designName, setDesignName] = useState("My System Design");
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

  const componentTypes = [
    { 
      id: "loadbalancer", 
      name: "Load Balancer", 
      icon: BarChart3, 
      color: "#3B82F6",
      description: "Distributes incoming requests across multiple servers"
    },
    { 
      id: "webserver", 
      name: "Web Server", 
      icon: Server, 
      color: "#10B981",
      description: "Handles HTTP requests and serves static content"
    },
    { 
      id: "database", 
      name: "Database", 
      icon: Database, 
      color: "#8B5CF6",
      description: "Stores and manages data persistently"
    },
    { 
      id: "cache", 
      name: "Cache", 
      icon: Zap, 
      color: "#F59E0B",
      description: "Fast data storage for frequently accessed data"
    },
    { 
      id: "cdn", 
      name: "CDN", 
      icon: Globe, 
      color: "#EF4444",
      description: "Content delivery network for global distribution"
    },
    { 
      id: "firewall", 
      name: "Firewall", 
      icon: Shield, 
      color: "#6B7280",
      description: "Security layer to filter incoming traffic"
    }
  ];

  const addComponent = (type) => {
    const newComponent = {
      id: `${type.id}_${Date.now()}`,
      type: type.id,
      name: type.name,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      config: {}
    };
    setComponents([...components, newComponent]);
    toast({
      title: "Component Added",
      description: `${type.name} has been added to your design.`
    });
  };

  const removeComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
    setConnections(connections.filter(conn => conn.from !== id && conn.to !== id));
  };

  const analyzeDesign = () => {
    const analysis = {
      scalability: Math.floor(Math.random() * 40) + 60,
      availability: Math.floor(Math.random() * 30) + 70,
      consistency: Math.floor(Math.random() * 35) + 65,
      performance: Math.floor(Math.random() * 25) + 75
    };

    toast({
      title: "Design Analysis Complete",
      description: `Scalability: ${analysis.scalability}% | Availability: ${analysis.availability}% | Performance: ${analysis.performance}%`
    });
  };

  const exportDesign = () => {
    const designData = {
      name: designName,
      components,
      connections,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(designData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${designName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">System Design Playground</h1>
              <p className="text-muted-foreground">Design scalable systems with drag-and-drop components</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={analyzeDesign}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze
              </Button>
              <Button variant="outline" onClick={exportDesign}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Component Palette */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {componentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <div
                      key={type.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => addComponent(type)}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5" style={{ color: type.color }} />
                        <div>
                          <div className="font-medium text-sm">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Design Canvas */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Design Canvas</CardTitle>
                  <Input
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    className="w-48"
                    placeholder="Design name"
                  />
                </div>
              </CardHeader>
              <CardContent className="relative h-[500px] bg-muted/20 rounded-lg overflow-hidden">
                {components.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Drag components from the palette to start designing</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    {components.map((component) => {
                      const componentType = componentTypes.find(t => t.id === component.type);
                      const IconComponent = componentType?.icon || Server;
                      return (
                        <div
                          key={component.id}
                          className="absolute bg-background border rounded-lg p-3 shadow-sm min-w-[120px] cursor-move"
                          style={{
                            left: component.x,
                            top: component.y,
                            borderColor: componentType?.color
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <IconComponent 
                                className="h-4 w-4" 
                                style={{ color: componentType?.color }}
                              />
                              <span className="text-sm font-medium">{component.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeComponent(component.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {component.type}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Properties Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedComponent ? (
                  <div>
                    <h4 className="font-semibold mb-2">Component Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input className="mt-1" placeholder="Component name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Instance Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Configuration</label>
                        <Textarea 
                          placeholder="Component configuration..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select a component to view properties</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">AI Feedback</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• Consider adding a cache layer for better performance</p>
                    <p>• Load balancer will improve availability</p>
                    <p>• Database replication recommended for high availability</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesignPlayground;
