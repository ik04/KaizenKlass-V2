<?php


namespace App\Services;

use App\Exceptions\EmptyDescriptionException;
use App\Exceptions\TestResourceNotFoundException;
use App\Models\TestResource;
use Exception;
use InvalidArgumentException;
use Ramsey\Uuid\Uuid;

class TestResourceService{
    public function __construct(protected TestService $testService)
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
    public function createTestResource(string $description,string $testUuid,?string $content,int $userId){
        $testId = $this->testService->getTestId($testUuid);
        $data = [
            "user_id" => $userId,
            "assignment_id" => $testId,
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
            $solution = TestResource::create($data);
            return $solution;
    }
    public function deleteOwnTestResource(string $testResourceUuid,int $userId){
        $testResource = TestResource::where('test_resource_uuid', $testResourceUuid)
        ->where('user_id', $userId)
        ->first();
        if (!$testResource) {
        throw new TestResourceNotFoundException(message:"Test Resource not found",code:404);
    }
    $testResource->delete();
    }
    public function updateOwnTestResource(?string $description,?string $content,string $testResourceUuid,int $userId){
        $testResource = TestResource::where("test_resource_uuid",$testResourceUuid)->where("user_id",$userId)->first();
        if(!$testResource){
            throw new TestResourceNotFoundException(message:"Test Resource not found",code:404);
        }
        if($description == null && $content == null){
            throw new Exception(message:"Nothing to update", code:400);// todo: consider edgecases
        }
        if ($description != null) {
            if(strip_tags($description) == ""){
                throw new EmptyDescriptionException(message:"Empty Description, please don't use tags.",code:400);
            }
            $testResource->description = strip_tags($description);
        }
        if ($content != null) {
            $testResource->content = $this->convertDriveLinkToDownloadLink($content);
        }
        $testResource->save();
    
        return $testResource;
    }



}