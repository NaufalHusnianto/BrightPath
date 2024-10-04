<?php

namespace App\Http\Controllers;

use App\Models\LearningModule;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class LearningModuleController extends Controller
{
    public function index()
    {
        return Inertia::render('Module', [
            'modules' => LearningModule::where('id', '=', 1)->get(),
        ]);
        // return response()->json(LearningModule::where('id',  '=', 1)->get());
    }
}
