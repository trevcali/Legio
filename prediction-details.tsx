import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { X, Globe, Calendar, Users, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PredictionDetailsProps {
  prediction: {
    id: string;
    title: string;
    description: string;
    probability: number;
    category: string;
    region: string;
    deadline: string;
    predictors: number;
    created: string;
    longDescription: string;
    historicalData: Array<{ date: string; probability: number }>;
    factors: Array<{ text: string; impact: "positive" | "negative" }>;
  } | null;
  onClose: () => void;
}

export function PredictionDetails({ prediction, onClose }: PredictionDetailsProps) {
  if (!prediction) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{prediction.category}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {prediction.region}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{prediction.title}</CardTitle>
              <CardDescription className="mt-2">
                {prediction.description}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Probability */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Forecast</span>
              <span className="text-3xl font-bold text-orange-600">
                {prediction.probability}%
              </span>
            </div>
            <Progress value={prediction.probability} className="h-3" />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Resolution Date</p>
                <p className="font-medium">{prediction.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Forecasters</p>
                <p className="font-medium">{prediction.predictors}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">{prediction.created}</p>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div>
            <h3 className="font-semibold mb-2">Background</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {prediction.longDescription}
            </p>
          </div>

          {/* Historical Trend */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Probability Trend
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={prediction.historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="probability" 
                  stroke="#ea580c" 
                  strokeWidth={2}
                  dot={{ fill: "#ea580c" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key Factors */}
          <div>
            <h3 className="font-semibold mb-3">Key Factors</h3>
            <div className="space-y-2">
              {prediction.factors.map((factor, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    factor.impact === "positive" 
                      ? "bg-red-50 border-red-200" 
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <p className="text-sm">{factor.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1">Submit Forecast</Button>
            <Button variant="outline" className="flex-1">Add to Watchlist</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
