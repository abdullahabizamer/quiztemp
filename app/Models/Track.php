<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Track extends Model
{
    protected $fillable = ['name', 'description', 'color', 'icon'];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function userProgress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }

    public function getProgressAttribute(): int
    {
        $total = $this->questions()->count();
        if ($total === 0) return 0;
        
        $completed = $this->completedQuestions()->count();
        return (int) (($completed / $total) * 100);
    }

    public function completedQuestions()
    {
        return $this->questions()
            ->whereHas('userAnswers', function ($query) {
                $query->where('user_id', auth()->id());
            });
    }
}