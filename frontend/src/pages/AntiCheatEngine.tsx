
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Shield, Eye, Keyboard, Monitor, AlertTriangle, CheckCircle, Camera, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";

const AntiCheatEngine = () => {
  const [isContestMode, setIsContestMode] = useState(false);
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [pasteAttempts, setPasteAttempts] = useState(0);
  const [eyeTrackingActive, setEyeTrackingActive] = useState(false);
  const [fullScreenLocked, setFullScreenLocked] = useState(false);
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
  
  
  const [violations, setViolations] = useState([
    { time: "14:32:15", type: "Tab Switch", severity: "medium", description: "Switched to browser tab for 3 seconds" },
    { time: "14:28:42", type: "Copy Attempt", severity: "high", description: "Attempted to copy text from problem statement" },
    { time: "14:25:18", type: "Eye Tracking", severity: "low", description: "Looked away from screen for 8 seconds" },
    { time: "14:22:05", type: "Paste Detected", severity: "high", description: "Pasted code from external source" }
  ]);
  
  const securityFeatures = [
    { 
      id: "tab-monitoring", 
      name: "Tab Switch Detection", 
      description: "Monitors tab switches and window focus changes",
      active: true,
      risk: "medium"
    },
    { 
      id: "paste-detection", 
      name: "Paste Detection", 
      description: "Detects clipboard paste operations",
      active: true,
      risk: "high"
    },
    { 
      id: "eye-tracking", 
      name: "Eye Tracking", 
      description: "Webcam-based eye movement monitoring",
      active: eyeTrackingActive,
      risk: "medium"
    },
    { 
      id: "typing-pattern", 
      name: "Typing Pattern Analysis", 
      description: "Analyzes typing speed and patterns for anomalies",
      active: false,
      risk: "low"
    },
    { 
      id: "screen-recording", 
      name: "Screen Recording", 
      description: "Records screen activity during contest",
      active: false,
      risk: "high"
    },
    { 
      id: "fullscreen-lock", 
      name: "Fullscreen Lock", 
      description: "Prevents exiting fullscreen mode",
      active: fullScreenLocked,
      risk: "high"
    }
  ];
  
  useEffect(() => {
    if (monitoringActive) {
      // Tab switch detection
      const handleVisibilityChange = () => {
        if (document.hidden) {
          setTabSwitches(prev => prev + 1);
          setViolations(prev => [{
            time: new Date().toLocaleTimeString(),
            type: "Tab Switch",
            severity: "medium",
            description: "Tab became inactive/hidden"
          }, ...prev]);
          
          toast({
            title: "Security Alert",
            description: "Tab switch detected",
            variant: "destructive"
          });
        }
      };
      
      // Paste detection
      const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault();
        setPasteAttempts(prev => prev + 1);
        setViolations(prev => [{
          time: new Date().toLocaleTimeString(),
          type: "Paste Detected",
          severity: "high",
          description: "Attempted to paste content"
        }, ...prev]);
        
        toast({
          title: "Security Violation",
          description: "Paste operation blocked",
          variant: "destructive"
        });
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('paste', handlePaste);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('paste', handlePaste);
      };
    }
  }, [monitoringActive]);
  
  const startContestMode = () => {
    setIsContestMode(true);
    setMonitoringActive(true);
    setFullScreenLocked(true);
    
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    
    toast({
      title: "Contest Mode Activated",
      description: "Security monitoring is now active",
    });
  };
  
  const exitContestMode = () => {
    setIsContestMode(false);
    setMonitoringActive(false);
    setFullScreenLocked(false);
    
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    
    toast({
      title: "Contest Mode Deactivated",
      description: "Security monitoring has been stopped",
    });
  };
  
  const startEyeTracking = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setEyeTrackingActive(true);
      
      toast({
        title: "Eye Tracking Started",
        description: "Webcam access granted for monitoring",
      });
      
      // Stop the stream for demo purposes
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
      }, 1000);
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Eye tracking requires webcam permission",
        variant: "destructive"
      });
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  if (loading) return null;
  
  if (!isLoggedIn) {
    return (
      <LoginGate 
      title="Anti Cheat Engine" 
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
              <h1 className="text-3xl font-bold mb-2">Anti-Cheat Engine</h1>
              <p className="text-muted-foreground">
                Advanced monitoring system for secure coding assessments
              </p>
            </div>
            <div className="flex gap-2">
              {!isContestMode ? (
                <Button onClick={startContestMode} className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Start Contest Mode
                </Button>
              ) : (
                <Button onClick={exitContestMode} variant="destructive" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Exit Contest Mode
                </Button>
              )}
            </div>
          </div>
        </div>

        {isContestMode && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Contest mode is active. All activities are being monitored and recorded.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="features">Security Features</TabsTrigger>
            <TabsTrigger value="violations">Violations Log</TabsTrigger>
            <TabsTrigger value="reports">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <Shield className={`h-4 w-4 ${isContestMode ? 'text-green-600' : 'text-gray-400'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isContestMode ? 'Active' : 'Inactive'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Monitoring {isContestMode ? 'enabled' : 'disabled'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tab Switches</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tabSwitches}</div>
                  <p className="text-xs text-muted-foreground">
                    {tabSwitches > 3 ? 'High risk' : 'Normal'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Paste Attempts</CardTitle>
                  <Keyboard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pasteAttempts}</div>
                  <p className="text-xs text-muted-foreground">
                    All blocked
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eye Tracking</CardTitle>
                  <Eye className={`h-4 w-4 ${eyeTrackingActive ? 'text-green-600' : 'text-gray-400'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {eyeTrackingActive ? 'ON' : 'OFF'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Webcam monitoring
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span className="text-sm">Screen Focus</span>
                    </div>
                    <Badge variant={isContestMode ? "default" : "secondary"}>
                      {isContestMode ? "Monitored" : "Not Active"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Keyboard className="h-4 w-4" />
                      <span className="text-sm">Keyboard Activity</span>
                    </div>
                    <Badge variant={isContestMode ? "default" : "secondary"}>
                      {isContestMode ? "Tracked" : "Not Active"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      <span className="text-sm">Webcam Monitoring</span>
                    </div>
                    <Badge variant={eyeTrackingActive ? "default" : "secondary"}>
                      {eyeTrackingActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={startEyeTracking}
                    disabled={eyeTrackingActive}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {eyeTrackingActive ? "Eye Tracking Active" : "Start Eye Tracking"}
                  </Button>

                  <Button 
                    onClick={() => setFullScreenLocked(!fullScreenLocked)}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {fullScreenLocked ? "Exit Fullscreen" : "Lock Fullscreen"}
                  </Button>

                  <Button 
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Export Security Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityFeatures.map((feature) => (
                <Card key={feature.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      <Badge variant={feature.active ? "default" : "outline"}>
                        {feature.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Risk Level:</span>
                        <Badge 
                          variant="outline" 
                          className={
                            feature.risk === "high" ? "border-red-300 text-red-700" :
                            feature.risk === "medium" ? "border-yellow-300 text-yellow-700" :
                            "border-blue-300 text-blue-700"
                          }
                        >
                          {feature.risk}
                        </Badge>
                      </div>
                      <Switch 
                        checked={feature.active}
                        disabled={isContestMode && feature.active}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="violations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Violations Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {violations.map((violation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <AlertTriangle className={`h-4 w-4 ${
                          violation.severity === "high" ? "text-red-500" :
                          violation.severity === "medium" ? "text-yellow-500" :
                          "text-blue-500"
                        }`} />
                        <div>
                          <div className="font-medium">{violation.type}</div>
                          <div className="text-sm text-muted-foreground">{violation.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getSeverityColor(violation.severity)}>
                          {violation.severity}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{violation.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">87</div>
                    <p className="text-sm text-muted-foreground">Out of 100</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Low Risk
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Violations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">4</div>
                    <p className="text-sm text-muted-foreground">This session</p>
                    <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                      Medium Risk
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">45m</div>
                    <p className="text-sm text-muted-foreground">Monitored time</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AntiCheatEngine;
