<?php

namespace App\Services;

use App\Exceptions\SelectionNotFoundException;
use App\Models\SelectedSubject;
use Ramsey\Uuid\Uuid;

class SelectedSubjectService{
    public function __construct(protected SubjectService $service)
    {
    }
    
    public function selectSubjects($subjectSlugs,$userId){
        foreach ($subjectSlugs as $slug) {
            $subjectId = $this->service->getSubjectId($slug);
            SelectedSubject::create([
                "user_id" => $userId,
                "subject_id" => $subjectId,
                "selection_uuid" => Uuid::uuid4()
            ]);
        }   
    }
    public function selectSubject($subjectSlug,$userId){
        $subjectId = $this->service->getSubjectId($subjectSlug);
            SelectedSubject::create([
                "user_id" => $userId,
                "subject_id" => $subjectId,
                "selection_uuid" => Uuid::uuid4()
            ]);
    }
    public function removeSubject($uuid){
        if(!$selectedSubject = SelectedSubject::where("selection_uuid",$uuid)->first()){
            throw new SelectionNotFoundException(message:"selection not found", code:404);
        }
        $selectedSubject->delete();
    }
}