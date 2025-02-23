<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProgress extends Model
{
    protected $fillable = [
        'user_id',
        'track_id',
        'questions_completed',
        'correct_answers',
        'last_active'
    ];

    protected $casts = [
        'last_active' => 'datetime',
        'questions_completed' => 'integer',
        'correct_answers' => 'integer'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function track(): BelongsTo
    {
        return $this->belongsTo(Track::class);
    }

    public function getProgressPercentageAttribute(): int
    {
        if ($this->questions_completed === 0) return 0;
        return (int) (($this->correct_answers / $this->questions_completed) * 100);
    }
}