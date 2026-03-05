import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Globe, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";

interface PredictionCardProps {
  id: string;
  title: string;
  description: string;
  probability: number;
  category: string;
  region: string;
  deadline: string;
  trend: "up" | "down" | "stable";
  predictors: number;
  onViewDetails: (id: string) => void;
}

export function PredictionCard({
  id,
  title,
  description,
  probability,
  category,
  region,
  deadline,
  trend,
  predictors,
  onViewDetails,
}: PredictionCardProps) {
  const probabilityColor = 
    probability >= 70 ? "text-red-600" : 
    probability >= 50 ? "text-orange-600" : 
    probability >= 30 ? "text-yellow-600" : 
    "text-green-600";

  const trendIcon = trend === "up" ? (
    <TrendingUp className="w-4 h-4 text-red-500" />
  ) : trend === "down" ? (
    <TrendingDown className="w-4 h-4 text-green-500" />
  ) : null;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div className="flex items-center gap-1">
            {trendIcon}
            <span className={`text-2xl ${probabilityColor}`}>
              {probability}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={probability} className="h-2" />
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{category}</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {region}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Resolves: {deadline}</span>
          </div>
          <span>{predictors} forecasters</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
