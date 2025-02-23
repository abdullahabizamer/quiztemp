<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $tracks = Track::withCount(['questions', 'completedQuestions'])
            ->with(['userProgress' => function($query) {
                $query->where('user_id', auth()->id());
            }])
            ->get()
            ->map(function($track) {
                return [
                    'id' => $track->id,
                    'name' => $track->name,
                    'description' => $track->description,
                    'progress' => $track->progress,
                    'questions_completed' => $track->completed_questions_count,
                    'total_questions' => $track->questions_count,
                    'last_active' => $track->userProgress->first()?->last_active,
                    'color' => $track->color
                ];
            });

        return view('dashboard', compact('tracks'));
    }
}