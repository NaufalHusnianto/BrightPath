<?php

use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\LearningModuleController;
use App\Http\Controllers\ProfileController;
use App\Models\Classroom;
use App\Models\Task;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();

    $classrooms = Classroom::with('teacher')
        ->whereHas('students', function($query) use ($user) {
            $query->where('student_id', $user->id);
        })
        ->get();

    return Inertia::render('Dashboard', [
        'classrooms' => $classrooms,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');
Route::get('/learning-modules', [LearningModuleController::class, 'index'])->name('learning-modules.index');

Route::post('/enroll-classroom', action: [EnrollmentController::class, 'enroll'])->name('enroll.classroom');

require __DIR__.'/auth.php';
