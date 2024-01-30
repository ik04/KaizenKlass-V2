<?php

namespace App\Services;

use App\Exceptions\TestAlreadyExistsException;
use App\Exceptions\TestNotFoundException;
use App\Models\Test;
use App\Models\User;
use Carbon\Carbon;
use DateTime;
use Ramsey\Uuid\Uuid;

class TestService{
    public function __construct(protected SubjectService $subjectService){
        

    }
    public function getTestId($uuid){
        $testId = Test::select("id")->where("test_uuid",$uuid)->first();
        if(!$testId){
            throw new TestNotFoundException(message:"invalid uuid, test not found",code:404);
        }
        return $testId;
    }

    public function createTest($title, string $examDate = null,$subjectUuid){
        $subjectId = $this->subjectService->getSubjectId($subjectUuid);
        $data = [
            "title" => $title,
            "subject_id" => $subjectId,
            "test_uuid" => Uuid::uuid4()
        ];
        if($examDate){
            $data["exam_date"] = $examDate;
        }
        $existingTest = Test::where('subject_id', $subjectId)
                        ->whereRaw('LOWER(title) = ?', [strtolower($title)])
                        ->first();
        if($existingTest){
            throw new TestAlreadyExistsException(message:"Test with same title already exists for this subject",code:400);
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
    public function getTestsBySubjects(string $subjectUuid){
        $subjectId = $this->subjectService->getSubjectId($subjectUuid);
        $tests = Test::select("title","exam_date","test_uuid")->where("subject_id",$subjectId)->get();
        return $tests;
    }
   public function getTestWithResources(string $uuid)
{
    $test = Test::with("testResources") // Eager load the 'testResources' relationship
        ->join("subjects", "subjects.id", "=", "tests.subject_id")
        ->select("tests.title", "tests.exam_date", "tests.test_uuid", "subjects.subject_uuid", "subjects.subject")
        ->where("tests.test_uuid", $uuid)
        ->first();

    if (!$test) {
        throw new TestNotFoundException(message: "Test not found", code: 404);
    }
    $resourceData = [];

    foreach ($test->testResources as $resource) {
        $user = User::select("name", "user_uuid")->where("id", $resource->user_id)->first();
        $username = $user->name;
        $userUuid = $user->user_uuid; 
        $resourceData[] = [
            "user_uuid" => $userUuid,
            "username" => $username,
            "test_resource_uuid" => $resource->test_resource_uuid,
            "description" => $resource->description,
            "content" => $resource->content
        ];
    }

    return [
        "title" => $test->title,
        "exam_date" => $test->exam_date,
        "test_uuid" => $test->test_uuid,
        "subject_uuid" => $test->subject_uuid,
        "subject" => $test->subject,
        "resources" => $resourceData,
    ];
}

    public function deleteTest(string $uuid){
        $test = Test::where("test_uuid",$uuid)->first();
        if(!$test){
            throw new TestNotFoundException(message:"Test Not Found",code:404);
        }
        $test->delete();
    }
    public function updateTest(string $uuid,$data){
        $test = Test::where("test_uuid",$uuid)->first();
        if(!$test){
            throw new TestNotFoundException(message:"Test Not Found",code:404);
        }
        if (isset($data['title'])) {
            $test->title = $data['title'];
        }
        if (isset($data['subject_uuid'])) {
            $subjectId = $this->subjectService->getSubjectId($data['subject_uuid']);
            $test->subject_id = $subjectId;
        }
        if (isset($data['exam_date'])) {
            $test->exam_date = Carbon::parse($data['exam_date']);
        }
        $test->save();
        return $test;
    }
}