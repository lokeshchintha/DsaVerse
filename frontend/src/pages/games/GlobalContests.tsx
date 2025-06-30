
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Globe, Trophy, Users, Clock, Star, Play, Calendar, Award } from "lucide-react";

const GlobalContests = () => {
  const [selectedContest, setSelectedContest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const liveContests = [
    {
      title: "Weekly Algorithm Challenge",
      status: "live",
      participants: 15420,
      timeLeft: 7200, // 2 hours
      difficulty: "Medium",
      prize: "500 XP + Badge",
      description: "Solve 3 algorithmic problems in 2 hours",
      sponsor: "TechCorp"
    },
    {
      title: "Data Structure Sprint",
      status: "starting-soon",
      participants: 8934,
      timeLeft: 3600, // 1 hour to start
      difficulty: "Hard",
      prize: "1000 XP + Certificate",
      description: "Advanced tree and graph problems",
      sponsor: "CodeInnovate"
    },
    {
      title: "Junior Developer Cup",
      status: "live",
      participants: 23567,
      timeLeft: 10800, // 3 hours
      difficulty: "Easy",
      prize: "300 XP + Internship Opportunities",
      description: "Entry-level programming challenges",
      sponsor: "DevStart"
    }
  ];

  const pastContests = [
    {
      title: "Monthly Grand Championship",
      date: "2024-01-15",
      participants: 45678,
      winner: "CodeMaster2024",
      myRank: 156,
      totalParticipants: 45678,
      prize: "5000 XP + Trophy"
    },
    {
      title: "AI & Machine Learning Contest",
      date: "2024-01-08", 
      participants: 12345,
      winner: "MLExpert",
      myRank: 89,
      totalParticipants: 12345,
      prize: "2000 XP + Course Access"
    },
    {
      title: "Frontend Development Challenge",
      date: "2024-01-01",
      participants: 18923,
      winner: "ReactNinja",
      myRank: 234,
      totalParticipants: 18923,
      prize: "1500 XP + Job Referrals"
    }
  ];

  const upcomingContests = [
    {
      title: "Quantum Computing Challenge",
      startDate: "2024-02-01",
      duration: "4 hours",
      expectedParticipants: "5000+",
      difficulty: "Expert",
      prize: "10000 XP + Quantum Course",
      sponsor: "QuantumTech",
      description: "Explore quantum algorithms and quantum computing concepts"
    },
    {
      title: "Cybersecurity Hackathon",
      startDate: "2024-02-05",
      duration: "8 hours",
      expectedParticipants: "8000+",
      difficulty: "Hard",
      prize: "7500 XP + Security Training",
      sponsor: "CyberSafe",
      description: "Solve security challenges and implement protection mechanisms"
    },
    {
      title: "Mobile App Development Contest",
      startDate: "2024-02-10",
      duration: "6 hours",
      expectedParticipants: "12000+",
      difficulty: "Medium",
      prize: "3000 XP + App Store Credits",
      sponsor: "MobileDev Inc",
      description: "Build innovative mobile applications with modern frameworks"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "GlobalChampion", score: 15420, country: "🇺🇸", contests: 89 },
    { rank: 2, name: "CodeSamurai", score: 14967, country: "🇯🇵", contests: 76 },
    { rank: 3, name: "AlgoWizard", score: 14523, country: "🇩🇪", contests: 82 },
    { rank: 4, name: "DataScienceKing", score: 13789, country: "🇨🇦", contests: 71 },
    { rank: 5, name: "You", score: 8945, country: "🌐", contests: 23 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'starting-soon': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'ended': return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Expert': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Global Contests 🌍
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compete with developers worldwide in prestigious coding competitions! 
            Climb the global leaderboard and win amazing prizes.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Globe, label: "Active Contests", value: "12", color: "text-indigo-400" },
            { icon: Users, label: "Global Participants", value: "127K", color: "text-green-400" },
            { icon: Trophy, label: "Total Prizes", value: "$50K", color: "text-yellow-400" },
            { icon: Star, label: "Your Global Rank", value: "#2,847", color: "text-purple-400" }
          ].map((stat, index) => (
            <Card key={index} className="bg-black/40 backdrop-blur-lg border-gray-700/50">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-10 w-10 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="live">Live Contests</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Results</TabsTrigger>
            <TabsTrigger value="leaderboard">Global Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {liveContests.map((contest, index) => (
                <Card key={index} className="bg-black/60 backdrop-blur-lg border-indigo-500/50 hover:border-indigo-400/70 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={getStatusColor(contest.status)}>
                        {contest.status === 'live' ? '🔴 LIVE' : '🟡 Starting Soon'}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(contest.difficulty)}>
                        {contest.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-white">{contest.title}</CardTitle>
                    <p className="text-sm text-gray-400">Sponsored by {contest.sponsor}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{contest.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Participants:</span>
                        <span className="text-white">{contest.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Time Left:</span>
                        <span className="text-yellow-400 font-mono">{formatTime(contest.timeLeft)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Prize:</span>
                        <span className="text-green-400">{contest.prize}</span>
                      </div>
                    </div>

                    <Progress value={(contest.timeLeft / 10800) * 100} className="h-2" />

                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      <Play className="h-4 w-4 mr-2" />
                      {contest.status === 'live' ? 'Join Contest' : 'Register Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {upcomingContests.map((contest, index) => (
                <Card key={index} className="bg-black/60 backdrop-blur-lg border-purple-500/50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                        <Calendar className="h-3 w-3 mr-1" />
                        Upcoming
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(contest.difficulty)}>
                        {contest.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-white">{contest.title}</CardTitle>
                    <p className="text-sm text-gray-400">Sponsored by {contest.sponsor}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{contest.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Start Date:</span>
                        <span className="text-white">{contest.startDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{contest.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Expected:</span>
                        <span className="text-white">{contest.expectedParticipants}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Prize:</span>
                        <span className="text-green-400">{contest.prize}</span>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="space-y-4">
              {pastContests.map((contest, index) => (
                <Card key={index} className="bg-black/60 backdrop-blur-lg border-gray-500/50">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <h3 className="font-semibold text-white">{contest.title}</h3>
                        <p className="text-sm text-gray-400">{contest.date}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">{contest.winner}</div>
                        <div className="text-sm text-gray-400">Winner</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">#{contest.myRank}</div>
                        <div className="text-sm text-gray-400">Your Rank</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{contest.participants.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Participants</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-green-400 text-sm">{contest.prize}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-black/60 backdrop-blur-lg border-indigo-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Global Leaderboard
                </CardTitle>
                <p className="text-gray-300">Top performers across all contests</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div 
                      key={player.rank} 
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        player.name === 'You' ? 'bg-indigo-900/30 border border-indigo-500/50' : 'bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          player.rank === 1 ? 'bg-yellow-500 text-black' :
                          player.rank === 2 ? 'bg-gray-400 text-black' :
                          player.rank === 3 ? 'bg-orange-500 text-black' :
                          'bg-gray-600 text-white'
                        }`}>
                          {player.rank <= 3 ? (
                            player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'
                          ) : (
                            `#${player.rank}`
                          )}
                        </div>
                        <div>
                          <div className={`font-medium ${player.name === 'You' ? 'text-indigo-400' : 'text-white'}`}>
                            {player.country} {player.name}
                          </div>
                          <div className="text-sm text-gray-400">{player.contests} contests</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{player.score.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GlobalContests;
