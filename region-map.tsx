import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";

interface RegionData {
  name: string;
  activeCount: number;
  avgProbability: number;
  highRisk: number;
}

interface RegionMapProps {
  regions: RegionData[];
  onRegionClick: (region: string) => void;
}

export function RegionMap({ regions, onRegionClick }: RegionMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Active Regions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regions.map((region) => {
            const riskColor = 
              region.avgProbability >= 60 ? "bg-red-100 border-red-300" : 
              region.avgProbability >= 40 ? "bg-orange-100 border-orange-300" : 
              "bg-green-100 border-green-300";

            return (
              <div
                key={region.name}
                className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow ${riskColor}`}
                onClick={() => onRegionClick(region.name)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{region.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {region.activeCount} active predictions
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {region.avgProbability}% avg
                  </Badge>
                </div>
                {region.highRisk > 0 && (
                  <p className="text-xs text-red-600 mt-2">
                    {region.highRisk} high-risk events
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
