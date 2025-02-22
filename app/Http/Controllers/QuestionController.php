<?php

namespace App\Http\Controllers;

use App\Models\Question;
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

        return redirect()->back()->with('success', 'Question added successfully');
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|size:4',
            'correct_answer' => 'required|integer|min:0|max:3',
            'explanation' => 'required|string',
            'topic' => 'required|string',
            'difficulty' => 'required|string',
            'year' => 'required|string',
        ]);

        $question->update($validated);

        return redirect()->back()->with('success', 'Question updated successfully');
    }

    public function destroy(Question $question)
    {
        $question->delete();

        return redirect()->back()->with('success', 'Question deleted successfully');
    }
}