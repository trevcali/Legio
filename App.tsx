import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { PredictionCard } from "./components/prediction-card";
import { TrendingPredictions } from "./components/trending-predictions";
import { RegionMap } from "./components/region-map";
import { PredictionDetails } from "./components/prediction-details";
import { Filters } from "./components/filters";
import { DailyBrief } from "./components/daily-brief";
import { Input } from "./components/ui/input";
import { Search, Globe2 } from "lucide-react";

// Mock data
const mockPredictions = [
  {
    id: "7",
    title: "Iran war ends by March 31, 2026",
    description: "Formal cessation of hostilities and peace agreement signed",
    probability: 23,
    category: "conflict",
    region: "Middle East",
    deadline: "Mar 31, 2026",
    trend: "down" as const,
    predictors: 5342,
    created: "Jan 5, 2026",
    longDescription: "This prediction tracks whether the ongoing conflict involving Iran will formally end by March 31, 2026. Resolution requires a signed peace agreement or formal cessation of hostilities declaration by all major parties involved, with verification by international observers.",
    historicalData: [
      { date: "Jan", probability: 31 },
      { date: "Feb", probability: 27 },
      { date: "Mar", probability: 23 },
    ],
    factors: [
      { text: "Ongoing military operations showing no signs of de-escalation", impact: "negative" as const },
      { text: "Regional powers have conflicting interests in the outcome", impact: "negative" as const },
      { text: "Economic pressure mounting on all parties involved", impact: "positive" as const },
      { text: "No major diplomatic breakthrough in recent negotiations", impact: "negative" as const },
      { text: "International mediation efforts remain active", impact: "positive" as const },
    ],
  },
  {
    id: "1",
    title: "China will conduct military exercises near Taiwan in Q2 2026",
    description: "Large-scale PLA naval and air exercises within 100nm of Taiwan's coast",
    probability: 78,
    category: "conflict",
    region: "East Asia",
    deadline: "Jun 30, 2026",
    trend: "up" as const,
    predictors: 2847,
    created: "Jan 15, 2026",
    longDescription: "Following recent tensions in the Taiwan Strait, analysts are forecasting increased Chinese military activity in the region. This prediction tracks whether the People's Liberation Army will conduct significant military exercises (involving at least 50 aircraft and 10 naval vessels) within 100 nautical miles of Taiwan's coast during the second quarter of 2026.",
    historicalData: [
      { date: "Jan", probability: 65 },
      { date: "Feb", probability: 72 },
      { date: "Mar", probability: 78 },
    ],
    factors: [
      { text: "Recent diplomatic tensions between US and China over semiconductor exports", impact: "positive" as const },
      { text: "Upcoming Taiwanese local elections scheduled for May", impact: "positive" as const },
      { text: "Japan strengthening defense cooperation with Taiwan", impact: "positive" as const },
      { text: "International pressure and economic concerns may moderate response", impact: "negative" as const },
    ],
  },
  {
    id: "2",
    title: "Russia-Ukraine ceasefire agreement reached by end of 2026",
    description: "Both parties sign formal ceasefire with international monitoring",
    probability: 34,
    category: "conflict",
    region: "Europe",
    deadline: "Dec 31, 2026",
    trend: "down" as const,
    predictors: 4521,
    created: "Feb 3, 2026",
    longDescription: "This prediction examines the likelihood of a formal ceasefire agreement between Russia and Ukraine by the end of 2026. The agreement must include international monitoring mechanisms and be signed by official representatives of both governments. Recent diplomatic efforts have shown mixed results.",
    historicalData: [
      { date: "Jan", probability: 42 },
      { date: "Feb", probability: 38 },
      { date: "Mar", probability: 34 },
    ],
    factors: [
      { text: "Ongoing territorial disputes remain unresolved", impact: "negative" as const },
      { text: "War fatigue in both countries increasing", impact: "positive" as const },
      { text: "Western military support for Ukraine remains strong", impact: "negative" as const },
      { text: "Economic pressures mounting on both sides", impact: "positive" as const },
    ],
  },
  {
    id: "3",
    title: "India surpasses China in annual GDP growth rate in 2026",
    description: "India's GDP growth exceeds China's for full calendar year 2026",
    probability: 68,
    category: "trade",
    region: "South Asia",
    deadline: "Dec 31, 2026",
    trend: "up" as const,
    predictors: 3214,
    created: "Jan 8, 2026",
    longDescription: "Economic forecasters are closely watching whether India's GDP growth rate will surpass China's in 2026, marking a potential shift in Asian economic dynamics. This prediction resolves based on official World Bank or IMF annual GDP growth figures for calendar year 2026.",
    historicalData: [
      { date: "Jan", probability: 58 },
      { date: "Feb", probability: 63 },
      { date: "Mar", probability: 68 },
    ],
    factors: [
      { text: "India's young demographic dividend and digital economy boom", impact: "positive" as const },
      { text: "China facing property market crisis and demographic challenges", impact: "positive" as const },
      { text: "Manufacturing shift from China to India accelerating", impact: "positive" as const },
      { text: "Infrastructure gaps still limit India's growth potential", impact: "negative" as const },
    ],
  },
  {
    id: "4",
    title: "Iran and Saudi Arabia establish formal diplomatic relations",
    description: "Full embassy reopening and ambassador exchange completed",
    probability: 56,
    category: "diplomacy",
    region: "Middle East",
    deadline: "Sep 30, 2026",
    trend: "stable" as const,
    predictors: 2156,
    created: "Feb 12, 2026",
    longDescription: "Following the Chinese-brokered détente, this prediction tracks whether Iran and Saudi Arabia will fully restore diplomatic relations with embassy reopenings and ambassador exchanges by September 2026.",
    historicalData: [
      { date: "Jan", probability: 54 },
      { date: "Feb", probability: 55 },
      { date: "Mar", probability: 56 },
    ],
    factors: [
      { text: "Chinese mediation efforts showing positive results", impact: "positive" as const },
      { text: "Regional security concerns encouraging cooperation", impact: "positive" as const },
      { text: "Yemen conflict remains major point of contention", impact: "negative" as const },
      { text: "Domestic hardliners on both sides opposing rapprochement", impact: "negative" as const },
    ],
  },
  {
    id: "5",
    title: "US imposes new sanctions on Chinese tech companies by Q3 2026",
    description: "Major semiconductor or AI-related sanctions announced",
    probability: 82,
    category: "sanctions",
    region: "North America",
    deadline: "Sep 30, 2026",
    trend: "up" as const,
    predictors: 3891,
    created: "Jan 22, 2026",
    longDescription: "This tracks whether the United States will implement significant new export controls or sanctions targeting Chinese technology companies in the semiconductor, artificial intelligence, or quantum computing sectors by the third quarter of 2026.",
    historicalData: [
      { date: "Jan", probability: 75 },
      { date: "Feb", probability: 79 },
      { date: "Mar", probability: 82 },
    ],
    factors: [
      { text: "Bipartisan support in Congress for tech restrictions on China", impact: "positive" as const },
      { text: "National security concerns over AI and chip technology", impact: "positive" as const },
      { text: "Recent Chinese advances in semiconductor manufacturing", impact: "positive" as const },
      { text: "Business lobbying against disrupting supply chains", impact: "negative" as const },
    ],
  },
  {
    id: "6",
    title: "North Korea conducts nuclear test in 2026",
    description: "Confirmed underground nuclear detonation detected",
    probability: 41,
    category: "conflict",
    region: "East Asia",
    deadline: "Dec 31, 2026",
    trend: "stable" as const,
    predictors: 2634,
    created: "Feb 1, 2026",
    longDescription: "Intelligence analysts are monitoring whether North Korea will conduct its first nuclear test since 2017. This prediction resolves positive if seismic activity consistent with a nuclear detonation is detected and confirmed by international monitoring agencies.",
    historicalData: [
      { date: "Jan", probability: 43 },
      { date: "Feb", probability: 40 },
      { date: "Mar", probability: 41 },
    ],
    factors: [
      { text: "DPRK seeking leverage in potential negotiations", impact: "positive" as const },
      { text: "Recent missile test program showing technical advances", impact: "positive" as const },
      { text: "China and Russia pressuring against nuclear testing", impact: "negative" as const },
      { text: "Severe economic costs from additional UN sanctions", impact: "negative" as const },
    ],
  },
];

