<?php

namespace App\Http\Controllers;

use App\Exceptions\AssignmentNotFoundException;
use App\Http\Requests\AddAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Models\Assignment;
use App\Models\Subject;
use App\Models\User;
use App\Services\AssignmentService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\SubjectNotFoundException;
use Illuminate\Validation\ValidationException;

// todo: exception handling
// ! breaking change: adding content table in the future
class AssignmentController extends Controller
{
    public function __construct(protected AssignmentService $service){

    }

    public function getSubjectId($subjectUuid){
        $actualSubjectId = Subject::select("id")->where("subject_uuid", $subjectUuid)->first("id")->id;
        return $actualSubjectId;
    }

    public function getAssignmentId($assignmentUuid){
        $actualAssignmentId = Assignment::where("assignment_uuid", $assignmentUuid)->first()->id;
        return $actualAssignmentId;
    }

    public function getAssignments(Request $request){
        // * only for dev
        $assignments = Assignment::all();
        return response()->json(["assignments" => $assignments],200);
    }

    public function addAssignment(AddAssignmentRequest $request){
        try{

            $validated = $request->validated();
            
            $assignment = $this->service->addAssignment(
                $validated["title"],
                $validated["description"] ?? null,
                $validated["subject_uuid"],
                $validated["content"] ?? null,
                $validated["link"] ?? null,
                $validated["deadline"] ?? null    // 

            );
            return response()->json(["assignment" => $assignment],201);
        }catch(ValidationException $e){
            return response()->json(["error" => $e->getMessage()],400);
        }
        catch(Exception $e){
            return response()->json(["error" => $e->getMessage()],400);
        }
        catch(SubjectNotFoundException $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }

    public function editAssignment(UpdateAssignmentRequest $request, $assignmentUuid)
    {
        try {
            $validated = $request->validated();
            $assignment = $this->service->editAssignment($assignmentUuid,$validated);
            return response()->json(["assignment" => $assignment], 200);
        }catch(Exception $e){
            abort(code:404,message:$e->getMessage());
        }
    }

public function deleteAssignment($assignmentUuid)
{
    $validator = Validator::make(['uuid' => $assignmentUuid], [
        'uuid' => 'required|uuid',
    ]);

    if ($validator->fails()) {
        return response()->json(["message" => "Invalid UUID"], 400);
    }
    $this->service->deleteAssignment($assignmentUuid);
    return response()->json(["message" => "Assignment deleted successfully"], 200);
}

    public function getSolutionsByAssignment($assignmentUuid)
    {
        try{

            $result = $this->service->getSolutionsByAssignment($assignmentUuid);
            return response()->json($result, 200);
        }catch(Exception $e){
            return response()->json(["message"=>$e->getMessage()],$e->getCode());
        }
        catch(AssignmentNotFoundException $e){
            return response()->json(["message"=>$e->getMessage()],$e->getCode());
        }
    }

    public function getAssignmentsWithSubjects(Request $request){
        $assignments = $this->service->getAssignmentsWithSubjects();
    return response()->json(["assignments"=>$assignments],200);
    }

    public function getAssignmentsBySubject($subjectUuid){
        try{
                $subjectAndAssignments = $this->service->getAssignmentsBySubject($subjectUuid);
                return response()->json(["assignments"=>$subjectAndAssignments["assignments"],"subject"=>$subjectAndAssignments["subjectName"]],200);
        }catch(Exception $e){
                return response()->json(["message"=>$e->getMessage()],$e->getCode());
        }catch(SubjectNotFoundException $e){
            return response()->json(["message"=>$e->getMessage()],$e->getCode());
        }
        }

    public function getAssignmentsWithDeadline(){
        $assignmentsWithDeadline = $this->service->getAssignmentsWithDeadline();
        return response()->json(["assignments"=>$assignmentsWithDeadline],200);
    }
}
