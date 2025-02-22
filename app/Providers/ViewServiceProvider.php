<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class ViewServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        View::composer('components.search-filters', function ($view) {
            $view->with('topics', [
                'Data Structures',
                'Algorithms',
                'System Design',
                'Networking',
                'Database Design',
                'Operating Systems',
                'Computer Architecture',
            ]);
        });
    }
}