<?php

namespace App\Actions\Admin\Subject;
use Illuminate\Support\Str;
use App\Models\Subject;
use Ramsey\Uuid\Uuid;

class AddSubject{
    public function handle(string $subject){
        $subject = Subject::create(
            [
                "subject" => $subject,
                "subject_uuid" => Str::slug($subject)
            ]
            );
            return $subject;
    }

}