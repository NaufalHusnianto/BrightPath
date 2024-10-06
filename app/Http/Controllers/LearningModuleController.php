<?php

namespace App\Http\Controllers;

use App\Models\Discussion;
use App\Models\LearningModule;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LearningModuleController extends Controller
{
    public function show(LearningModule $module): Response
    {
        $module->load(['discussions', 'discussions.user', 'classroom']);

        return Inertia::render('Module', [
            'modules' => $module,
        ]);
    }

    public function discuss(Request $request, LearningModule $module): RedirectResponse
    {
        $request->validate([
            'data' => 'required|string',
        ]);

        $discussion = Discussion::create([
            'content' => $request->data,
            'learning_module_id' => $module->id,
        ]);

        return redirect()->route('learning-modules.show', $module);
    }
}
