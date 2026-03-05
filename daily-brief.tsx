import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { AlertCircle, TrendingUp, Shield, Coins, Users, Globe } from "lucide-react";

interface AnalysisSection {
  title: string;
  region: string;
  severity: "low" | "medium" | "high" | "critical";
  icon: React.ReactNode;
  summary: string;
  keyPoints: string[];
  outlook: string;
}

export function DailyBrief() {
  const today = new Date().toLocaleDateString("en-US", { 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  });

  const sections: AnalysisSection[] = [
    {
      title: "Taiwan Strait Tensions",
      region: "East Asia",
      severity: "high",
      icon: <Shield className="w-5 h-5" />,
      summary: "PLA military activity near Taiwan has increased 40% over the past week, with multiple air incursions into Taiwan's ADIZ. US naval assets have repositioned in response.",
      keyPoints: [
        "23 PLA aircraft crossed the median line in the past 48 hours",
        "USS Ronald Reagan carrier group moved to Philippine Sea",
        "Taiwan raised alert level to Orange at three airbases",
        "Japan expressing concern through diplomatic channels",
      ],
      outlook: "Escalation risk remains elevated through Q2 2026. Watch for Chinese responses to upcoming Taiwan local elections and US semiconductor export controls."
    },
    {
      title: "Russia-Ukraine Stalemate",
      region: "Europe",
      severity: "medium",
      icon: <AlertCircle className="w-5 h-5" />,
      summary: "Ground operations remain largely static along the eastern front. Diplomatic efforts show marginal progress with Turkey mediating renewed talks.",
      keyPoints: [
        "Artillery exchanges continue at 2023 levels with no major territorial changes",
        "Turkish-mediated talks scheduled for March 15 in Istanbul",
        "EU considering 14th sanctions package targeting oil transshipment",
        "Ukraine reporting improved air defense success rate (78%)",
      ],
      outlook: "Ceasefire unlikely in near term. Both sides preparing for potential spring offensive. Economic pressures mounting but not yet decisive."
    },
    {
      title: "Middle East Realignment",
      region: "Middle East",
      severity: "medium",
      icon: <Globe className="w-5 h-5" />,
      summary: "Iran-Saudi diplomatic normalization continues despite tensions. Regional security architecture shifting with new trilateral defense agreements.",
      keyPoints: [
        "Iran-Saudi Arabia foreign ministers meeting in Riyadh next week",
        "Yemen ceasefire holding for 6th consecutive month",
        "Israel-Gulf states defense cooperation expanding quietly",
        "Iran's nuclear program advancing; IAEA expresses concerns",
      ],
      outlook: "Regional détente fragile but progressing. Iranian nuclear issue remains potential flashpoint. Watch for US response to enrichment levels."
    },
    {
      title: "US-China Tech Competition",
      region: "Global",
      severity: "high",
      icon: <TrendingUp className="w-5 h-5" />,
      summary: "Technology decoupling accelerates as both nations implement new restrictions. Semiconductor supply chains under pressure with allies forced to choose sides.",
      keyPoints: [
        "US considering expanded AI chip export controls (announcement expected this month)",
        "China's SMIC reportedly achieving 5nm production breakthrough",
        "Netherlands restricting ASML equipment sales under US pressure",
        "South Korea, Taiwan caught in middle of chip war escalation",
      ],
      outlook: "Tech bifurcation will accelerate. Expect retaliatory Chinese measures targeting US tech firms. Global supply chain disruption risk remains elevated."
    },
    {
      title: "Indian Ocean Strategic Competition",
      region: "South Asia",
      severity: "medium",
      icon: <Coins className="w-5 h-5" />,
      summary: "India expanding naval presence as China increases port investments across the region. Infrastructure competition intensifying in Sri Lanka and Maldives.",
      keyPoints: [
        "India commissioning new naval base in Lakshadweep Islands",
        "China's Belt and Road Initiative facing debt restructuring in 3 countries",
        "Maldives shifting back toward India after election results",
        "US-India defense cooperation expanding with new logistics agreement",
      ],
      outlook: "Long-term strategic competition favors India demographically and geographically. Chinese economic leverage diminishing due to debt concerns."
    },
    {
      title: "African Political Transitions",
      region: "Africa",
      severity: "low",
      icon: <Users className="w-5 h-5" />,
      summary: "Democratic transitions progressing in West Africa as military juntas face pressure. East Africa experiencing relative stability despite drought concerns.",
      keyPoints: [
        "Nigeria's democratic reforms gaining international support",
        "Mali, Burkina Faso extending military rule despite ECOWAS pressure",
        "Kenya mediating regional disputes successfully",
        "South Africa's energy crisis showing signs of improvement",
      ],
      outlook: "Gradual progress toward stability in most regions. Watch for potential election violence in 3 countries holding votes this year."
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Daily Intelligence Brief</CardTitle>
              <CardDescription className="mt-2">{today}</CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              06:00 UTC
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comprehensive analysis of key geopolitical developments across major regions. 
            This brief synthesizes intelligence from multiple sources to provide actionable insights 
            for decision-makers and analysts.
          </p>
        </CardContent>
      </Card>

      {/* Analysis Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{section.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {section.region}
                      </Badge>
                    </div>
                    <CardDescription>{section.summary}</CardDescription>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getSeverityColor(section.severity)}`}
                >
                  {section.severity.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Points */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Key Developments</h4>
                <ul className="space-y-2">
                  {section.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Outlook */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Outlook & Assessment</h4>
                <p className="text-sm text-muted-foreground">{section.outlook}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Note */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground text-center">
            This analysis is synthesized from open-source intelligence, expert assessments, and predictive modeling. 
            Assessments are subject to change as new information becomes available.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
