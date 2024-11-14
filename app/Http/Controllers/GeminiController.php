<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class GeminiController extends Controller
{
    public function index()
    {
        return Inertia::render('Brighty', [
            'geminiAIKey' => env('GEMINI_AI_KEY'),
        ]);
    }
}
