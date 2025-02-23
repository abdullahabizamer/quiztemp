<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Track;
use App\Models\UserAnswer;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    public function index(Track $track)
    {
        $questions = $track->questions()
            ->when(request('topic'), fn($q) => $q->where('topic', request('topic')))
            ->when(request('difficulty'), fn($q) => $q->where('difficulty', request('difficulty')))
            ->when(request('year'), fn($q) => $q->where('year', request('year')))
            ->with(['userAnswers' => function($q) {
                $q->where('user_id', auth()->id());
            }])
            ->paginate(10);

        return view('questions.index', [
            'track' => $track,
            'questions' => $questions,
            'topics' => config('engineering.topics'),
            'difficulties' => config('engineering.difficulties')
        ]);
    }

    public function answer(Request $request, Question $question)
    {
        $validated = $request->validate([
            'answer' => 'required|integer|min:0|max:3'
        ]);

        $isCorrect = $validated['answer'] === $question->correct_answer;

        DB::transaction(function() use ($question, $validated, $isCorrect) {
            UserAnswer::create([
                'user_id' => auth()->id(),
                'question_id' => $question->id,
                'answer' => $validated['answer'],
                'is_correct' => $isCorrect
            ]);

            UserProgress::updateOrCreate(
                [
                    'user_id' => auth()->id(),
                    'track_id' => $question->track_id
                ],
                [
                    'questions_completed' => DB::raw('questions_completed + 1'),
                    'correct_answers' => DB::raw('correct_answers + ' . ($isCorrect ? 1 : 0)),
                    'last_active' => now()
                ]
            );
        });

        return response()->json([
            'correct' => $isCorrect,
            'explanation' => $question->explanation
        ]);
    }
}