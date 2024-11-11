<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        $tasks = Task::with(['submissions', 'classroom'])
            ->whereHas('classroom.students', function ($query) use ($user) {
                $query->where('student_id', $user->id);
            })
            ->get();

        return Inertia::render('Tasks', [
            'tasks' => $tasks,
        ]);

    }

    public function show(Task $task): Response
    {
        $task->load(['classroom', 'submissions']);

        return Inertia::render('Task', [
            'tasks' => $task,
        ]);
    }

    public function store(Request $request, $taskId)
    {
        $request->validate([
            'submission' => 'required|file|mimes:pdf,doc,docx,jpg,png',
        ]);

        $path = $request->file('submission')->store('submissions', 'public');

        Submission::create([
            'task_id' => $taskId,
            'user_id' => Auth::id(),
            'file_path' => $path,
        ]);

        return redirect()->back()->with('message', 'Tugas berhasil diupload!');
    }
}
