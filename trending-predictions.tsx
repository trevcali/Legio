import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Flame, ArrowUp } from "lucide-react";
import { Badge } from "./ui/badge";

interface TrendingItem {
  id: string;
  title: string;
  probability: number;
  change: number;
  category: string;
}

interface TrendingPredictionsProps {
  predictions: TrendingItem[];
  onSelect: (id: string) => void;
}

export function TrendingPredictions({ predictions, onSelect }: TrendingPredictionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Trending Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="flex items-start justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onSelect(prediction.id)}
            >
              <div className="flex-1">
                <p className="text-sm">{prediction.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {prediction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUp className="w-3 h-3 text-red-500" />
                    +{prediction.change}%
                  </span>
                </div>
              </div>
              <span className="text-lg font-semibold text-orange-600">
                {prediction.probability}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
