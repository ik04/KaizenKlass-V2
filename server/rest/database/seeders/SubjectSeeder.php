<?php

namespace Database\Seeders;

use App\Models\Subject;
use App\Models\Year;
use Exception;
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
        try{

            $relativePath = __DIR__ . "/init/subjects.json";
            $subjects = file_get_contents($relativePath);
            $subjects = json_decode($subjects);
            $subjects = $subjects->subjects;
            foreach($subjects as $subject){
                $year = Year::select("id")->where("year_value",$subject->year)->first();
                $yearId = $year->id;
                $subject = Subject::create([
                    "subject" => $subject->subject,
                    "subject_uuid" => Str::slug("$subject->subject"),
                    "year_id"=> $yearId
                ]);
            }
        }catch(Exception $e){
            abort(code:500,message:$e->getMessage());
        }
    }
}
