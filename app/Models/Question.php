<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        'year',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function track()
    {
        return $this->belongsTo(Track::class);
    }
}