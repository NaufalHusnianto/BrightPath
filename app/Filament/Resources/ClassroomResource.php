<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ClassroomResource\Pages;
use App\Filament\Resources\LearningModuleRelationManagerResource\RelationManagers\LearningModulesRelationManager;
use App\Filament\Resources\StudentsRelationManagerResource\RelationManagers\StudentsRelationManager;
use App\Filament\Resources\TaskRelationManagerResource\RelationManagers\TasksRelationManager;
use App\Models\Classroom;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ClassroomResource extends Resource
{
    protected static ?string $model = Classroom::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        $user = User::find(Auth::user()->id);

        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nama Kelas')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('teacher_id')
                    ->label('Guru/Pengajar')
                    ->relationship('teacher', 'name')
                    ->required()
                    ->options(function () use ($user) {
                        if ($user->hasRole('super_admin')) {
                            return User::role(['super_admin', 'teacher'])->pluck('name', 'id');
                        }
                        
                        return [$user->id => $user->name];
                    })
                    ->default($user->id),
                Forms\Components\Textarea::make('description')
                    ->label('Deskripsi')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('code_classroom')
                    ->label('Kode Kelas')
                    ->required()
                    ->default(function () {
                        return Str::random(6);
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        $user = User::find(Auth::user()->id);

        return $table
            ->query(
                $user->hasRole('super_admin') 
                ? Classroom::query() 
                : Classroom::query()->where('teacher_id', $user->id)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Kelas')
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->label('Deskripsi')
                    ->searchable(),
                Tables\Columns\TextColumn::make('teacher.name')
                    ->label('Guru/Pengajar')
                    ->searchable(),
                Tables\Columns\TextColumn::make('code_classroom')
                    ->label('Kode Kelas'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diubah pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            StudentsRelationManager::class,
            LearningModulesRelationManager::class,
            TasksRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListClassrooms::route('/'),
            'create' => Pages\CreateClassroom::route('/create'),
            'edit' => Pages\EditClassroom::route('/{record}/edit'),
        ];
    }
}
