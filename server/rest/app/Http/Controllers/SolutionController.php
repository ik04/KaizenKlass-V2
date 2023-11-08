<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Solution;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

// todo: exception handling
class SolutionController extends Controller
{
    public function getAssignmentId($uuid){
        $actualCategoryId = Assignment::select("id")->where("assignment_uuid", $uuid)->first("id")->id;
        return $actualCategoryId;
    }
    public function addSolution(Request $request){
        $validation = Validator::make($request->all(),[
            "content" => "file|mimetypes:application/pdf|nullable",
            "assignment_uuid" => "uuid|required",
            "description" => "string|nullable"
        ]);
            if($validation->fails()){
                return response()->json($validation->errors()->all(),400);
            }
            $validated = $validation->validated();
            $assignmentId = $this->getAssignmentId($validated["assignment_uuid"]);
            if($request->has('content')){
                try{
                    $content = $request->file('content');
                    $content_name = time().'.'.$content->getClientOriginalExtension();
                    Storage::disk('public')->put("/solution_content/".$content_name,file_get_contents($content));
                    $url = Storage::url("solution_content/".$content_name);
                }catch(Exception $e){ 
                   return $e->getMessage();
                }
            }

            $solution = Solution::create([
             "description" => $validated["description"],
             "user_id" => $request->user()->id,
             "assignment_id" => $assignmentId,
             "solution_uuid" => Uuid::uuid4(),
             "content" => $url
            ]);
            return response(["solution" => $solution],201);
            // to append to existing solutions afterwards
    }
    public function getSolutions(Request $request){
        return response()->json(["solutions"=>Solution::all()],200);

    }

    public function updateSolution(Request $request, $solutionUuid)
{
    // Find the solution by its UUID
    $solution = Solution::where('solution_uuid', $solutionUuid)->first();

    if (!$solution) {
        return response()->json(["error" => "Solution not found"], 404);
    }

    if ($request->has('description')) {
        $solution->description = $request->input('description');
    }

    if ($request->hasFile('content')) {
        try {
            $content = $request->file('content');
            $content_name = time() . '.' . $content->getClientOriginalExtension();
            Storage::disk('public')->put("/solution_content/" . $content_name, file_get_contents($content));
            $url = Storage::url("solution_content/" . $content_name);
            $solution->content = $url;
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    $solution->save();

    return response()->json(["message" => "Solution updated successfully"], 200);
}

public function deleteSolution(Request $request, $solutionUuid)
{
    $solution = Solution::where('solution_uuid', $solutionUuid)->first();

    if (!$solution) {
        return response()->json(["error" => "Solution not found"], 404);
    }

    if (!empty($solution->content)) {
        $contentPath = public_path($solution->content);
        if (File::exists($contentPath)) {
            File::delete($contentPath);
        }
    }
    $solution->delete();

    return response()->json(["message" => "Solution deleted successfully"], 200);
}

public function updateOwnSolution(Request $request, $solutionUuid)
{
    $solution = Solution::where('solution_uuid', $solutionUuid)
        ->where('user_id', $request->user()->id)
        ->first();

    if (!$solution) {
        return response()->json(["error" => "Solution not found"], 404);
    }

    if ($request->has('description')) {
        $solution->description = $request->input('description');
    }
    if ($request->hasFile('content')) {
        try {
            $content = $request->file('content');
            $content_name = time() . '.' . $content->getClientOriginalExtension();
            Storage::disk('public')->put("/solution_content/" . $content_name, file_get_contents($content));
            $url = Storage::url("solution_content/" . $content_name);
            $solution->content = $url;
        } catch (Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    $solution->save();
    return response()->json(["message" => "Solution updated successfully"], 200);
}

public function deleteOwnSolution(Request $request, $solutionUuid)
{
    $solution = Solution::where('solution_uuid', $solutionUuid)
        ->where('user_id', $request->user()->id)
        ->first();
    if (!$solution) {
        return response()->json(["error" => "Solution not found"], 404);
    }

    if (!empty($solution->content)) {
        $contentPath = public_path('solution_content/' . basename($solution->content));
        if (File::exists($contentPath)) {
            File::delete($contentPath);
        }
    }
    $solution->delete();
    return response()->json(["message" => "Solution deleted successfully"], 200);
}
}
