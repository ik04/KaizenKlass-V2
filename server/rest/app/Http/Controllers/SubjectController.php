<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class SubjectController extends Controller
{
    // adding a year field to differ btw subjects and then a class field to differ btw assignments
    public function getSubjectId($subjectUuid){
        $actualSubjectId = Subject::select("id")->where("subject_uuid",$subjectUuid)->first("id")->id;
        return $actualSubjectId;

    }
    public function addSubject(Request $request){
        $validation = Validator::make($request->all(),[
            "subject" => "required|string"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }
        $validated = $validation->validated();
        Subject::create([
            "subject" => $validated["subject"],
            "subject_uuid" => Uuid::uuid4()
        ]);
    }
    public function getSubjects(Request $request){
        $subjects = Subject::select("subject","subject_uuid")->get();
        return response()->json(["subjects"=>$subjects],200);
    }

    public function deleteSubject($subjectUuid)
    {
        if (Subject::where('subject_uuid', $subjectUuid)->exists()) {
            Subject::where('subject_uuid', $subjectUuid)->delete();
    
            return response()->json(["message" => "Subject deleted successfully"], 200);
        }
    
        return response()->json(["error" => "Subject not found"], 404);
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
