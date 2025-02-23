<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('color');
            $table->string('icon');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracks');
    }
};