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
        if (!Subject::where('subject_uuid', $subjectUuid)->exists()) {
            
            return response()->json(["error" => "Subject not found"], 404);
        }
        Subject::where('subject_uuid', $subjectUuid)->delete();
        return response()->json(["message" => "Subject deleted successfully"], 200);
    }

    public function getAssignmentsBySubject(Request $request, $subjectUuid){

        $subject = Subject::where('subject_uuid', $subjectUuid)->first();

    if (!$subject) {
        return response()->json(["error" => "Subject not found"], 404);
    }
    $subjectId = $this->getSubjectId($subjectUuid);
    $assignments = Assignment::select(["title","assignment_uuid"])->where("subject_id",$subjectId)->get();
    return response()->json(["assignments"=>$assignments,"subject"=>$subject["subject"]],200);
    }

}
// todo: continue shifting
// todo: test for edgecases and implement checks
