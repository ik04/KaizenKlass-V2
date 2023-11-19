<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Models\Assignment;
use App\Models\Subject;
use App\Models\User;
use App\Services\AssignmentService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;
use App\Exceptions\NotFoundException;
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
                $validated["description"],
                $validated["subject_uuid"],
                $validated["content"] ?? null,
                $validated["link"] ?? null,
                $validated["deadline"] ?? null
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
    
    // public function addAssignment(Request $request){
    //     //  * 7 fields
    //     $validation = Validator::make($request->all(),[
    //         "title" => "required|string",
    //         "subject_uuid" => "required|uuid",
    //         "description" => "string|nullable",
    //         "link"=>"string|nullable",
    //         "content" => "file|mimetypes:application/pdf,text/plain,image/jpeg,image/jpg,image/png|nullable",]);
    //     if($validation->fails()){
    //         return response()->json($validation->errors()->all(),400);
    //     }
    //     $validated = $validation->validated();

    //     if (!Subject::where("subject_uuid", $validated["subject_uuid"])->exists()) {
    //         return response()->json(["message" => "Subject not found"], 404);
    //     }

    //     $subjectId = $this->getSubjectId($validated["subject_uuid"]);

    //     if($request->has('content')){
    //         try{
    //             $content = $request->file('content');
    //             $content_name = time().'.'.$content->getClientOriginalExtension();
    //             Storage::disk('public')->put("/assignment_content/".$content_name,file_get_contents($content));
    //             $url = Storage::url("assignment_content/".$content_name);
    //         }catch(Exception $e){
    //            return $e->getMessage();
    //         }
    //         $assignment = Assignment::create([
    //             "title" => $validated["title"],
    //             "description" => $validated["description"],
    //             "subject_id" => $subjectId,
    //             "assignment_uuid" => Uuid::uuid4(),
    //             "content" => $url,
    //             "link" => $validated["link"]
    //         ]);
    //         return response()->json(["assignment" => $assignment],201);
    //     }


    //     if($request->has("link")){
    //         $assignment = Assignment::create([
    //             "title" => $validated["title"],
    //             "description" => $validated["description"],
    //             "subject_id" => $subjectId,
    //             "assignment_uuid" => Uuid::uuid4(),
    //             "link" => $validated["link"]
    //         ]);
    //         return response()->json(["assignment" => $assignment],201);
    //     }
    //     $assignment = Assignment::create([
    //         "title" => $validated["title"],
    //         "description" => $validated["description"],
    //         "subject_id" => $subjectId,
    //         "assignment_uuid" => Uuid::uuid4(),
    //     ]);
    //     return response()->json(["assignment" => $assignment],201);

    // }


    public function editAssignment(UpdateAssignmentRequest $request, $assignmentUuid)
    {
        try {
            $assignment = $this->service->editAssignment($request, $assignmentUuid);
            return response()->json(["assignment" => $assignment], 200);
        }catch(Exception $e){
            abort(code:404,message:$e->getMessage());
        }
    }



//     public function editAssignment(Request $request, $assignmentUuid)
// {
//     $validator = Validator::make(['uuid' => $assignmentUuid], [
//         'uuid' => 'required|uuid',
//     ]);

//     if ($validator->fails()) {
//         return response()->json(["message" => "Invalid UUID"], 400);
//     }

//     $validation = Validator::make($request->all(), [
//         "title" => "string",
//         "description" => "string|nullable",
//         "link" => "string|nullable",
//         "content" => "file|mimetypes:application/pdf|nullable",
//     ]);

//     if ($validation->fails()) {
//         return response()->json($validation->errors()->all(), 400);
//     }

//     if (!Assignment::where("assignment_uuid", $assignmentUuid)->exists()) {
//         return response()->json(["message" => "Assignment not found"], 404);
//     }

//     $assignmentId = $this->getAssignmentId($assignmentUuid);

//     $assignment = Assignment::find($assignmentId);

//     if (!$assignment) {
//         return response()->json(["error" => "Assignment not found"], 404);
//     }

//     $requestData = $validation->validated();

//     if (isset($requestData['title'])) {
//         $assignment->title = $requestData['title'];
//     }

