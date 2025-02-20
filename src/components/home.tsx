import React from "react";
import Sidebar from "./Sidebar";
import SearchBar, { SearchFilters } from "./SearchBar";
import TrackGrid from "./TrackGrid";
import QuestionInterface from "./QuestionInterface";
import AdminDashboard from "./AdminDashboard";

const Home = () => {
  const [activePage, setActivePage] = React.useState("home");
  const [selectedTrack, setSelectedTrack] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement search functionality
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filters: SearchFilters) => {
    try {
      setIsLoading(true);
      // TODO: Implement filter functionality
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    setActivePage(trackId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-auto p-8">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
          error={error}
        />
        <div className="mt-8">
          {activePage === "home" ? (
            <TrackGrid onTrackSelect={handleTrackSelect} />
          ) : activePage === "admin" ? (
            <AdminDashboard />
          ) : (
            <QuestionInterface />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
