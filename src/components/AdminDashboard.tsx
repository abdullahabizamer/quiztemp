import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Question } from "@/types";

interface AdminDashboardProps {
  onAddQuestion?: (
    question: Omit<Question, "id" | "createdAt" | "updatedAt">,
  ) => void;
  onEditQuestion?: (id: string, question: any) => void;
  onDeleteQuestion?: (id: string) => void;
  isLoading?: boolean;
  error?: string;
}

const AdminDashboard = ({
  onAddQuestion = () => {},
  onEditQuestion = () => {},
  onDeleteQuestion = () => {},
  isLoading = false,
  error,
}: AdminDashboardProps) => {
  const [questionText, setQuestionText] = React.useState("");
  const [options, setOptions] = React.useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = React.useState(0);
  const [explanation, setExplanation] = React.useState("");
  const [track, setTrack] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [year, setYear] = React.useState("");

  const validateForm = () => {
    if (!questionText || !track || !topic || !difficulty || !year) {
      return "All fields are required";
    }
    if (options.some((opt) => !opt)) {
      return "All options must be filled";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }
    onAddQuestion({
      question: questionText,
      options,
      correctAnswer,
      explanation,
      track,
      topic,
      difficulty,
      year,
    });
  };

  return (
    <div className="w-full max-w-[1192px] space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select onValueChange={setTrack}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Track" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software Engineering</SelectItem>
                  <SelectItem value="network">Network Engineering</SelectItem>
                  <SelectItem value="ai">AI Engineering</SelectItem>
                  <SelectItem value="general">General Engineering</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="algorithms">Algorithms</SelectItem>
                  <SelectItem value="data-structures">
                    Data Structures
                  </SelectItem>
                  <SelectItem value="system-design">System Design</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Enter question text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />

            <div className="space-y-2">
              {options.map((option, index) => (
                <Input
                  key={index}
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                />
              ))}
            </div>

            <Select
              onValueChange={(value) => setCorrectAnswer(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Correct Answer" />
              </SelectTrigger>
              <SelectContent>
                {options.map((_, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    Option {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Enter explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
