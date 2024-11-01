<?php

namespace App\Filament\Pages\Auth;

use Illuminate\Contracts\Support\Htmlable;

class login extends \Filament\Pages\Auth\Login
{
    public function getHeading(): string | Htmlable
    {
        return 'Teacher Login';
    }
}