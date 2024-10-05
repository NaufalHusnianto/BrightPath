<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Discussion extends Model
{
    use HasFactory;

    protected $fillable = ['learning_module_id', 'content'];

    protected $guarded = ['user_id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($discussion) {
            $discussion->user_id = Auth::id();
        });
    }

    public function learningModule(): BelongsTo
    {
        return $this->belongsTo(LearningModule::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
