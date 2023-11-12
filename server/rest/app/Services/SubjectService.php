<?php

namespace App\Services;
use App\Models\Subject;
use Ramsey\Uuid\Uuid;

class SubjectService{
    public function getSubjectId($subjectUuid){
        $actualSubjectId = Subject::select("id")->where("subject_uuid",$subjectUuid)->first("id")->id;
        return $actualSubjectId;
    }

    public function addSubject(string $subject){
        $subject = Subject::create([
            "subject" => $subject,
            "subject_uuid" => Uuid::uuid4()
        ]);
        return $subject;
    }
    public function getSubjects(){
        $subjects = Subject::select("subject","subject_uuid")->get();
        return $subjects;
    }
    public function deleteSubject(Uuid $subjectUuid){
        if (!Subject::where('subject_uuid', $subjectUuid)->exists()) {
            return response()->json(["error" => "Subject not found"], 404);
        }
        Subject::where('subject_uuid', $subjectUuid)->delete();
    }
    
}