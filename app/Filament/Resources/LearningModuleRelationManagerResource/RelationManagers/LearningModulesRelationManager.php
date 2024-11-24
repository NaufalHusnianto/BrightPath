<?php

namespace App\Filament\Resources\LearningModuleRelationManagerResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class LearningModulesRelationManager extends RelationManager
{
    protected static string $relationship = 'learningModules';
    protected static ?string $recordTitleAttribute = 'title';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable()->label('Judul Learning Module'),
                Tables\Columns\TextColumn::make('description')->searchable()->label('Deskripsi'),
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
