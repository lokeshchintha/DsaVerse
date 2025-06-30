
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  TreePine,
  Network,
  BarChart3,
  Search,
  Shuffle,
  Hash,
  List,
  Layers,
  GitBranch,
  ChevronRight,
  Home,
  Binary,
  Zap,
  StepForward,
  StepBack
} from "lucide-react";
import LoginGate from "./LoginGate";
import { toast } from "@/hooks/use-toast";

interface TopicSubtopics {
  [key: string]: string;
}

interface Topic {
  title: string;
  icon: any;
  color: string;
  operations: string[];
  subtopics?: TopicSubtopics;
}

interface Topics {
  [key: string]: Topic;
}

const DSAVisualization = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(topic || "arrays");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [inputIndex, setInputIndex] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(5);
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

  const topics: Topics = {
    arrays: {
      title: "Arrays",
      icon: BarChart3,
      color: "bg-blue-500",
      operations: ["Insert", "Delete", "Search", "Update", "Traverse", "Reverse", "Sort"]
    },
    strings: {
      title: "Strings",
      icon: Hash,
      color: "bg-green-500",
      operations: ["Concatenation", "Substring", "Pattern Matching", "Palindrome Check", "Anagram Check", "String Reversal"]
    },
    "linked-list": {
      title: "Linked Lists",
      icon: List,
      color: "bg-purple-500",
      subtopics: {
        "singly-linked-list": "Singly Linked List",
        "doubly-linked-list": "Doubly Linked List", 
        "circular-linked-list": "Circular Linked List",
        "circular-doubly-linked-list": "Circular Doubly Linked List"
      },
      operations: ["Insert at Head", "Insert at Tail", "Insert at Position", "Delete Node", "Search", "Reverse", "Detect Cycle"]
    },
    stack: {
      title: "Stack",
      icon: Layers,
      color: "bg-yellow-500",
      operations: ["Push", "Pop", "Peek/Top", "isEmpty", "Size", "Clear"]
    },
    queue: {
      title: "Queue", 
      icon: Layers,
      color: "bg-orange-500",
      operations: ["Enqueue", "Dequeue", "Front", "Rear", "isEmpty", "Size", "Clear"]
    },
    trees: {
      title: "Trees",
      icon: TreePine,
      color: "bg-emerald-500",
      subtopics: {
        "binary-tree": "Binary Tree",
        "binary-search-tree": "Binary Search Tree",
        "avl-tree": "AVL Tree",
        "red-black-tree": "Red Black Tree",
        "trie": "Trie",
        "segment-tree": "Segment Tree"
      },
      operations: ["Insert", "Delete", "Search", "Inorder Traversal", "Preorder Traversal", "Postorder Traversal", "Level Order Traversal", "Height", "Balance"]
    },
    graphs: {
      title: "Graphs",
      icon: Network,
      color: "bg-red-500",
      subtopics: {
        "directed-weighted": "Directed Weighted",
        "directed-unweighted": "Directed Unweighted",
        "undirected-weighted": "Undirected Weighted",
        "undirected-unweighted": "Undirected Unweighted"
      },
      operations: ["Add Vertex", "Add Edge", "Remove Vertex", "Remove Edge", "BFS", "DFS", "Shortest Path", "Minimum Spanning Tree"]
    },
    recursion: {
      title: "Recursion",
      icon: GitBranch,
      color: "bg-indigo-500",
      operations: ["Factorial", "Fibonacci", "Tower of Hanoi", "Binary Search", "Tree Traversal", "Quick Sort", "Merge Sort"]
    },
    backtracking: {
      title: "Backtracking",
      icon: Search,
      color: "bg-pink-500",
      operations: ["N-Queens", "Sudoku Solver", "Maze Path Finding", "Subset Generation", "Permutations", "Combinations"]
    },
    "dynamic-programming": {
      title: "Dynamic Programming",
      icon: Binary,
      color: "bg-cyan-500",
      operations: ["Fibonacci", "0/1 Knapsack", "Longest Common Subsequence", "Edit Distance", "Coin Change", "Maximum Subarray"]
    },
    searching: {
      title: "Searching",
      icon: Search,
      color: "bg-violet-500",
      operations: ["Linear Search", "Binary Search", "Jump Search", "Interpolation Search", "Exponential Search"]
    },
    sorting: {
      title: "Sorting",
      icon: Shuffle,
      color: "bg-teal-500",
      operations: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Radix Sort", "Counting Sort"]
    },
    greedy: {
      title: "Greedy Algorithms",
      icon: Zap,
      color: "bg-amber-500",
      operations: ["Activity Selection", "Fractional Knapsack", "Job Scheduling", "Huffman Coding", "Dijkstra's Algorithm"]
    },
    "bit-manipulation": {
      title: "Bit Manipulation",
      icon: Binary,
      color: "bg-slate-500",
      operations: ["AND Operation", "OR Operation", "XOR Operation", "NOT Operation", "Left Shift", "Right Shift", "Count Set Bits", "Check Power of 2"]
    }
  };

  const currentTopic = topics[selectedTopic as keyof typeof topics];

  useEffect(() => {
    if (topic) {
      setSelectedTopic(topic);
    }
  }, [topic]);

  const handlePlay = () => {
    if (!selectedOperation) {
      return;
    }
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Start animation
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 2000 - (animationSpeed * 15));
      
      // Store interval ID for cleanup
      (window as any).animationInterval = interval;
    } else {
      // Stop animation
      if ((window as any).animationInterval) {
        clearInterval((window as any).animationInterval);
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setInputIndex("");
    setInputValue("");
    if ((window as any).animationInterval) {
      clearInterval((window as any).animationInterval);
    }
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedSubtopic("");
    setSelectedOperation("");
    setCurrentStep(0);
    navigate(`/dsa-visualization/${topicId}`);
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Enhanced visualization renderers with step-by-step animation
  const renderArrayVisualization = () => {
    const array = [5, 2, 8, 1, 9, 3];
    const highlightIndex = inputIndex ? parseInt(inputIndex) : -1;
    const value = inputValue || "10";
    
    let displayArray = [...array];
    let stepDescription = "";
    
    if (selectedOperation === "Insert" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Inserting value ${value} at index ${highlightIndex}`;
      if (currentStep >= 2) {
        displayArray.splice(highlightIndex, 0, parseInt(value));
      }
    } else if (selectedOperation === "Delete" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Deleting element at index ${highlightIndex}`;
      if (currentStep >= 2) {
        displayArray.splice(highlightIndex, 1);
      }
    } else if (selectedOperation === "Search" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Searching for value ${value}`;
    } else if (selectedOperation === "Sort" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Sorting array using Bubble Sort`;
      // Simple bubble sort visualization
      if (currentStep >= 1) {
        displayArray = [2, 5, 8, 1, 9, 3];
      }
      if (currentStep >= 3) {
        displayArray = [2, 5, 1, 8, 9, 3];
      }
      if (currentStep >= 4) {
        displayArray = [1, 2, 5, 8, 9, 3];
      }
    }
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {displayArray.map((value, index) => (
            <div key={`${index}-${value}`} className="relative">
              <div className={`w-16 h-16 border-2 ${
                (highlightIndex === index && (selectedOperation === "Insert" || selectedOperation === "Delete" || selectedOperation === "Search")) || 
                (selectedOperation === "Sort" && currentStep > 0 && index < currentStep) 
                  ? 'border-red-500 bg-red-100 dark:bg-red-900 scale-110' 
                  : 'border-blue-500 bg-blue-50 dark:bg-blue-900'
              } rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                isPlaying ? 'animate-pulse' : ''
              }`}>
                {value}
              </div>
              <div className="text-xs text-center mt-2 text-muted-foreground">[{index}]</div>
            </div>
          ))}
        </div>
        
        {stepDescription && (
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{stepDescription}</p>
          </div>
        )}
      </div>
    );
  };

  const renderLinkedListVisualization = () => {
    const nodes = [
      { value: 10, next: true }, 
      { value: 20, next: true }, 
      { value: 30, next: false }
    ];
    
    let displayNodes = [...nodes];
    let stepDescription = "";
    
    if (selectedOperation === "Insert at Head" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Inserting node with value ${inputValue || "5"} at head`;
      if (currentStep >= 2) {
        displayNodes = [{ value: parseInt(inputValue || "5"), next: true }, ...nodes];
      }
    } else if (selectedOperation === "Delete Node" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Deleting node at position ${inputIndex || "1"}`;
      if (currentStep >= 2) {
        const index = parseInt(inputIndex || "1");
        displayNodes = nodes.filter((_, i) => i !== index);
      }
    }
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {displayNodes.map((node, index) => (
            <div key={`${index}-${node.value}`} className="flex items-center">
              <div className={`w-20 h-16 border-2 border-purple-500 ${
                selectedOperation.includes("Insert") && currentStep > 1 && index === 0 
                  ? 'bg-green-100 dark:bg-green-900 scale-110' 
                  : 'bg-purple-50 dark:bg-purple-900'
              } rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                isPlaying ? 'animate-bounce' : ''
              }`}>
                {node.value}
              </div>
              {node.next && index < displayNodes.length - 1 && (
                <div className="flex items-center mx-3">
                  <div className="w-8 h-0.5 bg-purple-500"></div>
                  <div className="w-0 h-0 border-l-4 border-l-purple-500 border-y-2 border-y-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {stepDescription && (
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{stepDescription}</p>
          </div>
        )}
      </div>
    );
  };

  const renderStackVisualization = () => {
    let stack = [1, 2, 3, 4];
    let stepDescription = "";
    
    if (selectedOperation === "Push" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Pushing value ${inputValue || "5"} onto stack`;
      if (currentStep >= 2) {
        stack = [...stack, parseInt(inputValue || "5")];
      }
    } else if (selectedOperation === "Pop" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Popping top element from stack`;
      if (currentStep >= 2) {
        stack = stack.slice(0, -1);
      }
    }
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-end h-64">
          {stack.map((value, index) => (
            <div
              key={`${index}-${value}`}
              className={`w-24 h-12 border-2 border-yellow-500 ${
                selectedOperation === "Push" && currentStep > 1 && index === stack.length - 1
                  ? 'bg-green-100 dark:bg-green-900 scale-110'
                  : selectedOperation === "Pop" && index === stack.length - 1
                  ? 'bg-red-100 dark:bg-red-900 animate-pulse'
                  : 'bg-yellow-50 dark:bg-yellow-900'
              } rounded-lg mb-1 flex items-center justify-center font-bold transition-all duration-500`}
            >
              {value}
            </div>
          ))}
          <div className="w-28 h-3 bg-gray-400 rounded mt-2"></div>
          <div className="text-sm text-muted-foreground mt-2">Stack Base</div>
        </div>
        
        {stepDescription && (
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{stepDescription}</p>
          </div>
        )}
      </div>
    );
  };

  const renderTreeVisualization = () => {
    const treeNodes = [
      { value: 50, level: 0, position: 4 },
      { value: 30, level: 1, position: 2 },
      { value: 70, level: 1, position: 6 },
      { value: 20, level: 2, position: 1 },
      { value: 40, level: 2, position: 3 },
      { value: 60, level: 2, position: 5 },
      { value: 80, level: 2, position: 7 }
    ];
    
    let stepDescription = "";
    if (selectedOperation === "Insert" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Inserting value ${inputValue || "25"} into BST`;
    } else if (selectedOperation === "Inorder Traversal" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Inorder Traversal - visiting nodes in order`;
    }
    
    return (
      <div className="space-y-6">
        <div className="relative h-64 w-full">
          {/* Tree structure */}
          <div className="absolute inset-0">
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="50%" y1="20%" x2="25%" y2="45%" stroke="rgb(16 185 129)" strokeWidth="2" />
              <line x1="50%" y1="20%" x2="75%" y2="45%" stroke="rgb(16 185 129)" strokeWidth="2" />
              <line x1="25%" y1="45%" x2="12.5%" y2="70%" stroke="rgb(16 185 129)" strokeWidth="2" />
              <line x1="25%" y1="45%" x2="37.5%" y2="70%" stroke="rgb(16 185 129)" strokeWidth="2" />
              <line x1="75%" y1="45%" x2="62.5%" y2="70%" stroke="rgb(16 185 129)" strokeWidth="2" />
              <line x1="75%" y1="45%" x2="87.5%" y2="70%" stroke="rgb(16 185 129)" strokeWidth="2" />
            </svg>
            
            {/* Nodes */}
            {treeNodes.map((node, index) => (
              <div
                key={node.value}
                className={`absolute w-12 h-12 border-2 border-emerald-500 ${
                  selectedOperation === "Inorder Traversal" && isPlaying && currentStep >= index
                    ? 'bg-emerald-200 dark:bg-emerald-800 scale-110'
                    : 'bg-emerald-50 dark:bg-emerald-900'
                } rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
                style={{
                  left: `${node.position * 12.5}%`,
                  top: `${node.level * 25 + 15}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {node.value}
              </div>
            ))}
          </div>
        </div>
        
        {stepDescription && (
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{stepDescription}</p>
          </div>
        )}
      </div>
    );
  };

  const renderGraphVisualization = () => {
    const nodes = [
      { id: 'A', x: 20, y: 20 },
      { id: 'B', x: 80, y: 30 }, 
      { id: 'C', x: 30, y: 70 },
      { id: 'D', x: 70, y: 80 }
    ];
    
    const edges = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'D', to: 'A' }
    ];
    
    let stepDescription = "";
    if (selectedOperation === "BFS" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Breadth-First Search traversal`;
    } else if (selectedOperation === "DFS" && isPlaying) {
      stepDescription = `Step ${currentStep + 1}: Depth-First Search traversal`;
    }
    
    return (
      <div className="space-y-6">
        <div className="relative w-full h-64 bg-muted/20 rounded-lg">
          <svg className="absolute inset-0 w-full h-full">
            {edges.map((edge, index) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="rgb(239 68 68)"
                  strokeWidth="3"
                  className={`${isPlaying && currentStep >= index ? 'animate-pulse' : ''}`}
                />
              );
            })}
          </svg>
          
          {nodes.map((node, index) => (
            <div
              key={node.id}
              className={`absolute w-14 h-14 border-3 border-red-500 ${
                (selectedOperation === "BFS" || selectedOperation === "DFS") && isPlaying && currentStep >= index
                  ? 'bg-red-200 dark:bg-red-800 scale-125'
                  : 'bg-red-50 dark:bg-red-900'  
              } rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                isPlaying ? 'animate-bounce' : ''
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {node.id}
            </div>
          ))}
        </div>
        
        {stepDescription && (
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{stepDescription}</p>
          </div>
        )}
      </div>
    );
  };

  const renderVisualization = () => {
    if (!selectedOperation) {
      return (
        <div className="text-center space-y-4">
          <div className={`mx-auto p-6 rounded-full ${currentTopic?.color} opacity-20`}>
            <currentTopic.icon className="h-20 w-20 text-black" />
          </div>
          <h3 className="text-2xl font-semibold">Select an Operation</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose an operation from the dropdown above to see its step-by-step visualization.
          </p>
        </div>
      );
    }

    let visualizationContent;
    switch (selectedTopic) {
      case 'arrays':
        visualizationContent = renderArrayVisualization();
        break;
      case 'linked-list':
        visualizationContent = renderLinkedListVisualization();
        break;
      case 'stack':
        visualizationContent = renderStackVisualization();
        break;
      case 'trees':
        visualizationContent = renderTreeVisualization();
        break;
      case 'graphs':
        visualizationContent = renderGraphVisualization();
        break;
      default:
        visualizationContent = (
          <div className="text-center space-y-4">
            <div className={`mx-auto p-4 rounded-lg ${currentTopic?.color}`}>
              <currentTopic.icon className="h-16 w-16 text-white" />
            </div>
            <p className="text-lg font-medium">
              {selectedOperation} Visualization
            </p>
            <p className="text-sm text-muted-foreground">
              Interactive visualization for {currentTopic?.title}
            </p>
            {isPlaying && (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{animationDelay: '0.2s'}}></div>
                <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{animationDelay: '0.4s'}}></div>
              </div>
            )}
          </div>
        );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{currentTopic?.title} - {selectedOperation}</h3>
          {selectedSubtopic && currentTopic?.subtopics && (
            <Badge variant="outline" className="mb-4">
              {currentTopic.subtopics[selectedSubtopic]}
            </Badge>
          )}
        </div>
        
        <div className="bg-muted/30 rounded-lg p-8 min-h-[300px] flex items-center justify-center border-2 border-dashed border-muted">
          {visualizationContent}
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={handleStepBack} disabled={currentStep === 0}>
            <StepBack className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleStepForward} disabled={currentStep === totalSteps - 1}>
            <StepForward className="h-4 w-4 mr-1" />
            Next
          </Button>
          <Button variant="outline" size="sm" onClick={handlePlay} disabled={!selectedOperation}>
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4">
          <span className="text-sm">Speed:</span>
          <input
            type="range"
            min="10"
            max="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm">{animationSpeed}%</span>
        </div>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
      </div>
    );
  };

  const needsIndexInput = ["Insert", "Delete", "Search", "Update", "Insert at Position"].includes(selectedOperation);
  const needsValueInput = ["Insert", "Update", "Search", "Push", "Enqueue"].includes(selectedOperation);

  const getComplexityInfo = () => {
    const complexities: any = {
      arrays: {
        Insert: { time: "O(n)", space: "O(1)" },
        Delete: { time: "O(n)", space: "O(1)" },
        Search: { time: "O(n)", space: "O(1)" },
        Update: { time: "O(1)", space: "O(1)" }
      },
      "linked-list": {
        "Insert at Head": { time: "O(1)", space: "O(1)" },
        "Insert at Tail": { time: "O(n)", space: "O(1)" },
        "Delete Node": { time: "O(n)", space: "O(1)" }
      },
      stack: {
        Push: { time: "O(1)", space: "O(1)" },
        Pop: { time: "O(1)", space: "O(1)" }
      }
    };

    return complexities[selectedTopic]?.[selectedOperation] || { time: "O(n)", space: "O(1)" };
  };

  const getPseudoCode = () => {
    const pseudoCodes: any = {
      arrays: {
        Insert: `
function insertAtIndex(arr, index, value):
    if index > arr.length:
        return "Index out of bounds"
    
    // Shift elements to the right
    for i from arr.length - 1 down to index:
        arr[i + 1] = arr[i]
    
    // Insert the new value
    arr[index] = value
    return arr`,
        
        Search: `
function linearSearch(arr, target):
    for i from 0 to arr.length - 1:
        if arr[i] == target:
            return i
    return -1  // Not found`,
        
        Sort: `
function bubbleSort(arr):
    n = arr.length
    for i from 0 to n - 1:
        for j from 0 to n - i - 2:
            if arr[j] > arr[j + 1]:
                swap(arr[j], arr[j + 1])
    return arr`
      },
      
      "linked-list": {
        "Insert at Head": `
function insertAtHead(head, value):
    newNode = new Node(value)
    newNode.next = head
    return newNode  // New head`,
        
        "Delete Node": `
function deleteNode(head, index):
    if index == 0:
        return head.next
    
    current = head
    for i from 0 to index - 2:
        current = current.next
    
    current.next = current.next.next
    return head`
      },
      
      stack: {
        Push: `
function push(stack, value):
    stack.top = stack.top + 1
    stack.items[stack.top] = value`,
        
        Pop: `
function pop(stack):
    if stack.top < 0:
        return "Stack underflow"
    
    value = stack.items[stack.top]
    stack.top = stack.top - 1
    return value`
      }
    };

    return pseudoCodes[selectedTopic]?.[selectedOperation] || "// Select an operation to view pseudocode";
  };

  const getLanguageCode = (language: string) => {
    const codes: any = {
      arrays: {
        Insert: {
          javascript: `
// JavaScript - Array Insert
function insertAtIndex(arr, index, value) {
    if (index > arr.length) return "Index out of bounds";
    arr.splice(index, 0, value);
    return arr;
}`,
          python: `
# Python - Array Insert  
def insert_at_index(arr, index, value):
    if index > len(arr):
        return "Index out of bounds"
    arr.insert(index, value)
    return arr`,
          java: `
// Java - Array Insert
public static int[] insertAtIndex(int[] arr, int index, int value) {
    if (index > arr.length) return arr;
    int[] newArr = new int[arr.length + 1];
    for (int i = 0; i < index; i++) {
        newArr[i] = arr[i];
    }
    newArr[index] = value;
    for (int i = index; i < arr.length; i++) {
        newArr[i + 1] = arr[i];
    }
    return newArr;
}`,
          cpp: `
// C++ - Array Insert
vector<int> insertAtIndex(vector<int>& arr, int index, int value) {
    if (index > arr.size()) return arr;
    arr.insert(arr.begin() + index, value);
    return arr;
}`
        }
      }
    };

    return codes[selectedTopic]?.[selectedOperation]?.[language] || `// ${language} code for ${selectedOperation} will be shown here`;
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-1" />
            Home
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Button variant="ghost" size="sm" onClick={() => navigate("/dsa-visualization")}>
            <span className="text-sm text-muted-foreground">DSA Visualization</span>
          </Button>
          {selectedTopic && (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{currentTopic?.title}</span>
            </>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">DSA Visualization</h1>
          <p className="text-muted-foreground">
            Interactive visualizations for Data Structures and Algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-3">
                {Object.entries(topics).map(([topicId, topic]) => (
                  <Button
                    key={topicId}
                    variant={selectedTopic === topicId ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleTopicSelect(topicId)}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${topic.color}`}>
                      <topic.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{topic.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {topic.operations.length} operations
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${currentTopic?.color}`}>
                      <currentTopic.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{currentTopic?.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {currentTopic?.operations.length} operations available
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configure Operation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentTopic?.subtopics && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Type:</Label>
                    <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currentTopic.subtopics).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select Operation:</Label>
                  <Select value={selectedOperation} onValueChange={setSelectedOperation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose operation..." />
                    </SelectTrigger>
                    <SelectContent>
                      {currentTopic?.operations.map((operation) => (
                        <SelectItem key={operation} value={operation}>{operation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(needsIndexInput || needsValueInput) && (
                  <div className="grid grid-cols-2 gap-4">
                    {needsIndexInput && (
                      <div className="space-y-2">
                        <Label htmlFor="index">Index</Label>
                        <Input
                          id="index"
                          type="number"
                          placeholder="0"
                          value={inputIndex}
                          onChange={(e) => setInputIndex(e.target.value)}
                        />
                      </div>
                    )}
                    {needsValueInput && (
                      <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <Input
                          id="value"
                          type="number"
                          placeholder="10"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Visualization</CardTitle>
                  <Button onClick={handlePlay} size="sm" disabled={!selectedOperation}>
                    {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                  {renderVisualization()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Algorithm Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="complexity" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="complexity">Complexity</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="pseudocode">Pseudocode</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="complexity" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Time Complexity</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Average Case:</span>
                            <Badge variant="default">{getComplexityInfo().time}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Space Complexity</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Space Used:</span>
                            <Badge variant="secondary">{getComplexityInfo().space}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="description">
                    <div className="prose prose-sm max-w-none">
                      <p>
                        {selectedOperation 
                          ? `The ${selectedOperation} operation on ${currentTopic?.title} involves manipulating the data structure according to specific rules and constraints. This operation is fundamental for understanding how ${currentTopic?.title.toLowerCase()} work in computer science.`
                          : "Select an operation to see its detailed description, use cases, and implementation notes."
                        }
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pseudocode">
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <pre className="whitespace-pre-wrap">{getPseudoCode()}</pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code">
                    <Tabs defaultValue="javascript" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="java">Java</TabsTrigger>
                        <TabsTrigger value="cpp">C++</TabsTrigger>
                      </TabsList>
                      
                      {['javascript', 'python', 'java', 'cpp'].map((lang) => (
                        <TabsContent key={lang} value={lang}>
                          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                            <pre className="whitespace-pre-wrap">{getLanguageCode(lang)}</pre>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAVisualization;
