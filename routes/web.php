<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [TrackController::class, 'index'])->name('dashboard');
    Route::get('/tracks/{track}', [TrackController::class, 'show'])->name('tracks.show');
    
    Route::middleware(['admin'])->group(function () {
        Route::get('/admin', [QuestionController::class, 'index'])->name('admin.dashboard');
        Route::post('/questions', [QuestionController::class, 'store'])->name('questions.store');
        Route::put('/questions/{question}', [QuestionController::class, 'update'])->name('questions.update');
        Route::delete('/questions/{question}', [QuestionController::class, 'destroy'])->name('questions.destroy');
    });
});

require __DIR__.'/auth.php';