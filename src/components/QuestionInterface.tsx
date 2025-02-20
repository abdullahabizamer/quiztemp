import React from "react";
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { CheckCircle2, XCircle, ArrowRight, Timer } from "lucide-react";

import { Question } from "@/types";

interface QuestionInterfaceProps {
  question?: Question;
  currentQuestionNumber?: number;
  totalQuestions?: number;
  timeRemaining?: number;
  onNext?: () => void;
  onSubmit?: (answer: number) => void;
  isLoading?: boolean;
  error?: string;
}

const QuestionInterface = ({
  question = {
    id: "1",
    question:
      "What is the primary purpose of dependency injection in software engineering?",
    options: [
      "To increase code coupling",
      "To reduce code reusability",
      "To achieve loose coupling and improve testability",
      "To make the code more complex",
    ],
    correctAnswer: 2,
    explanation:
      "Dependency injection is a design pattern that promotes loose coupling between components by allowing dependencies to be injected from outside rather than created within the component.",
  },
  currentQuestionNumber = 1,
  totalQuestions = 10,
  timeRemaining = 300,
  onNext = () => {},
  onSubmit = () => {},
  isLoading = false,
  error,
}: QuestionInterfaceProps) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(
    null,
  );
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    onSubmit(selectedAnswer);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (error) {
    return (
      <div className="w-full max-w-[1192px] min-h-[700px] bg-white p-6 rounded-lg shadow-lg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-[1192px] min-h-[700px] bg-white p-6 rounded-lg shadow-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1192px] min-h-[700px] bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Progress
            value={(currentQuestionNumber / totalQuestions) * 100}
            className="w-[200px]"
          />
          <span className="text-sm text-gray-600">
            Question {currentQuestionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

          <RadioGroup
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            className="space-y-4"
            disabled={showExplanation}
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-4 rounded-lg border ${showExplanation && index === question.correctAnswer ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label htmlFor={`option-${index}`} className="flex-grow">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || showExplanation}
            >
              Submit Answer
            </Button>
            {showExplanation && (
              <Button onClick={onNext} className="flex items-center gap-2">
                Next Question <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={showExplanation}
        onOpenChange={(open) => {
          if (!open) {
            setShowExplanation(false);
            if (isCorrect) onNext();
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Correct Answer!
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-500" />
                  Incorrect Answer
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-4">
              <p className="font-medium mb-2">Explanation:</p>
              <p className="text-gray-600">{question.explanation}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuestionInterface;
