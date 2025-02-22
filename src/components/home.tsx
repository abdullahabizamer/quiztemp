import React from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import TrackGrid from "./TrackGrid";
import QuestionInterface from "./QuestionInterface";
import AdminDashboard from "./AdminDashboard";
import { SearchFilters, Question } from "@/types";

const Home: React.FC = () => {
  const [activePage, setActivePage] = React.useState("home");
  const [selectedTrack, setSelectedTrack] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<SearchFilters>({
    year: "",
    topic: "",
    difficulty: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    setActivePage(trackId);
  };

  const handleQuestionSubmit = async (answer: number) => {
    // TODO: Implement question submission
    console.log("Submitted answer:", answer);
  };

  const handleAddQuestion = async (
    question: Omit<Question, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      setIsLoading(true);
      // TODO: Implement question addition
      console.log("Adding question:", question);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-auto p-8">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
          isLoading={isLoading}
          error={error}
        />
        <div className="mt-8">
          {activePage === "home" ? (
            <TrackGrid onTrackSelect={handleTrackSelect} />
          ) : activePage === "admin" ? (
            <AdminDashboard
              onAddQuestion={handleAddQuestion}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <QuestionInterface
              onSubmit={handleQuestionSubmit}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
