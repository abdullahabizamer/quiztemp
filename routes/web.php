<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::prefix('tracks/{track}')->group(function () {
        Route::get('questions', [QuestionController::class, 'index'])->name('tracks.questions.index');
    });
    
    Route::post('questions/{question}/answer', [QuestionController::class, 'answer'])
        ->name('questions.answer');
});

require __DIR__.'/auth.php';