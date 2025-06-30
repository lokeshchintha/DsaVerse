
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

export const LearningPath = () => {
  const pathItems = [
    { title: "Array Fundamentals", completed: true, progress: 100 },
    { title: "Two Pointers Technique", completed: true, progress: 100 },
    { title: "Sliding Window", completed: false, progress: 60 },
    { title: "Binary Search", completed: false, progress: 0 },
    { title: "Tree Traversals", completed: false, progress: 0 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Learning Path</CardTitle>
        <CardDescription>Personalized roadmap based on your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pathItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                {item.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={`text-sm ${item.completed ? 'text-muted-foreground line-through' : 'font-medium'}`}>
                  {item.title}
                </span>
              </div>
              {!item.completed && item.progress > 0 && (
                <div className="ml-6">
                  <Progress value={item.progress} className="h-1" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.progress}% complete
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button className="w-full mt-4" variant="outline">
            <ArrowRight className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
