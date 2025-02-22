import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

interface TrackCardProps {
  title?: string;
  description?: string;
  progress?: number;
  questionsCompleted?: number;
  totalQuestions?: number;
  lastActive?: string;
  color?: string;
  onClick?: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({
  title = "Software Engineering",
  description = "Master software development concepts and best practices",
  progress = 65,
  questionsCompleted = 325,
  totalQuestions = 500,
  lastActive = "2 hours ago",
  color = "bg-blue-50",
  onClick = () => {},
}: TrackCardProps) => {
  return (
    <Card
      className={`w-[580px] h-[280px] cursor-pointer hover:shadow-lg transition-shadow ${color}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${title} track`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                {questionsCompleted} / {totalQuestions} questions completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                Last active {lastActive}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
