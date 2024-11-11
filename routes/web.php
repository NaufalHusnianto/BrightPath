<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\LearningModuleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    if (Auth::user()->hasRole('teacher')) {
        return redirect('/admin');
    } else {
        return app(ClassroomController::class)->index();
    }
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/tasks', [TaskController::class, 'index'])->middleware(['auth', 'verified'])->name('tasks');
Route::get('/classrooms/{classroom}', [ClassroomController::class, 'show'])->middleware(['auth', 'verified'])->name('classrooms.show');
Route::post('/enroll-classroom', action: [EnrollmentController::class, 'enroll'])->name('enroll.classroom');
Route::post('/leave-classroom/{classroomId}', [EnrollmentController::class, 'leave'])
    ->middleware('auth')
    ->name('leave-classroom');

Route::get('/learning-module/{module}', [LearningModuleController::class, 'show'])->middleware(['auth', 'verified'])->name('learning-modules.show');
Route::post('/discuss/{module}', [LearningModuleController::class, 'discuss'])->middleware(['auth', 'verified'])->name('discuss');

Route::get('/task/{task}', [TaskController::class, 'show'])->middleware(['auth', 'verified'])->name('tasks.show');
Route::post('/tasks/{taskId}/submissions', [TaskController::class, 'store'])->name('submissions.store');

Route::post('/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
