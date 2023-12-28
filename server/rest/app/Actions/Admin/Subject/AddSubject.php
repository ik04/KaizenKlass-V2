<?php

namespace App\Actions\Admin\Subject;

use App\Models\Subject;
use Ramsey\Uuid\Uuid;

class AddSubject{
    public function handle(string $subject){
        $subject = Subject::create(
            [
                "subject" => $subject,
                "subject_uuid" => Uuid::uuid4()
            ]
            );
            return $subject;
    }

}