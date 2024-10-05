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


    public static function getGlobalSearchResultTitle(Model $record): string
    {
        return $record->title;
    }

    public static function getGlobalSearchResultUrl(Model $record): ?string
    {
        return route('filament.resources.learning-modules.edit', $record);
    }
}
