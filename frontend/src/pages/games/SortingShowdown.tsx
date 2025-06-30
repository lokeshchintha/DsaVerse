
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { ArrowUpDown, Clock, Trophy, Play, RotateCcw, Zap } from "lucide-react";

const SortingShowdown = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu");
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [sortingSteps, setSortingSteps] = useState<Array<{array: number[], comparing: number[], swapping: boolean}>>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isAnimating, setIsAnimating] = useState(false);

  const algorithms = [
    {
      name: "Bubble Sort",
      id: "bubbleSort",
      complexity: "O(n²)",
      difficulty: "Easy",
      description: "Compare adjacent elements and swap if needed"
    },
    {
      name: "Selection Sort", 
      id: "selectionSort",
      complexity: "O(n²)",
      difficulty: "Easy",
      description: "Find minimum element and place at beginning"
    },
    {
      name: "Insertion Sort",
      id: "insertionSort", 
      complexity: "O(n²)",
      difficulty: "Medium",
      description: "Insert each element into its correct position"
    },
    {
      name: "Quick Sort",
      id: "quickSort",
      complexity: "O(n log n)",
      difficulty: "Hard", 
      description: "Divide and conquer with pivot partitioning"
    },
    {
      name: "Merge Sort",
      id: "mergeSort",
      complexity: "O(n log n)", 
      difficulty: "Hard",
      description: "Divide array and merge sorted halves"
    }
  ];

  const generateArray = () => {
    const size = Math.floor(Math.random() * 6) + 8; // 8-13 elements
    const array = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
    setCurrentArray(array);
    return array;
  };

  const bubbleSort = (arr: number[]) => {
    const steps: Array<{array: number[], comparing: number[], swapping: boolean}> = [];
    const array = [...arr];
    
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        steps.push({array: [...array], comparing: [j, j + 1], swapping: false});
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          steps.push({array: [...array], comparing: [j, j + 1], swapping: true});
        }
      }
    }
    
    return steps;
  };

  const selectionSort = (arr: number[]) => {
    const steps: Array<{array: number[], comparing: number[], swapping: boolean}> = [];
    const array = [...arr];
    
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < array.length; j++) {
        steps.push({array: [...array], comparing: [minIdx, j], swapping: false});
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        steps.push({array: [...array], comparing: [i, minIdx], swapping: true});
      }
    }
    
    return steps;
  };

  const startGame = () => {
    const array = generateArray();
    let steps: Array<{array: number[], comparing: number[], swapping: boolean}> = [];
    
    switch (selectedAlgorithm) {
      case "bubbleSort":
        steps = bubbleSort(array);
        break;
      case "selectionSort":
        steps = selectionSort(array);
        break;
      default:
        steps = bubbleSort(array);
    }
    
    setSortingSteps(steps);
    setCurrentStep(0);
    setGameState("playing");
    setScore(0);
    setTimeLeft(120);
  };

  const nextStep = () => {
    if (currentStep < sortingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setScore(prev => prev + 10);
    } else {
      setGameState("finished");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const autoPlay = () => {
    setIsAnimating(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= sortingSteps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          setGameState("finished");
          return prev;
        }
        setScore(score => score + 5);
        return prev + 1;
      });
    }, 500);
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState]);

  const currentStepData = sortingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sorting Showdown 📊
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master sorting algorithms through visual step-by-step execution! 
            Watch algorithms come to life as they organize data.
          </p>
        </div>

        {gameState === "menu" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {algorithms.map((algo) => (
                <Card 
                  key={algo.id}
                  className={`cursor-pointer transition-all ${
                    selectedAlgorithm === algo.id ? 'ring-2 ring-indigo-500 bg-indigo-900/20' : 'hover:bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedAlgorithm(algo.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm text-center">{algo.name}</CardTitle>
                    <Badge variant="outline" className="mx-auto text-xs">
                      {algo.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-300 text-xs text-center mb-1">{algo.complexity}</p>
                    <p className="text-gray-400 text-xs text-center">{algo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-black/60 backdrop-blur-lg border-indigo-500/50">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Selected: {algorithms.find(a => a.id === selectedAlgorithm)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={startGame} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Play className="h-6 w-6 mr-2" />
                  Start Sorting Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "playing" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-black/60 backdrop-blur-lg rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-400" />
                  <span className="text-white">{score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-indigo-400" />
                  <span className="text-white">Step {currentStep + 1}/{sortingSteps.length}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-indigo-500/20 text-indigo-300">
                {algorithms.find(a => a.id === selectedAlgorithm)?.name}
              </Badge>
            </div>

            <Card className="bg-black/60 backdrop-blur-lg border-indigo-500/50">
              <CardHeader>
                <CardTitle className="text-white text-center">Array Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-end gap-2 h-64 mb-6">
                  {currentStepData?.array.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-12 transition-all duration-300 flex items-end justify-center text-white font-bold text-sm ${
                          currentStepData.comparing.includes(index)
                            ? currentStepData.swapping 
                              ? 'bg-red-500 animate-bounce'
                              : 'bg-yellow-500'
                            : 'bg-indigo-500'
                        }`}
                        style={{ height: `${(value / Math.max(...currentStepData.array)) * 200}px` }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-3">
                  <Button 
                    onClick={prevStep} 
                    disabled={currentStep === 0 || isAnimating}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={autoPlay} 
                    disabled={isAnimating || currentStep >= sortingSteps.length - 1}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Auto Play
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    disabled={currentStep >= sortingSteps.length - 1 || isAnimating}
                  >
                    Next
                  </Button>
                </div>

                {currentStepData && (
                  <div className="mt-4 p-3 bg-gray-800/50 rounded text-center">
                    {currentStepData.comparing.length > 0 && (
                      <p className="text-gray-300 text-sm">
                        {currentStepData.swapping 
                          ? `Swapping elements at positions ${currentStepData.comparing[0]} and ${currentStepData.comparing[1]}`
                          : `Comparing elements at positions ${currentStepData.comparing[0]} and ${currentStepData.comparing[1]}`
                        }
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-black/90">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Sorting Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-6xl">🎯</div>
                <p className="text-gray-300">Algorithm: {algorithms.find(a => a.id === selectedAlgorithm)?.name}</p>
                <p className="text-gray-300">Final Score: {score}</p>
                <p className="text-gray-300">Steps Executed: {currentStep + 1}</p>
                <div className="flex gap-2">
                  <Button onClick={() => setGameState("menu")} className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingShowdown;
