<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSubjectRequest;
use App\Models\Assignment;
use App\Models\Subject;
use App\Services\SubjectService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class SubjectController extends Controller
{

    public function __construct(protected SubjectService $service)
    {
        
    }
    // adding a year field to differ btw subjects and then a class field to differ btw assignments
    public function getSubjectId($subjectUuid){
        $actualSubjectId = Subject::select("id")->where("subject_uuid",$subjectUuid)->first("id")->id;
        return $actualSubjectId;

    }
    public function addSubject(AddSubjectRequest $request){
        $validated = $request->validated();
        $subject = $this->service->addSubject($validated["subject"]);
        unset($subject["id"]);
        return response()->json(["subject" => $subject,"message" => "Subject added successfully"]);
        
    }
    public function getSubjects(Request $request){
        $subjects = $this->service->getSubjects();
        return response()->json(["subjects"=>$subjects],200);
    }

    public function deleteSubject($subjectUuid)
    {
        $this->service->deleteSubject($subjectUuid);
        return response()->json(["message" => "Subject deleted successfully"], 200);
    }

  
}
// todo: continue shifting
// todo: test for edgecases and implement checks
