import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, Filter } from "lucide-react";

import { SearchFilters } from "@/types";

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
  isLoading?: boolean;
  error?: string;
}

const SearchBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
  isLoading = false,
  error,
  initialFilters = {
    year: "",
    topic: "",
    difficulty: "",
  },
}: SearchBarProps) => {
  const years = ["2024", "2023", "2022", "2021", "2020"];
  const topics = [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Networking",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];

  if (error) {
    return (
      <div className="w-full h-20 bg-white p-4 rounded-lg shadow-sm border border-red-200 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-20 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search questions"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-5 w-5" />
          <Select
            onValueChange={(value) =>
              onFilterChange({ ...initialFilters, year: value })
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              onFilterChange({ ...initialFilters, topic: value })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              onFilterChange({ ...initialFilters, difficulty: value })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="secondary" disabled={isLoading}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
            ) : (
              "Apply Filters"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