//     if (isset($requestData['description'])) {
//         $assignment->description = $requestData['description'];
//     }

//     if (isset($requestData['link'])) {
//         $assignment->link = $requestData['link'];
//     }

//     if ($request->hasFile('content')) {
//         try {
//             $content = $request->file('content');
//             $content_name = time() . '.' . $content->getClientOriginalExtension();
//             Storage::disk('public')->put("/assignment_content/" . $content_name, file_get_contents($content));
//             $url = Storage::url("assignment_content/" . $content_name);
//             $assignment->content = $url;
//         } catch (Exception $e) {
//             return response()->json(["error" => $e->getMessage()], 500);
//         }
//     }

//     $assignment->save();

//     return response()->json(["assignment" => $assignment], 200);
// }


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

// // ! integrate into one query if needed,
// public function getAssignment($assignmentUuid){
//     $validator = Validator::make(['uuid' => $assignmentUuid], [
//         'uuid' => 'required|uuid',
//     ]);

//     if ($validator->fails()) {
//         return response()->json(["message" => "Invalid UUID"], 400);
//     }

//     if (!Assignment::where("assignment_uuid", $assignmentUuid)->exists()) {
//         return response()->json(["message" => "Assignment not found"], 404);
//     }

//     $assignmentId = $this->getAssignmentId($assignmentUuid);

//     $assignmentDetails = Assignment::select("title","description","content","link","assignment_uuid")->where("id",$assignmentId)->first();
//     return response()->json(["assignment" => $assignmentDetails],200);
// }




public function getSolutionsByAssignment($assignmentUuid)
{
    $result = $this->service->getSolutionsByAssignment($assignmentUuid);

        return response()->json($result, 200);
}

// public function getSolutionsByAssignment(Request $request, $assignmentUuid)
// {
//     $assignment = Assignment::with(["solutions"])
//         ->where("assignment_uuid", $assignmentUuid)
//         ->first();

//     if (!$assignment) {
//         return response()->json(["message" => "Assignment not found"], 404);
//     }

//     $assignmentContent = null;
//     if (!empty($assignment->content)) {
//         $contentPath = public_path($assignment->content);

//         if (File::exists($contentPath)) {
//              // Read the content of the file
//              $fileContent = file_get_contents($contentPath);

//              // Encode the content as base64
//              $assignmentContent = base64_encode($fileContent);
//         }
//     }

//     $solutionsData = [];
//     foreach ($assignment->solutions as $solution) {
//         $content = null;

//         if (!empty($solution->content)) {
//             $contentPath = public_path($solution->content);
//             if (File::exists($contentPath)) {
//                 $fileContent = file_get_contents($contentPath);
//                 $content = base64_encode($fileContent);
//             }
//         }

//         $user = User::select("name","user_uuid")->where("id",$solution->user_id)->first();
//         $username = $user->name;
//         $userUuid = $user->user_uuid;

//         $solutionsData[] = [
//             "description" => $solution->description,
//             "content" => $content, 
//             "solution_uuid" => $solution->solution_uuid,
//             "username" => $username,
//             "user_uuid" => $userUuid
//         ];
//     }

//     // Return the assignment details along with content as base64 encoded string
//     return response()->json([
//         "assignment" => [
//             "title" => $assignment->title,
//             "description" => $assignment->description,
//             "content" => $assignmentContent, // Content as base64 encoded string
//             "link" => $assignment->link,
//             "assignment_uuid" => $assignment->assignment_uuid
//         ],
//         "solutions" => $solutionsData
//     ], 200);
// }



    public function getAssignmentsWithSubjects(Request $request){
        $assignments = $this->service->getAssignmentsWithSubjects();
    return response()->json(["assignments"=>$assignments],200);
    }


    public function getAssignmentsBySubject($subjectUuid){
    $subjectAndAssignments = $this->service->getAssignmentsBySubject($subjectUuid);
    return response()->json(["assignments"=>$subjectAndAssignments["assignments"],"subject"=>$subjectAndAssignments["subjectName"]],200);
    }

    public function getAssignmentsWithDeadline(){
        $assignmentsWithDeadline = $this->service->getAssignmentsWithDeadline();
        return response()->json(["assignments"=>$assignmentsWithDeadline],200);
    }
}
