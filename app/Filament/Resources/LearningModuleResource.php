<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DiscussionsRelationManagerResource\RelationManagers\DiscussionsRelationManager;
use App\Filament\Resources\LearningModuleResource\Pages;
use App\Models\Classroom;
use App\Models\LearningModule;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class LearningModuleResource extends Resource
{
    protected static ?string $model = LearningModule::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static ?string $navigationGroup = 'Classroom';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        $user = User::find(Auth::user()->id);

        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Select::make('classroom_id')
                    ->relationship('classroom', 'name')
                    ->required()
                    ->options(function () use ($user) {
                        if ($user->hasRole('super_admin')) {
                            return Classroom::all()->pluck('name', 'id');
                        }
                        
                        return Classroom::where('teacher_id', $user->id)->pluck('name', 'id');
                    }),
                Forms\Components\RichEditor::make('materi')
                    ->columnSpanFull()
                    ->required()
                    ->reactive()
                    ->dehydrateStateUsing(fn ($state) => $state),
                Forms\Components\Hidden::make('image_upload_url')->dehydrateStateUsing(fn ($state) => route('upload.image')),
            ]);
    }

    public static function table(Table $table): Table
    {
        $user = User::find(Auth::user()->id);

        return $table
            ->query(
            $user->hasRole('super_admin') 
                ? LearningModule::query() 
                : LearningModule::whereHas('classroom', function ($query) use ($user) {
                    $query->where('teacher_id', $user->id);
                })
            )
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->searchable(),
                Tables\Columns\TextColumn::make('classroom.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
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
            DiscussionsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLearningModules::route('/'),
            'create' => Pages\CreateLearningModule::route('/create'),
            'edit' => Pages\EditLearningModule::route('/{record}/edit'),
        ];
    }
}
