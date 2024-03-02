<?php

namespace Database\Seeders;

use App\Models\Year;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class YearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $relativePath = __DIR__ . "/init/years.json";
          $years = file_get_contents($relativePath);
            $years = json_decode($years);
            $years = $years->years;
            foreach($years as $year){
                $subject = Year::create([
                    "year" => $year->year,
                    "year_value" => $year->year_value
                ]);
            }
    }
}
