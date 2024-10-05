<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function enroll(Request $request)
    {
        $request->validate([
            'code' => 'required|string|exists:classrooms,code_classroom',
        ]);

        $classroom = Classroom::where('code_classroom', $request->code)->first();

        $classroom->students()->attach(Auth::id());

        return redirect()->back()->with('success', 'Anda telah berhasil mendaftar ke kelas: ' . $classroom->name);
    }
}
