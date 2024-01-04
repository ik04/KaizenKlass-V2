<?php

namespace App\Services;

use App\Exceptions\EmptyDescriptionException;
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

    public function addSolution(string $description,string $assignmentUuid,?string $content,int $userId){
        $assignmentId = $this->assignmentService->getAssignmentId($assignmentUuid);
        $data = [
            "user_id" => $userId,
            "assignment_id" => $assignmentId,
            "solution_uuid" => Uuid::uuid4(),
        ];
        if($content){
            $content = $this->convertDriveLinkToDownloadLink($content);
            $data["content"] = $content;
        }
        if($description){
            if(strip_tags($description) == ""){
                throw new EmptyDescriptionException(message:"Empty Description, please don't use tags.",code:400);
            }
            $data["description"] = strip_tags($description);
        }
            $solution = Solution::create($data);
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
        if(strip_tags($description) == ""){
            throw new EmptyDescriptionException(message:"Empty Description, please don't use tags.",code:400);
        }
        $solution->description = strip_tags($description);
    }
    if ($content != null) {
        $solution->content = $this->convertDriveLinkToDownloadLink($content);
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
            if(strip_tags($description) == ""){
                throw new EmptyDescriptionException(message:"Empty Description, please don't use tags.",code:400);
            }
            $solution->description = strip_tags($description);
        }
        if ($content != null) {
            $solution->content = $this->convertDriveLinkToDownloadLink($content);
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