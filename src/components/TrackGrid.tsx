import React from "react";
import TrackCard from "./TrackCard";

import { Track } from "@/types";

interface TrackGridProps {
  isLoading?: boolean;
  error?: string;
  tracks?: Track[];
  onTrackSelect?: (trackId: string) => void;
}

const TrackGrid = ({
  isLoading = false,
  error,
  tracks = [
    {
      id: "software",
      title: "Software Engineering",
      description: "Master software development concepts and best practices",
      progress: 65,
      questionsCompleted: 325,
      totalQuestions: 500,
      lastActive: "2 hours ago",
      color: "bg-blue-50",
    },
    {
      id: "network",
      title: "Network Engineering",
      description: "Learn networking protocols and infrastructure design",
      progress: 45,
      questionsCompleted: 180,
      totalQuestions: 400,
      lastActive: "1 day ago",
      color: "bg-green-50",
    },
    {
      id: "ai",
      title: "AI Engineering",
      description: "Explore machine learning and artificial intelligence",
      progress: 30,
      questionsCompleted: 90,
      totalQuestions: 300,
      lastActive: "3 days ago",
      color: "bg-purple-50",
    },
    {
      id: "general",
      title: "General Engineering",
      description: "Core engineering principles and fundamentals",
      progress: 80,
      questionsCompleted: 400,
      totalQuestions: 500,
      lastActive: "5 hours ago",
      color: "bg-orange-50",
    },
  ],
  onTrackSelect = () => {},
}: TrackGridProps) => {
  if (error) {
    return (
      <div className="w-full max-w-[1192px] p-6 rounded-lg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-[1192px] p-6 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1192px] grid grid-cols-2 gap-8">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          title={track.title}
          description={track.description}
          progress={track.progress}
          questionsCompleted={track.questionsCompleted}
          totalQuestions={track.totalQuestions}
          lastActive={track.lastActive}
          color={track.color}
          onClick={() => onTrackSelect(track.id)}
        />
      ))}
    </div>
  );
};

export default TrackGrid;
