
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Code, Trophy, Users, Brain, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

const LoginGate = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {description}
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl w-fit">
                <Code className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Login Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                You need to be logged in to access this feature. Join thousands of developers improving their coding skills!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">Monitor your coding journey</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">Compete</h3>
                  <p className="text-sm text-muted-foreground">Challenge other developers</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">Learn</h3>
                  <p className="text-sm text-muted-foreground">Access personalized content</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/signup">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginGate;
