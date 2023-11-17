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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string("subject");
            $table->uuid("subject_uuid")->unique();
            // todo: add year field, first add a field for years (feature creep)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    Schema::table('assignments', function (Blueprint $table) {
        $table->dropForeign(['subject_id']);
    });

    Schema::dropIfExists('subjects');
    }
};
