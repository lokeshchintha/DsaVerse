
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DSAArena from "./pages/DSAArena";
import DSAProblemSolver from "./pages/DSAProblemSolver";
import DSAProjectGenerator from "./pages/DSAProjectGenerator";
import LearningRoadmap from "./pages/LearningRoadmap";
import Progress from "./pages/Progress";
import AIMentor from "./pages/AIMentor";
import InterviewSimulator from "./pages/InterviewSimulator";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SmartHints from "./pages/SmartHints";
import PatternDetector from "./pages/PatternDetector";
import AITools from "./pages/AITools";
import CodeAnalyzer from "./pages/CodeAnalyzer";
import CodeExecutionVisualizer from "./pages/CodeExecutionVisualizer";
import CodeLanguageConverter from "./pages/CodeLanguageConverter";
import SystemDesignPlayground from "./pages/SystemDesignPlayground";
import CoreModules from "./pages/CoreModules";
import Games from "./pages/Games";
import CodeTetris from "./pages/games/CodeTetris";
import BugHuntArena from "./pages/games/BugHuntArena";
import DSABossBattles from "./pages/games/DSABossBattles";
import AlgorithmRacing from "./pages/games/AlgorithmRacing";
import CodeEscape from "./pages/games/CodeEscape";
import NeuralNetworkWars from "./pages/games/NeuralNetworkWars";
import CodeMaze from "./pages/games/CodeMaze";
import StackAttack from "./pages/games/StackAttack";
import RecursionRunner from "./pages/games/RecursionRunner";
import SortingShowdown from "./pages/games/SortingShowdown";
import BinaryBlitz from "./pages/games/BinaryBlitz";
import GraphNavigator from "./pages/games/GraphNavigator";
import RegexRider from "./pages/games/RegexRider";
import SoloPuzzles from "./pages/games/SoloPuzzles";
import CodeGolf from "./pages/games/CodeGolf";
import OptimizationChallenges from "./pages/games/OptimizationChallenges";
import ClashOfCode from "./pages/games/ClashOfCode";
import BotProgramming from "./pages/games/BotProgramming";
import GlobalContests from "./pages/games/GlobalContests";
import DummyGame from "./pages/games/DummyGame";
import WeeklyContest from "./pages/WeeklyContest";
import PeerBattle from "./pages/PeerBattle";
import XPStore from "./pages/XPStore";
import AptitudeGrid from "./pages/AptitudeGrid";
import CrossLanguageChallenge from "./pages/CrossLanguageChallenge";
import CodeRewriteChallenge from "./pages/CodeRewriteChallenge";
import AntiCheatEngine from "./pages/AntiCheatEngine";
import BehavioralAnalytics from "./pages/BehavioralAnalytics";
import CodeDebuggerPage from "./pages/CodeDebuggerPage";
import DSAVisualization from "./pages/DSAVisualization";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dsa-arena" element={<DSAArena />} />
            <Route path="/dsa-arena/problem/:id" element={<DSAProblemSolver />} />
            <Route path="/dsa-problem-solver" element={<DSAProblemSolver />} />
            <Route path="/dsa-project-generator" element={<DSAProjectGenerator />} />
            <Route path="/dsa-visualization" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/:topic" element={<DSAVisualization />} />
            
            {/* Individual DSA Topic Routes */}
            <Route path="/dsa-visualization/arrays" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/strings" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/linked-list" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/linked-list/:subtopic" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/stack" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/queue" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/trees" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/trees/:subtopic" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/graphs" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/graphs/:subtopic" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/recursion" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/backtracking" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/dynamic-programming" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/searching" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/sorting" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/greedy" element={<DSAVisualization />} />
            <Route path="/dsa-visualization/bit-manipulation" element={<DSAVisualization />} />
            
            <Route path="/learning-roadmap" element={<LearningRoadmap />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/ai-mentor" element={<AIMentor />} />
            <Route path="/interview-simulator" element={<InterviewSimulator />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/smart-hints" element={<SmartHints />} />
            <Route path="/pattern-detector" element={<PatternDetector />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/code-analyzer" element={<CodeAnalyzer />} />
            <Route path="/code-execution-visualizer" element={<CodeExecutionVisualizer />} />
            <Route path="/code-language-converter" element={<CodeLanguageConverter />} />
            <Route path="/system-design-playground" element={<SystemDesignPlayground />} />
            <Route path="/core-modules" element={<CoreModules />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/code-tetris" element={<CodeTetris />} />
            <Route path="/games/bug-hunt-arena" element={<BugHuntArena />} />
            <Route path="/games/dsa-boss-battles" element={<DSABossBattles />} />
            <Route path="/games/algorithm-racing" element={<AlgorithmRacing />} />
            <Route path="/games/code-escape" element={<CodeEscape />} />
            <Route path="/games/neural-network-wars" element={<NeuralNetworkWars />} />
            <Route path="/games/code-maze" element={<CodeMaze />} />
            <Route path="/games/stack-attack" element={<StackAttack />} />
            <Route path="/games/recursion-runner" element={<RecursionRunner />} />
            <Route path="/games/sorting-showdown" element={<SortingShowdown />} />
            <Route path="/games/binary-blitz" element={<BinaryBlitz />} />
            <Route path="/games/graph-navigator" element={<GraphNavigator />} />
            <Route path="/games/regex-rider" element={<RegexRider />} />
            <Route path="/games/solo-puzzles" element={<SoloPuzzles />} />
            <Route path="/games/code-golf" element={<CodeGolf />} />
            <Route path="/games/optimization-challenges" element={<OptimizationChallenges />} />
            <Route path="/games/clash-of-code" element={<ClashOfCode />} />
            <Route path="/games/bot-programming" element={<BotProgramming />} />
            <Route path="/games/global-contests" element={<GlobalContests />} />
            <Route path="/games/dummy-game" element={<DummyGame />} />
            <Route path="/weekly-contest" element={<WeeklyContest />} />
            <Route path="/peer-battle" element={<PeerBattle />} />
            <Route path="/xp-store" element={<XPStore />} />
            <Route path="/aptitude-grid" element={<AptitudeGrid />} />
            <Route path="/cross-language-challenge" element={<CrossLanguageChallenge />} />
            <Route path="/code-rewrite-challenge" element={<CodeRewriteChallenge />} />
            <Route path="/anti-cheat-engine" element={<AntiCheatEngine />} />
            <Route path="/behavioral-analytics" element={<BehavioralAnalytics />} />
            <Route path="/code-debugger" element={<CodeDebuggerPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
