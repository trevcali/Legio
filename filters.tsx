import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Filter, X } from "lucide-react";

interface FiltersProps {
  selectedCategory: string;
  selectedRegion: string;
  selectedTimeframe: string;
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
  onTimeframeChange: (timeframe: string) => void;
  onReset: () => void;
}

export function Filters({
  selectedCategory,
  selectedRegion,
  selectedTimeframe,
  onCategoryChange,
  onRegionChange,
  onTimeframeChange,
  onReset,
}: FiltersProps) {
  const hasFilters = selectedCategory !== "all" || selectedRegion !== "all" || selectedTimeframe !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>Filter by:</span>
      </div>

      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="conflict">Conflict</SelectItem>
          <SelectItem value="elections">Elections</SelectItem>
          <SelectItem value="trade">Trade & Economy</SelectItem>
          <SelectItem value="diplomacy">Diplomacy</SelectItem>
          <SelectItem value="sanctions">Sanctions</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          <SelectItem value="East Asia">East Asia</SelectItem>
          <SelectItem value="Europe">Europe</SelectItem>
          <SelectItem value="Middle East">Middle East</SelectItem>
          <SelectItem value="North America">North America</SelectItem>
          <SelectItem value="South Asia">South Asia</SelectItem>
          <SelectItem value="Africa">Africa</SelectItem>
          <SelectItem value="Latin America">Latin America</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedTimeframe} onValueChange={onTimeframeChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="quarter">This Quarter</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-1">
          <X className="w-4 h-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
