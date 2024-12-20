<?php

namespace App\Filament\Resources\SubmissionRelationManagerResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class SubmissionsRelationManager extends RelationManager
{
    protected static string $relationship = 'submissions';

    protected static ?string $recordTitleAttribute = 'id';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('score')
                ->label('Score')
                ->numeric(),
            Forms\Components\Textarea::make('feedback')
                ->label('Feedback'),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Dikirim oleh')
                    ->sortable(),
                Tables\Columns\TextColumn::make('file_path')
                    ->label('Submission File')
                    ->url(fn ($record) => asset('storage/' . $record->file_path), true)
                    ->openUrlInNewTab(),
                Tables\Columns\TextColumn::make('score'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dikirim pada')
                    ->dateTime(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
