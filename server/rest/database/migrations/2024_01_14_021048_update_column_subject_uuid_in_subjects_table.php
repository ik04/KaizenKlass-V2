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
        Schema::table('subjects', function (Blueprint $table) {
        // Drop the unique index before changing the column type
        $table->dropUnique('subjects_subject_uuid_unique');
                    
        // Change the column type
        $table->string('subject_uuid')->change();
        
        // Add the unique index back
        $table->unique('subject_uuid', 'subjects_subject_uuid_unique');            
        // too lazy to change to slug across the board
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            //
        });
    }
};
