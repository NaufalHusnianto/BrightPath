<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;

use Filament\Models\Contracts\HasAvatar;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasAvatar, MustVerifyEmail, FilamentUser
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'photo_profile'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function canAccessPanel(\Filament\Panel $panel): bool
    {
        // Membatasi akses hanya untuk role "teacher" atau "super_admin"
        return $this->hasRole('teacher') || $this->hasRole('super_admin');
    }

    public function classroomsAsTeacher(): HasMany
    {
        return $this->hasMany(Classroom::class, 'teacher_id');
    }

    public function classroomsAsStudent(): BelongsToMany
    {
        return $this->belongsToMany(Classroom::class, 'classroom_student', 'student_id', 'classroom_id');
    }

    public function quizzesAsTeacher(): HasMany
    {
        return $this->hasMany(Quiz::class, 'teacher_id');
    }

    public function getFilamentAvatarUrl(): ?string
    {
        if ($this->photo_profile === null) {
            return null;
        }
        
        return '/storage/' . $this->photo_profile;
    }
}
