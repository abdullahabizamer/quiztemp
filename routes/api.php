<?php

use App\Http\Controllers\Api\TrackController;
use App\Http\Controllers\Api\QuestionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Tracks
    Route::get('/tracks', [TrackController::class, 'index']);
    Route::get('/tracks/{track}', [TrackController::class, 'show']);
    Route::get('/tracks/{track}/questions', [TrackController::class, 'questions']);
    
    // Questions
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::put('/questions/{question}', [QuestionController::class, 'update']);
    Route::delete('/questions/{question}', [QuestionController::class, 'destroy']);
    Route::post('/questions/{question}/answer', [QuestionController::class, 'answer']);
    
    // User Progress
    Route::get('/progress', [TrackController::class, 'progress']);
});