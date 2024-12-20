<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuizResource\Pages;
use App\Filament\Resources\QuizResource\RelationManagers\QuizSubmissionsRelationManager;
use App\Models\Quiz;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class QuizResource extends Resource
{
    protected static ?string $model = Quiz::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';

    public static function form(Form $form): Form
    {
        $user = User::find(Auth::user()->id);

        return $form
            ->schema([
                Forms\Components\Group::make([
                    Forms\Components\Section::make([
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
                        Forms\Components\TextInput::make('code_quiz')
                            ->label('Kode Quiz')
                            ->required()
                            ->maxLength(255)
                            ->default(function () {
                                return Str::random(6);
                            }),
                        Forms\Components\TextInput::make('title')
                            ->label('Judul Quiz')
                            ->required()
                            ->maxLength(255),
                    ]),
                ])->columnSpanFull(),
                Forms\Components\Group::make([
                    Forms\Components\Section::make([
                        Forms\Components\Repeater::make('quizItems')
                            ->relationship()
                            ->label('Soal Quiz')
                            ->schema([
                                Forms\Components\RichEditor::make('question')
                                    ->label('Soal')
                                    ->required(),
                                Forms\Components\TextInput::make('choices.A')
                                    ->required(),
                                Forms\Components\TextInput::make('choices.B')
                                    ->required(),
                                Forms\Components\TextInput::make('choices.C')
                                    ->required(),
                                Forms\Components\TextInput::make('choices.D')
                                    ->required(),
                                Forms\Components\Select::make('answer')
                                    ->label('Jawaban')
                                    ->required()
                                    ->options([
                                        'A' => 'A',
                                        'B' => 'B',
                                        'C' => 'C',
                                        'D' => 'D',
                                    ]),
                            ])
                            ->minItems(1)
                            ->defaultItems(1)
                            ->maxItems(50),
                    ])
                ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('teacher.name')
                    ->searchable()
                    ->label('Guru/Pengajar'),
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul Quiz')
                    ->searchable(),
                Tables\Columns\TextColumn::make('code_quiz')
                    ->label('Kode Quiz')
                    ->searchable(),
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
                Tables\Actions\EditAction::make(),
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
            QuizSubmissionsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuizzes::route('/'),
            'create' => Pages\CreateQuiz::route('/create'),
            'edit' => Pages\EditQuiz::route('/{record}/edit'),
        ];
    }
}