const trendingData = [
  {
    id: "1",
    title: "China military exercises near Taiwan",
    probability: 78,
    change: 13,
    category: "conflict",
  },
  {
    id: "5",
    title: "US tech sanctions on China",
    probability: 82,
    change: 7,
    category: "sanctions",
  },
  {
    id: "3",
    title: "India GDP growth exceeds China",
    probability: 68,
    change: 10,
    category: "trade",
  },
];

const regionData = [
  { name: "East Asia", activeCount: 24, avgProbability: 62, highRisk: 8 },
  { name: "Europe", activeCount: 18, avgProbability: 45, highRisk: 5 },
  { name: "Middle East", activeCount: 31, avgProbability: 58, highRisk: 12 },
  { name: "North America", activeCount: 15, avgProbability: 51, highRisk: 3 },
  { name: "South Asia", activeCount: 19, avgProbability: 49, highRisk: 6 },
  { name: "Africa", activeCount: 22, avgProbability: 44, highRisk: 7 },
];

export default function App() {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [timeframeFilter, setTimeframeFilter] = useState("all");

  const handleViewDetails = (id: string) => {
    setSelectedPrediction(id);
  };

  const handleRegionClick = (region: string) => {
    setRegionFilter(region);
  };

  const resetFilters = () => {
    setCategoryFilter("all");
    setRegionFilter("all");
    setTimeframeFilter("all");
  };

  const filteredPredictions = mockPredictions.filter((pred) => {
    const matchesSearch = pred.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pred.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || pred.category === categoryFilter;
    const matchesRegion = regionFilter === "all" || pred.region === regionFilter;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const predictionDetails = selectedPrediction
    ? mockPredictions.find((p) => p.id === selectedPrediction)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl">Legio</h1>
                <p className="text-sm text-muted-foreground">Geopolitical Intelligence & Predictions</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {mockPredictions.length} Active Predictions
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search predictions..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Filters
                selectedCategory={categoryFilter}
                selectedRegion={regionFilter}
                selectedTimeframe={timeframeFilter}
                onCategoryChange={setCategoryFilter}
                onRegionChange={setRegionFilter}
                onTimeframeChange={setTimeframeFilter}
                onReset={resetFilters}
              />
            </div>

            {/* Predictions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid gap-6">
                  {filteredPredictions.map((prediction) => (
                    <PredictionCard
                      key={prediction.id}
                      {...prediction}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <TrendingPredictions
                  predictions={trendingData}
                  onSelect={handleViewDetails}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <RegionMap regions={regionData} onRegionClick={handleRegionClick} />
            
            {regionFilter !== "all" && (
              <div className="mt-6">
                <h2 className="text-xl mb-4">
                  Predictions in {regionFilter}
                </h2>
                <div className="grid gap-6">
                  {filteredPredictions.map((prediction) => (
                    <PredictionCard
                      key={prediction.id}
                      {...prediction}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrendingPredictions
                predictions={trendingData}
                onSelect={handleViewDetails}
              />
              <div className="space-y-6">
                {trendingData.map((item) => {
                  const fullPrediction = mockPredictions.find((p) => p.id === item.id);
                  if (!fullPrediction) return null;
                  return (
                    <PredictionCard
                      key={fullPrediction.id}
                      {...fullPrediction}
                      onViewDetails={handleViewDetails}
                    />
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <DailyBrief />
          </TabsContent>
        </Tabs>
      </main>

      {/* Prediction Details Modal */}
      <PredictionDetails
        prediction={predictionDetails || null}
        onClose={() => setSelectedPrediction(null)}
      />
    </div>
  );
}
