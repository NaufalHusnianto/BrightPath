<?php

namespace App\Filament\Resources\QuizResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class QuizSubmissionsRelationManager extends RelationManager
{
    protected static string $relationship = 'quizSubmissions';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('quiz_id')
                    ->relationship('quiz', 'title'),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name'),
                Forms\Components\TextInput::make('score')
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->searchable()->label('Nama Siswa'),
                Tables\Columns\TextColumn::make('score')->label('Nilai')->sortable(),
                Tables\Columns\TextColumn::make('answers')->label('Jawaban'),
                Tables\Columns\TextColumn::make('submitted_at')->label('Dikumpulkan pada')
            ])
            ->filters([
                //
            ])
            ->headerActions([
                // Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                // Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
