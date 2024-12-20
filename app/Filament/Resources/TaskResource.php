<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SubmissionRelationManagerResource\RelationManagers\SubmissionsRelationManager;
use App\Filament\Resources\TaskResource\Pages;
use App\Models\Classroom;
use App\Models\Task;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class TaskResource extends Resource
{
    protected static ?string $model = Task::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';

    protected static ?string $navigationGroup = 'Classroom';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        $user = User::find(Auth::user()->id);

        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Judul')
                    ->required()
                    ->maxLength(255),
                Forms\Components\RichEditor::make('description')
                    ->label('Deskripsi')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\DateTimePicker::make('deadline')
                    ->label('Deadline')
                    ->required(),
                Forms\Components\Select::make('classroom_id')
                    ->label('Kelas')
                    ->relationship('classroom', 'name')
                    ->required()
                    ->options(function () use ($user) {
                        if ($user->hasRole('super_admin')) {
                            return Classroom::all()->pluck('name', 'id');
                        }
                        
                        return Classroom::where('teacher_id', $user->id)->pluck('name', 'id');
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        $user = User::find(Auth::user()->id);

        return $table
            ->query(
            $user->hasRole('super_admin') 
                ? Task::query() 
                : Task::whereHas('classroom', function ($query) use ($user) {
                    $query->where('teacher_id', $user->id);
                })
            )
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),
                Tables\Columns\TextColumn::make('classroom.name')
                    ->searchable()
                    ->label('Kelas'),
                Tables\Columns\TextColumn::make('deadline')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui pada')
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
            SubmissionsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTasks::route('/'),
            'create' => Pages\CreateTask::route('/create'),
            'edit' => Pages\EditTask::route('/{record}/edit'),
        ];
    }
}
