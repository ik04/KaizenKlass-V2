<?php

namespace App\Services;

use App\Models\Test;
use DateTime;
use Ramsey\Uuid\Uuid;

class TestService{
    public function __construct(protected SubjectService $subjectService){
        

    }

    public function createTest($title, ?DateTime $examDate = null,$subjectUuid){
        $subjectId = $this->subjectService->getSubjectId($subjectUuid);
        $data = [
            "title" => $title,
            "subject_id" => $subjectId,
            "test_uuid" => Uuid::uuid4()
        ];
        if($examDate){
            $data["exam_date"] = $examDate;
        }
        $test = Test::create($data);
        return $test;
    }
    public function getTestsWithSelectedSubjects($userId){
        $tests = Test::join("subjects", "subjects.id", "=", "tests.subject_id")
        ->leftJoin("selected_subjects", "selected_subjects.subject_id", "=", "tests.subject_id")
        ->select("tests.title", "tests.test_uuid", "subjects.subject", "subjects.subject_uuid")->where("selected_subjects.user_id",$userId)
        ->orderBy("tests.id", "DESC")->get();
        return $tests;
    }
    public function getTestsBySubjects($subjectUuid){
        $subjectId = $this->subjectService->getSubjectId($subjectUuid);
        $tests = Test::select("title","exam_date","test_uuid")->where("subject_id",$subjectId)->get();
        return $tests;
    }
}