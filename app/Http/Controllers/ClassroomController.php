<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ClassroomController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        $classrooms = Classroom::with(['teacher', 'learningModules', 'tasks'])
            ->whereHas('students', function($query) use ($user) {
                $query->where('student_id', $user->id);
            })
            ->get();

        return Inertia::render('Dashboard', [
            'classrooms' => $classrooms,
        ]);
    }

    public function show(Classroom $classroom): Response
    {
        $classroom->load(['teacher', 'learningModules', 'tasks']);

        return Inertia::render('Classroom', [
            'classroom_data' => $classroom,
        ]);
    }
}
