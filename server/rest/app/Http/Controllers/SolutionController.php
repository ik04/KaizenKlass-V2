<?php

namespace App\Http\Controllers;

use App\Exceptions\EmptyDescriptionException;
use App\Exceptions\SolutionNotFoundException;
use App\Http\Requests\AddSolutionRequest;
use App\Http\Requests\UpdateSolutionRequest;
use App\Models\Assignment;
use App\Models\Solution;
use App\Services\SolutionService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

// todo: exception handling
class SolutionController extends Controller
{
    public function __construct(protected SolutionService $service)
    {
        
    }


    public function getAssignmentId($uuid){
        $assignmentId = Assignment::select("id")->where("assignment_uuid", $uuid)->first("id")->id;
        return $assignmentId;
    }
    public function addSolution(AddSolutionRequest $request){
        try{
            $validated = $request->validated();
            $solution = $this->service->addSolution($validated["description"] ?? null,$validated["assignment_uuid"],$validated["content"] ?? null,$request->user()->id);
            return response(["solution" => $solution],201);
        }catch(EmptyDescriptionException $e ){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }
    public function getSolutions(Request $request){
        return response()->json(["solutions"=>Solution::all()],200);
    }

    public function updateSolution(UpdateSolutionRequest $request, $solutionUuid)
{   
    try{   
        $validated = $request->validated();
        $solution = $this->service->updateSolution($validated["description"] ?? null,$validated["content"] ?? null,$solutionUuid);
        return response()->json(["message" => "Solution updated successfully","solution" => $solution], 200);
    }
    catch(SolutionNotFoundException $e){
        return response()->json(["error"=> $e->getMessage()],$e->getCode());
    }
    catch(Exception $e){
        return response()->json(["error" => $e->getMessage()],$e->getCode());
    }
}


//     public function updateSolution(Request $request, $solutionUuid)
// {   
//     $solution = Solution::where('solution_uuid', $solutionUuid)->first();

//     if (!$solution) {
//         return response()->json(["error" => "Solution not found"], 404);
//     }

//     if ($request->has('description')) {
//         $solution->description = $request->input('description');
//     }

//     if ($request->hasFile('content')) {
//         try {
//             $content = $request->file('content');
//             $content_name = time() . '.' . $content->getClientOriginalExtension();
//             Storage::disk('public')->put("/solution_content/" . $content_name, file_get_contents($content));
//             $url = Storage::url("solution_content/" . $content_name);
//             $solution->content = $url;
//         } catch (Exception $e) {
//             return response()->json(["error" => $e->getMessage()], 500);
//         }
//     }

//     $solution->save();

//     return response()->json(["message" => "Solution updated successfully"], 200);
// }

public function deleteSolution($solutionUuid)
{
    $this->service->deleteSolution($solutionUuid);
    return response()->json(["message" => "Solution deleted successfully"], 200);
}
// public function deleteSolution(Request $request, $solutionUuid)
// {
//     $solution = Solution::where('solution_uuid', $solutionUuid)->first();

//     if (!$solution) {
//         return response()->json(["error" => "Solution not found"], 404);
//     }

//     if (!empty($solution->content)) {
//         $contentPath = public_path($solution->content);
//         if (File::exists($contentPath)) {
//             File::delete($contentPath);
//         }
//     }
//     $solution->delete();

//     return response()->json(["message" => "Solution deleted successfully"], 200);
// }

public function updateOwnSolution(UpdateSolutionRequest $request, $solutionUuid)
{
    $validated = $request->validated();
    $solution = $this->service->updateOwnSolution($validated["description"] ?? null,$validated["content"] ?? null,$solutionUuid,$request->user()->id);
    return response()->json(["message" => "Solution updated successfully","solution" => $solution], 200);
}

public function deleteOwnSolution($solutionUuid)
{
    try{
        $this->service->deleteSolution($solutionUuid);
        return response()->json(["message" => "Solution deleted successfully"], 200);
    }
    catch(NotFoundResourceException $e){
        return response()->json(["error" => $e->getMessage()],$e->getCode());
    }
    catch(Exception $e){
        return response()->json(["error" => $e->getMessage()],$e->getCode());
    }
}
}
