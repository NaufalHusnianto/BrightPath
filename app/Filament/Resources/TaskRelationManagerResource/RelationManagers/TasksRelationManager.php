<?php

namespace App\Filament\Resources\TaskRelationManagerResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class TasksRelationManager extends RelationManager
{
    protected static string $relationship = 'tasks';

    protected static ?string $recordTitleAttribute = 'title';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable()->label('Judul Task'),
                Tables\Columns\TextColumn::make('deadline')->dateTime()->label('Tenggat Waktu'),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->label('Dibuat pada'),
                Tables\Columns\TextColumn::make('updated_at')->dateTime()->label('Diperbarui pada'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->actions([
                //
            ])
            ->bulkActions([
                //
            ]);
    }
}
