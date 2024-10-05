<?php

namespace App\Filament\Widgets;

use App\Models\Classroom;
use App\Models\LearningModule;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Pengguna', User::count())
                ->description('All Users')
                ->descriptionIcon('heroicon-o-users')
                ->descriptionColor('primary'),
            Stat::make('Teachers', User::count())
                ->description('All Teachers')
                ->descriptionIcon('heroicon-o-user')
                ->descriptionColor('primary'),
            Stat::make('Students', User::count())
                ->description('All Students')
                ->descriptionIcon('heroicon-o-users')
                ->descriptionColor('primary'),
            Stat::make('Classrooms', Classroom::count())
                ->description('All Classrooms')
                ->descriptionIcon('heroicon-o-academic-cap')
                ->descriptionColor('primary'),
            Stat::make('Learning Modules', LearningModule::count())
                ->description('All Learning Modules')
                ->descriptionIcon('heroicon-o-clipboard-document-list')
                ->descriptionColor('primary'),
            Stat::make('Tasks', LearningModule::count())
                ->description('All Tasks')
                ->descriptionIcon('heroicon-o-clipboard-document-check')
                ->descriptionColor('primary'),
        ];
    }
}
