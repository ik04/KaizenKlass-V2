<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // php artisan db:seed --class=Database\\Seeders\\SubjectSeeder
    public function run(): void
    {
        $relativePath = __DIR__ . "/init/subjects.json";
          $subjects = file_get_contents($relativePath);
            $subjects = json_decode($subjects);
            $subjects = $subjects->subjects;
            foreach($subjects as $subject){
                $subject = Subject::create([
                    "subject" => $subject->subject,
                    "subject_uuid" => Str::slug("$subject->subject")
                ]);
            }
    }
}
