<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function index()
    {
        $tracks = Track::with(['userProgress' => function($query) {
            $query->where('user_id', auth()->id());
        }])->get()->map(function($track) {
            return [
                'id' => $track->id,
                'title' => $track->title,
                'description' => $track->description,
                'progress' => $track->userProgress->first()?->progress ?? 0,
                'questionsCompleted' => $track->userProgress->first()?->questions_completed ?? 0,
                'totalQuestions' => $track->questions()->count(),
                'lastActive' => $track->userProgress->first()?->last_active?->diffForHumans() ?? 'Never',
                'color' => $track->color
            ];
        });

        return response()->json($tracks);
    }

    public function questions(Track $track, Request $request)
    {
        $questions = $track->questions()
            ->when($request->topic, fn($q) => $q->where('topic', $request->topic))
            ->when($request->difficulty, fn($q) => $q->where('difficulty', $request->difficulty))
            ->when($request->year, fn($q) => $q->where('year', $request->year))
            ->paginate(10);

        return response()->json($questions);
    }

    public function progress()
    {
        $progress = auth()->user()->progress()->with('track')->get();
        return response()->json($progress);
    }
}