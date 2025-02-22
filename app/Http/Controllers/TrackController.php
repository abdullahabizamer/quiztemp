<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function index()
    {
        $tracks = Track::with(['userProgress' => function($query) {
            $query->where('user_id', auth()->id());
        }])->get();

        return view('dashboard', compact('tracks'));
    }

    public function show(Track $track)
    {
        $questions = $track->questions()
            ->when(request('topic'), fn($q) => $q->where('topic', request('topic')))
            ->when(request('difficulty'), fn($q) => $q->where('difficulty', request('difficulty')))
            ->when(request('year'), fn($q) => $q->where('year', request('year')))
            ->paginate(10);

        return view('track.show', compact('track', 'questions'));
    }
}