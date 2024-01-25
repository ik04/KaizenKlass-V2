<?php

namespace App\Services;

use App\Exceptions\InvalidSlugException;
use App\Models\Subject;
use Ramsey\Uuid\Uuid;

class SubjectService{
    public function getSubjectId($subjectUuid){
        if(!$actualSubjectId = Subject::select("id")->where("subject_uuid",$subjectUuid)->first("id")->id){
            throw new InvalidSlugException(message:"Invalid Subject Slug", code:400);
        }
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
        $subjects = Subject::select("subject","subject_uuid")->orderBy('created_at',"DESC")->get();
        return $subjects;
    }
    public function deleteSubject($subjectUuid){
        if (!Subject::where('subject_uuid', $subjectUuid)->exists()) {
            return response()->json(["error" => "Subject not found"], 404);
        }
        Subject::where('subject_uuid', $subjectUuid)->delete();
    }
    
    public function getSubjectDetails($subjectId){
        $subjectDetails = Subject::select("subject","subject_uuid")->where("id",$subjectId)->first();
        return $subjectDetails;
    }
    public function searchSubjects($query){
        $results = Subject::select("subject","subject_uuid")->where('subject', 'LIKE', '%' . $query . '%')
        ->orWhere('subject_uuid', 'LIKE', '%' . $query . '%')
        ->get();
        return $results;
    }
}