<?php

namespace App\Services;

use App\Exceptions\SolutionNotFoundException;
use App\Models\Solution;
use Exception;
use Ramsey\Uuid\Uuid;

class SolutionService{
    public function __construct(protected AssignmentService $assignmentService)
    {
        
    }

    public function addSolution(string $description,string $assignmentUuid,string $content,int $userId){
        $assignmentId = $this->assignmentService->getAssignmentId($assignmentUuid);
            $solution = Solution::create([
             "description" => $description,
             "user_id" => $userId,
             "assignment_id" => $assignmentId,
             "solution_uuid" => Uuid::uuid4(),
             "content" => $content 
            ]);
            return $solution;
    }

    public function updateSolution(?string $description,?string $content,string $solutionUuid,){
        $solution = Solution::where('solution_uuid', $solutionUuid)->first();

    if (!$solution) {
        throw new SolutionNotFoundException(message:"Solution not found",code:404);
    }
    if($description == null && $content == null){
        throw new Exception(message:"Nothing to update", code:400);
    }

    if ($description != null) {
        $solution->description = $description;
    }
    if ($content != null) {
        $solution->content = $content;
    }
    $solution->save();

    return $solution;

    }

    public function updateOwnSolution(?string $description,?string $content,string $solutionUuid,int $userId){
        $solution = Solution::where('solution_uuid', $solutionUuid)
        ->where('user_id', $userId)
        ->first();
    if (!$solution) {
        throw new SolutionNotFoundException(message:"Solution not found",code:404);
    }
    if($description == null && $content == null){
        throw new Exception(message:"Nothing to update", code:400);
    }
    if ($description != null) {
        $solution->description = $description;
    }
    if ($content != null) {
        $solution->content = $content;
    }
    $solution->save();

    return $solution;

    }

    public function deleteSolution(string $solutionUuid){
        $solution = Solution::where('solution_uuid', $solutionUuid)->first();
    if (!$solution) {
        throw new SolutionNotFoundException(message:"Solution not found",code:404);
    }
    $solution->delete();
    }

    public function deleteOwnSolution(string $solutionUuid,int $userId){
        $solution = Solution::where('solution_uuid', $solutionUuid)
        ->where('user_id', $userId)
        ->first();    
        if (!$solution) {
        throw new SolutionNotFoundException(message:"Solution not found",code:404);
    }
    
    $solution->delete();
    }
}