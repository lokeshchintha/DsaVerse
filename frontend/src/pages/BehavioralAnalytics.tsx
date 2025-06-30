
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { 
  TrendingUp, 
  Clock, 
  Mouse, 
  Eye, 
  Brain,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  Zap
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginGate from "./LoginGate";
import { toast } from "@/hooks/use-toast";

const BehavioralAnalytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedUser, setSelectedUser] = useState("all");
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

  const patterns = [
    {
      id: 1,
      type: "Typing Speed Anomaly",
      severity: "high",
      description: "User typing speed increased by 300% during contest",
      timestamp: "2024-01-15 14:23:00",
      confidence: 92,
      details: "Average WPM: 45 → 135 WPM in problem 3"
    },
    {
      id: 2,
      type: "Copy-Paste Pattern",
      severity: "medium", 
      description: "Multiple large code blocks pasted within short intervals",
      timestamp: "2024-01-15 14:18:00",
      confidence: 78,
      details: "3 consecutive pastes of 50+ lines each"
    },
    {
      id: 3,
      type: "Tab Switching",
      severity: "low",
      description: "Frequent browser tab switches detected",
      timestamp: "2024-01-15 14:15:00",
      confidence: 65,
      details: "12 tab switches in 5 minutes"
    }
  ];

  // Enhanced heatmap data with more realistic patterns
  const weeklyHeatmapData = [
    { day: 'Mon', hours: [2, 1, 0, 0, 1, 3, 8, 15, 25, 35, 45, 38, 28, 42, 55, 48, 52, 45, 38, 32, 25, 18, 12, 5] },
    { day: 'Tue', hours: [1, 0, 0, 0, 2, 4, 10, 18, 28, 38, 48, 42, 32, 45, 58, 52, 55, 48, 42, 35, 28, 20, 15, 8] },
    { day: 'Wed', hours: [3, 2, 1, 0, 1, 2, 6, 12, 22, 32, 42, 35, 25, 38, 50, 45, 48, 42, 35, 28, 22, 15, 10, 6] },
    { day: 'Thu', hours: [2, 1, 0, 1, 2, 5, 12, 20, 30, 40, 50, 45, 35, 48, 60, 55, 58, 52, 45, 38, 30, 22, 16, 8] },
    { day: 'Fri', hours: [1, 1, 0, 0, 1, 3, 8, 16, 26, 36, 46, 40, 30, 43, 56, 50, 53, 46, 40, 33, 26, 18, 12, 6] },
    { day: 'Sat', hours: [0, 0, 0, 0, 0, 1, 4, 8, 15, 25, 35, 30, 20, 28, 40, 35, 38, 32, 25, 20, 15, 10, 8, 4] },
    { day: 'Sun', hours: [1, 0, 0, 0, 0, 2, 5, 10, 18, 28, 38, 32, 22, 30, 42, 38, 40, 35, 28, 22, 16, 12, 8, 3] }
  ];

  const monthlyHeatmapData = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    activity: Math.floor(Math.random() * 60) + 10
  }));

  const getIntensityColor = (value: number) => {
    if (value === 0) return "bg-gray-100 dark:bg-gray-800";
    if (value <= 10) return "bg-green-200 dark:bg-green-900";
    if (value <= 25) return "bg-green-400 dark:bg-green-700";
    if (value <= 40) return "bg-yellow-400 dark:bg-yellow-700";
    if (value <= 55) return "bg-orange-500 dark:bg-orange-700";
    return "bg-red-600 dark:bg-red-800";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Behavioral Analytics</h1>
          <p className="text-muted-foreground">
            Monitor and analyze user behavior patterns for academic integrity
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="flagged">Flagged Users</SelectItem>
              <SelectItem value="contest">Contest Participants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="patterns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patterns">Suspicious Patterns</TabsTrigger>
            <TabsTrigger value="heatmaps">Activity Heatmaps</TabsTrigger>
            <TabsTrigger value="realtime">Real-time Monitoring</TabsTrigger>
            <TabsTrigger value="reports">Analytics Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    High Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>  
                  <div className="text-2xl font-bold text-red-600">7</div>
                  <p className="text-xs text-muted-foreground">patterns detected</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-yellow-500" />
                    Medium Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">15</div>
                  <p className="text-xs text-muted-foreground">patterns detected</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Clean Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">342</div>
                  <p className="text-xs text-muted-foreground">no anomalies</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Detected Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patterns.map((pattern) => (
                    <div key={pattern.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={getSeverityColor(pattern.severity)}>
                            {pattern.severity.toUpperCase()}
                          </Badge>
                          <h3 className="font-semibold">{pattern.type}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {pattern.timestamp}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{pattern.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{pattern.details}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Confidence: {pattern.confidence}%</span>
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${pattern.confidence}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmaps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Activity Heatmap
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  User activity intensity throughout the week (hours)
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-25 gap-1 text-xs">
                    <div></div>
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="text-center text-muted-foreground">
                        {i}
                      </div>
                    ))}
                  </div>
                  {weeklyHeatmapData.map((dayData, dayIndex) => (
                    <div key={dayIndex} className="grid grid-cols-25 gap-1 items-center">
                      <div className="text-sm font-medium text-muted-foreground w-12">
                        {dayData.day}
                      </div>
                      {dayData.hours.map((activity, hourIndex) => (
                        <div
                          key={hourIndex}
                          className={`aspect-square rounded ${getIntensityColor(activity)} transition-all hover:scale-110 cursor-pointer`}
                          title={`${dayData.day} ${hourIndex}:00 - Activity: ${activity}`}
                        />
                      ))}
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm mt-4">
                    <span className="text-muted-foreground">Less activity</span>
                    <div className="flex gap-1">
                      {[0, 15, 30, 45, 60].map((intensity) => (
                        <div
                          key={intensity} 
                          className={`w-3 h-3 rounded ${getIntensityColor(intensity)}`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">More activity</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mouse className="h-5 w-5" />
                  Monthly Activity Overview
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Daily activity summary for the current month
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {monthlyHeatmapData.map((data, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded flex items-center justify-center text-xs font-medium ${getIntensityColor(data.activity)} transition-all hover:scale-110 cursor-pointer`}
                      title={`Day ${data.day} - Activity: ${data.activity}`}
                    >
                      {data.day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Mouse Movement Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-8 min-h-[300px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full">
                      <path
                        d="M 50 150 Q 150 50 250 150 T 450 150"
                        stroke="rgb(59 130 246)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                      />
                      <path
                        d="M 100 200 Q 200 100 300 200 T 500 200"
                        stroke="rgb(34 197 94)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: '0.5s' }}
                      />
                      <path
                        d="M 75 175 Q 175 75 275 175 T 475 175"
                        stroke="rgb(239 68 68)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: '1s' }}
                      />
                      <circle cx="250" cy="150" r="4" fill="rgb(59 130 246)" className="animate-ping" />
                      <circle cx="300" cy="200" r="4" fill="rgb(34 197 94)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                      <circle cx="275" cy="175" r="4" fill="rgb(239 68 68)" className="animate-ping" style={{ animationDelay: '1s' }} />
                    </svg>
                  </div>
                  <div className="relative z-10 text-center">
                    <h3 className="text-lg font-semibold mb-2">Movement Tracking Active</h3>
                    <p className="text-muted-foreground">
                      Real-time mouse movement patterns are being analyzed for anomalies
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">78%</div>
                        <div className="text-sm text-muted-foreground">Normal</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-500">15%</div>
                        <div className="text-sm text-muted-foreground">Suspicious</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">7%</div>
                        <div className="text-sm text-muted-foreground">Flagged</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Live Monitoring Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-muted-foreground">Active Sessions</div>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-muted-foreground">Flagged Users</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-muted-foreground">Actions/min</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">98.5%</div>
                    <div className="text-sm text-muted-foreground">Clean Rate</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Activity</h4>
                  {[
                    { user: "user_1234", action: "Started coding session", time: "2 min ago", status: "normal" },
                    { user: "user_5678", action: "Rapid typing detected", time: "3 min ago", status: "warning" },
                    { user: "user_9012", action: "Tab switch pattern", time: "5 min ago", status: "alert" },
                    { user: "user_3456", action: "Completed problem", time: "7 min ago", status: "normal" }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.status === 'normal' ? 'bg-green-500' :
                          activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-muted-foreground">{activity.action}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Detection Accuracy</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>True Positives:</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>False Positives:</span>
                        <span className="font-medium">8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>System Confidence:</span>
                        <span className="font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Common Violations</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Code Copying:</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>External Resources:</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unusual Typing:</span>
                        <span className="font-medium">23%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BehavioralAnalytics;
