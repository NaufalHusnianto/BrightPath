<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LearningModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'materi',
        'classroom_id'
    ];

    public function classroom(): BelongsTo
    {
        return $this->belongsTo(Classroom::class);
    }
}
