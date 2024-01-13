<?php

namespace App\Actions\Admin\Subject;

use App\Exceptions\InvalidJsonException;
use App\Models\Subject;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Str;

class AddSubjects{
    public function handle($subjects){
        if(!isset($subjects->subjects)){
            throw new InvalidJsonException(message:"invalid json format",code:400);
        }
        $subjects = $subjects->subjects;
        foreach($subjects as $subject){
            $subject = Subject::create([
                "subject" => $subject->subject,
                "subject_uuid" => Str::slug($subject->subject),
            ]);
        }
      
    }

}