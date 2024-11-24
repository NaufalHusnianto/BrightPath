<?php

namespace App\Filament\Resources\StudentsRelationManagerResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class StudentsRelationManager extends RelationManager
{
    protected static string $relationship = 'students';

    protected static ?string $title = 'Siswa yang Tergabung';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->sortable()->searchable()->label('Nama Siswa'),
                Tables\Columns\TextColumn::make('email')->sortable()->searchable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->actions([
                Tables\Actions\DeleteAction::make()
                    ->action(function ($record) {
                        $this->ownerRecord->students()->detach($record->id);
                    })
                    ->label('Keluarkan Siswa'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
