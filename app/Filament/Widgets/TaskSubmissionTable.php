<?php

namespace App\Filament\Widgets;

use App\Models\Task;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class TaskSubmissionTable extends BaseWidget
{
    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = 'Task Submissions';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Task::query()->withCount('submissions')->with('classroom')
            )
            ->columns([
                Tables\Columns\TextColumn::make('classroom.name')
                    ->label('Classroom')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Task Title')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('submissions_count')
                    ->label('Total Submissions')
                    ->sortable(),
                Tables\Columns\TextColumn::make('classroom.students_count')
                    ->label('Total Students')
                    ->getStateUsing(function (Task $record) {
                        return $record->classroom->students()->count();
                    })
                    ->sortable(),
            ]);
    }
}
