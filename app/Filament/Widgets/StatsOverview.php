<?php

namespace App\Filament\Widgets;

use App\Models\Classroom;
use App\Models\LearningModule;
use App\Models\Task;
use App\Models\User;
use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class StatsOverview extends BaseWidget
{
    use HasWidgetShield;

    protected function getStats(): array
    {
        $user = User::find(Auth::user()->id);

        if ($user->hasRole('teacher')) {
            $teacherClassrooms = Classroom::where('teacher_id', $user->id)->count();
            $teacherModules = LearningModule::whereHas('classroom', function($query) use ($user) {
                $query->where('teacher_id', $user->id);
            })->count();
            $teacherTasks = Task::whereHas('classroom', function($query) use ($user) {
                $query->where('teacher_id', $user->id);
            })->count();

            return [
                Stat::make('Classrooms', $teacherClassrooms)
                    ->description('Your Classrooms')
                    ->descriptionIcon('heroicon-o-academic-cap')
                    ->descriptionColor('primary'),
                Stat::make('Learning Modules', $teacherModules)
                    ->description('Your Learning Modules')
                    ->descriptionIcon('heroicon-o-clipboard-document-list')
                    ->descriptionColor('primary'),
                Stat::make('Tasks', $teacherTasks)
                    ->description('Your Tasks')
                    ->descriptionIcon('heroicon-o-clipboard-document-check')
                    ->descriptionColor('primary'),
            ];
        } else {
            return [
                Stat::make('Users', User::count() - 1)
                    ->label('Pengguna')
                    ->description('Jumlah Pengguna')
                    ->descriptionIcon('heroicon-o-users')
                    ->descriptionColor('primary'),
                Stat::make('Teachers', User::role('teacher')->count())
                    ->label('Guru')
                    ->description('Jumlah Guru')
                    ->descriptionIcon('heroicon-o-user')
                    ->descriptionColor('primary'),
                Stat::make('Students', User::role('student')->count())
                    ->label('Siswa')
                    ->description('Jumlah Siswa')
                    ->descriptionIcon('heroicon-o-users')
                    ->descriptionColor('primary'),
                Stat::make('Classrooms', Classroom::count())
                    ->label('Kelas')
                    ->description('Jumlah Classrooms')
                    ->descriptionIcon('heroicon-o-academic-cap')
                    ->descriptionColor('primary'),
                Stat::make('Learning Modules', LearningModule::count())
                    ->description('Jumlah Learning Modules')
                    ->descriptionIcon('heroicon-o-clipboard-document-list')
                    ->descriptionColor('primary'),
                Stat::make('Tasks', Task::count())
                    ->description('Jumlah Task')
                    ->descriptionIcon('heroicon-o-clipboard-document-check')
                    ->descriptionColor('primary'),
            ];
        }
    }
}
