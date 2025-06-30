
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      problem: "Two Sum",
      difficulty: "Easy",
      status: "solved",
      time: "5 min ago",
      language: "Python"
    },
    {
      problem: "Longest Palindromic Substring",
      difficulty: "Medium",
      status: "attempted",
      time: "1 hour ago",
      language: "JavaScript"
    },
    {
      problem: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      status: "solved",
      time: "2 hours ago",
      language: "Python"
    },
    {
      problem: "Merge k Sorted Lists",
      difficulty: "Hard",
      status: "attempted",
      time: "1 day ago",
      language: "Java"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest problem-solving sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {activity.status === "solved" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{activity.problem}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getDifficultyColor(activity.difficulty)}>
                      {activity.difficulty}
                    </Badge>
                    <Badge variant="secondary">{activity.language}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
