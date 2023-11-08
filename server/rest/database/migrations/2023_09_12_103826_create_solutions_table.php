<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->string("content");
            $table->string("description")->nullable();
            $table->uuid("solution_uuid")->unique();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("assignment_id");
            $table->foreign("user_id")->references("id")->on('users')->onDelete("cascade");
            $table->foreign("assignment_id")->references("id")->on('assignments')->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};
