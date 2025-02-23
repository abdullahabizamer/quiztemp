<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    protected $fillable = [
        'track_id',
        'question',
        'options',
        'correct_answer',
        'explanation',
        'topic',
        'difficulty',
        'year'
    ];

    protected $casts = [
        'options' => 'array'
    ];

    public function track(): BelongsTo
    {
        return $this->belongsTo(Track::class);
    }

    public function userAnswers(): HasMany
    {
        return $this->hasMany(UserAnswer::class);
    }
}