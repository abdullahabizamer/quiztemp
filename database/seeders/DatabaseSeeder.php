<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Track;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        // Create tracks
        $tracks = [
            [
                'title' => 'Software Engineering',
                'description' => 'Master software development concepts and best practices',
                'color' => 'bg-blue-50',
            ],
            [
                'title' => 'Network Engineering',
                'description' => 'Learn networking protocols and infrastructure design',
                'color' => 'bg-green-50',
            ],
            [
                'title' => 'AI Engineering',
                'description' => 'Explore machine learning and artificial intelligence',
                'color' => 'bg-purple-50',
            ],
            [
                'title' => 'General Engineering',
                'description' => 'Core engineering principles and fundamentals',
                'color' => 'bg-orange-50',
            ],
        ];

        foreach ($tracks as $track) {
            Track::create($track);
        }
    }
}