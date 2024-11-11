<?php

namespace App\Filament\Widgets;

use App\Models\Task;
use App\Models\User;
use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Facades\Auth;

class TaskSubmissionTable extends BaseWidget
{
    use HasWidgetShield;

    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = 'Task Submissions';

    public function table(Table $table): Table
    {
        $user = User::find(Auth::user()->id);

        $query = Task::query()
            ->withCount('submissions')
            ->with('classroom');

        if ($user->hasRole('teacher')) {
            $query->whereHas('classroom', function ($q) use ($user) {
                $q->where('teacher_id', $user->id);
            });
        }

        return $table
            ->query($query)
            ->columns([
                Tables\Columns\TextColumn::make('classroom.name')
                    ->label('Classroom')
                    ->searchable(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Task Title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('classroom.students_count')
                    ->label('Total Students')
                    ->getStateUsing(function (Task $record) {
                        return $record->classroom->students()->count();
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('submissions_count')
                    ->label('Total Student Submited')
                    ->sortable(),
            ]);
    }
}
