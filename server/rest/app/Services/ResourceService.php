<?php
namespace App\Services;

use App\Exceptions\EmptyContentException;
use App\Models\Resource;
use Ramsey\Uuid\Uuid;

class ResourceService{
    public function getResourceId($resourceUuid){
        $resourceId = Resource::select("id")->where("resource_uuid",$resourceUuid)->first("id")->id;
        return $resourceId;
    }
    public function createResource(string $title,string $link){
        $resource = Resource::create([
            "title"=>$title,
            "link"=>$link,
            "resource_uuid"=>Uuid::uuid4()
        ]);
        return $resource;
    }
    public function editResource($data,string $resourceUuid){
        $newResourceData = [];
        $resourceId = $this->getResourceId($resourceUuid);
        $resource = Resource::where("id",$resourceId)->first();
        if($data["title"]){
            $resource["title"] = $data["title"];
        }
        if($data["link"]){
            $resource["link"] = $data["link"];
        }
        if(!$data["link"] && !$data["title"]){
            throw new EmptyContentException(message:"No new content provided.",code:204);
        }
        return $resource;
    }
    public function getResources(){
        $resources = Resource::select("title","link","resource_uuid")->get();
        return $resources;
    }
    public function deleteResource(string $uuid){
        $resource = Resource::where("resource_uuid",$uuid)->first();
        $resource->delete();
        return null;
    }
}