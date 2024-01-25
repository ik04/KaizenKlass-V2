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
    public function getSelectedSubject($userId){
        $selectedSubjects = SelectedSubject::leftJoin('subjects', 'selected_subjects.id', '=', 'subjects.id')
        ->select('selected_subjects.selection_uuid', 'subjects.subject','subjects.subject_uuid') // Select the columns you need
        ->where('selected_subjects.user_id', '=', $userId) // Add any additional conditions if needed
        ->get(); 
        return $selectedSubjects;
        }

        public function searchSelectedSubjects($query, $userId){
            $results = SelectedSubject::leftJoin('subjects', 'selected_subjects.id', '=', 'subjects.id')
                ->select('selected_subjects.selection_uuid', 'subjects.subject', 'subjects.subject_uuid')
                ->where('selected_subjects.user_id', '=', $userId)
                ->where(function ($subquery) use ($query) {
                    $subquery->where('subjects.subject', 'LIKE', '%' . $query . '%')
                        ->orWhere('subjects.subject_uuid', 'LIKE', '%' . $query . '%');
                })
                ->get();
                
            return $results;
        }
}