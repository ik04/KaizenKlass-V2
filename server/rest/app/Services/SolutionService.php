<?php

namespace App\Services;

use App\Exceptions\SolutionNotFoundException;
use App\Models\Solution;
use Exception;
use InvalidArgumentException;
use Ramsey\Uuid\Uuid;

class SolutionService{
    public function __construct(protected AssignmentService $assignmentService)
    {
        
    }

    private function convertDriveLinkToDownloadLink(string $originalLink): ?string
    {
        $fileIdRegex = '/\/d\/(.+?)\/|id=(.+?)&|&id=(.+?)($|&)/';
        if (preg_match($fileIdRegex, $originalLink, $match)) {
            $fileId = $match[1] ?? $match[2] ?? $match[3];
            $downloadLink = "https://drive.google.com/uc?export=download&id={$fileId}";
            return $downloadLink;
        }
    
        throw new InvalidArgumentException("Invalid Google Drive link format");
    }

    public function addSolution(string $description,string $assignmentUuid,string $content,int $userId){
        $assignmentId = $this->assignmentService->getAssignmentId($assignmentUuid);
        $content = $this->convertDriveLinkToDownloadLink($content);
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