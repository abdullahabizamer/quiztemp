<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'track_id' => 'required|exists:tracks,id',
            'question' => 'required|string',
            'options' => 'required|array|size:4',
            'correct_answer' => 'required|integer|min:0|max:3',
            'explanation' => 'required|string',
            'topic' => 'required|string',
            'difficulty' => 'required|string',
            'year' => 'required|string',
        ]);

        $question = Question::create($validated);

        return response()->json($question, 201);
    }

    public function answer(Question $question, Request $request)
    {
        $validated = $request->validate([
            'answer' => 'required|integer|min:0|max:3'
        ]);

        $isCorrect = $validated['answer'] === $question->correct_answer;

        UserProgress::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'track_id' => $question->track_id
            ],
            [
                'questions_completed' => \DB::raw('questions_completed + 1'),
                'correct_answers' => \DB::raw('correct_answers + ' . ($isCorrect ? 1 : 0)),
                'last_active' => now()
            ]
        );

        return response()->json([
            'correct' => $isCorrect,
            'explanation' => $question->explanation
        ]);
    }
}