<?php

namespace App\Services;

use App\Models\Test;
use DateTime;

class TestService{
    public function __construct(protected SubjectService $subjectService){
        

    }

    public function createTest($title, ?DateTime $examDate = null,$subjectUuid){
        $subjectId = $this->subjectService->getSubjectId($subjectUuid);
        $data = [
            "title" => $title,
            "subject_id" => $subjectId
        ];
        if($examDate){
            $data["exam_date"] = $examDate;
        }
        $test = Test::create($data);
        return $test;
    }
}