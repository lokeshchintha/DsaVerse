
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Navbar } from "@/components/Navbar";
import { Brain, Zap, Target, Trophy, Play, RotateCcw } from "lucide-react";

const NeuralNetworkWars = () => {
  const [gameState, setGameState] = useState<"menu" | "training" | "battle" | "results">("menu");
  const [networkLayers, setNetworkLayers] = useState([4, 8, 4, 2]);
  const [learningRate, setLearningRate] = useState([0.01]);
  const [epochs, setEpochs] = useState([100]);
  const [playerAccuracy, setPlayerAccuracy] = useState(0);
  const [aiAccuracy, setAIAccuracy] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [battleRound, setBattleRound] = useState(0);

  const challenges = [
    {
      name: "XOR Gate",
      description: "Train a network to learn the XOR function",
      difficulty: "Easy",
      dataset: "Boolean logic",
      targetAccuracy: 95
    },
    {
      name: "Iris Classification",
      description: "Classify iris flowers into 3 species",
      difficulty: "Medium", 
      dataset: "Flower measurements",
      targetAccuracy: 90
    },
    {
      name: "MNIST Digits",
      description: "Recognize handwritten digits 0-9",
      difficulty: "Hard",
      dataset: "28x28 images",
      targetAccuracy: 85
    }
  ];

  const [selectedChallenge, setSelectedChallenge] = useState(0);

  const startTraining = () => {
    setGameState("training");
    setTrainingProgress(0);
    
    // Simulate training process
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGameState("battle");
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const simulateBattle = () => {
    setBattleRound(0);
    const rounds = 5;
    
    const battleInterval = setInterval(() => {
      setBattleRound(prev => {
        if (prev >= rounds) {
          clearInterval(battleInterval);
          setGameState("results");
          return prev;
        }
        
        // Simulate accuracy based on network parameters
        const baseAccuracy = Math.random() * 30 + 50;
        const learningBonus = (0.1 - learningRate[0]) * 100;
        const epochBonus = epochs[0] / 10;
        const layerBonus = networkLayers.reduce((a, b) => a + b) / 10;
        
        const newPlayerAccuracy = Math.min(100, baseAccuracy + learningBonus + epochBonus + layerBonus);
        const newAIAccuracy = Math.random() * 40 + 60;
        
        setPlayerAccuracy(newPlayerAccuracy);
        setAIAccuracy(newAIAccuracy);
        
        return prev + 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (gameState === "battle" && battleRound === 0) {
      simulateBattle();
    }
  }, [gameState]);

  const addLayer = () => {
    if (networkLayers.length < 6) {
      setNetworkLayers([...networkLayers.slice(0, -1), 4, networkLayers[networkLayers.length - 1]]);
    }
  };

  const removeLayer = () => {
    if (networkLayers.length > 3) {
      setNetworkLayers([networkLayers[0], ...networkLayers.slice(2)]);
    }
  };

  const NetworkVisualizer = () => (
    <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg overflow-x-auto">
      {networkLayers.map((neurons, layerIndex) => (
        <div key={layerIndex} className="flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-2">
            {layerIndex === 0 ? "Input" : 
             layerIndex === networkLayers.length - 1 ? "Output" : 
             `Hidden ${layerIndex}`}
          </div>
          <div className="space-y-2">
            {Array(neurons).fill(0).map((_, neuronIndex) => (
              <div
                key={neuronIndex}
                className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
              />
            ))}
          </div>
          {layerIndex < networkLayers.length - 1 && (
            <div className="flex-1 w-8 border-t-2 border-dashed border-gray-600 mx-4" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Neural Network Wars 🧠
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Design, train, and battle neural networks! Optimize architectures and hyperparameters to defeat AI opponents.
          </p>
        </div>

        {gameState === "menu" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all ${
                    selectedChallenge === index ? 'ring-2 ring-purple-500 bg-purple-900/20' : 'hover:bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedChallenge(index)}
                >
                  <CardHeader>
                    <CardTitle className="text-white">{challenge.name}</CardTitle>
                    <Badge variant="outline" className="bg-purple-500/20 text-purple-300">
                      {challenge.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-2">{challenge.description}</p>
                    <p className="text-purple-400 text-xs">Dataset: {challenge.dataset}</p>
                    <p className="text-green-400 text-xs">Target: {challenge.targetAccuracy}% accuracy</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  Network Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <NetworkVisualizer />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">Layer Configuration</h4>
                    <div className="flex gap-2 mb-4">
                      <Button onClick={addLayer} size="sm" disabled={networkLayers.length >= 6}>
                        Add Layer
                      </Button>
                      <Button onClick={removeLayer} size="sm" disabled={networkLayers.length <= 3}>
                        Remove Layer
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {networkLayers.map((neurons, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-300">Layer {index + 1}:</span>
                          <span className="text-white">{neurons} neurons</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-4">Hyperparameters</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 text-sm">Learning Rate: {learningRate[0]}</label>
                        <Slider
                          value={learningRate}
                          onValueChange={setLearningRate}
                          min={0.001}
                          max={0.1}
                          step={0.001}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm">Epochs: {epochs[0]}</label>
                        <Slider
                          value={epochs}
                          onValueChange={setEpochs}
                          min={50}
                          max={500}
                          step={10}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={startTraining} size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Play className="h-5 w-5 mr-2" />
                  Start Training
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "training" && (
          <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-white">Training Neural Network...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-spin">🧠</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Training on {challenges[selectedChallenge].name}
                </h3>
                <p className="text-gray-300">{challenges[selectedChallenge].description}</p>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Training Progress</span>
                  <span className="text-white">{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} className="h-4" />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-800/50 rounded">
                  <div className="text-2xl font-bold text-blue-400">{epochs[0]}</div>
                  <div className="text-sm text-gray-400">Epochs</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded">
                  <div className="text-2xl font-bold text-green-400">{learningRate[0]}</div>
                  <div className="text-sm text-gray-400">Learning Rate</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded">
                  <div className="text-2xl font-bold text-purple-400">{networkLayers.length}</div>
                  <div className="text-sm text-gray-400">Layers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "battle" && (
          <div className="space-y-6">
            <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white text-center">Neural Network Battle!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Your Network</h3>
                    <div className="text-3xl font-bold text-white mb-2">{playerAccuracy.toFixed(1)}%</div>
                    <Progress value={playerAccuracy} className="h-3" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-xl font-bold text-red-400 mb-2">AI Opponent</h3>
                    <div className="text-3xl font-bold text-white mb-2">{aiAccuracy.toFixed(1)}%</div>
                    <Progress value={aiAccuracy} className="h-3" />
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <div className="text-lg text-gray-300">Battle Round: {battleRound}/5</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "results" && (
          <Card className="bg-black/60 backdrop-blur-lg border-purple-500/50">
            <CardHeader>
              <CardTitle className={`text-2xl text-center ${playerAccuracy > aiAccuracy ? 'text-green-400' : 'text-red-400'}`}>
                {playerAccuracy > aiAccuracy ? 'Victory!' : 'Defeat!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-8xl">
                {playerAccuracy > aiAccuracy ? '🏆' : '💔'}
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-400 font-semibold">Your Network</h4>
                  <div className="text-2xl font-bold text-white">{playerAccuracy.toFixed(1)}%</div>
                </div>
                <div className="p-4 bg-red-900/30 rounded-lg">
                  <h4 className="text-red-400 font-semibold">AI Opponent</h4>
                  <div className="text-2xl font-bold text-white">{aiAccuracy.toFixed(1)}%</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setGameState("menu")} className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Battle
                </Button>
                <Button onClick={startTraining} variant="outline" className="flex-1">
                  Retrain Network
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NeuralNetworkWars;
