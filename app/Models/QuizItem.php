<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'question',
        'choices',
        'answer',
    ];

    protected $casts = [
        'choices' => 'json',
    ];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }
}
