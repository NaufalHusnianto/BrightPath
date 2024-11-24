<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizSubmission;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Quizzes');
    }

    public function enroll(Request $request)
    {
        $quiz = Quiz::with(['quizItems', 'teacher'])->where('code_quiz', $request->code)->first();

        if ($quiz) {
            return response()->json([
                'success' => true,
                'quiz' => $quiz,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Kode quiz tidak valid!',
        ]);
    }

    public function submit(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'student_id' => 'required|exists:users,id',
            'answers' => 'required|array',
            'answers.*' => 'required|string|in:A,B,C,D',
        ]);

        $quiz = Quiz::with('quizItems')->findOrFail($request->quiz_id);
        
        $answers = $request->answers;
        $studentId = $request->student_id;

        $correctAnswers = 0;
        $totalQuestions = $quiz->quizItems->count();

        foreach ($quiz->quizItems as $item) {
            if (isset($answers[$item->id]) && $answers[$item->id] === $item->answer) {
                $correctAnswers++;
            }
        }

        $score = round(($correctAnswers / $totalQuestions) * 100, 2);

        $submission = QuizSubmission::create([
            'quiz_id' => $quiz->id,
            'user_id' => $studentId,
            'answers' => json_encode($answers),
            'score' => $score,
            'submitted_at' => Carbon::now(),
        ]);

        return response()->json([
            'message' => 'Quiz submitted successfully',
            'score' => $score,
        ]);
    }

    public function history(): Response
    {
        $user = Auth::user();

        return Inertia::render('QuizHistory', [
            'quizzes' => QuizSubmission::with(['quiz', 'quiz.teacher'])->where('user_id', $user->id)->get(),
        ]);
    }
}
