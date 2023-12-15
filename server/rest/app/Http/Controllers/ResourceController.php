<?php

namespace App\Http\Controllers;

use App\Exceptions\EmptyContentException;
use App\Http\Requests\AddResourceRequest;
use App\Http\Requests\UpdateResourceRequest;
use App\Models\Resource;
use App\Services\ResourceService;
use Exception;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function __construct(protected ResourceService $service)
    {
        
    }
    // public function test($uuid){
    //     return Resource::select("title","link","resource_uuid")->where("resource_uuid",$uuid)->first();
    // }
    public function getResources(){
        $resources = $this->service->getResources();
        return response()->json(["resources"=>$resources],200);
    }
    public function addResource(AddResourceRequest $request){
        try{
            $validated = $request->validated();
            $resource = $this->service->createResource($validated["title"],$validated["link"],$validated["description"]??null);
            return response()->json(["resource"=>$resource],201);
        }catch(Exception $e){
            abort(400,message:$e->getMessage());
        }
        catch(EmptyContentException $e){
            abort(code:400,message:$e->getMessage());
        }
    }
    public function addTrackerResource(AddResourceRequest $request){
        try{
            $validated = $request->validated();
            $resource = $this->service->createTrackerResource($validated["title"],$validated["link"],$validated["description"]??null);
            return response()->json(["resource"=>$resource],201);
        }catch(Exception $e){
            abort(400,message:$e->getMessage());
        }
        catch(EmptyContentException $e){
            abort(code:400,message:$e->getMessage());
        }
    }
    public function editResource(UpdateResourceRequest $request,string $resourceUuid){
        try{
            $validated = $request->validated();
            $resource = $this->service->editResource($validated,$resourceUuid);
            return response()->json(["resource"=>$resource],201);
        }catch(Exception $e){
            abort(code:400,message:$e->getMessage());
        }
        catch(EmptyContentException $e){
            abort(code:400,message:$e->getMessage());
        }
    }
    public function deleteResource(string $resourceUuid){
        $this->service->deleteResource($resourceUuid);
        return response()->json(["message"=>"Resource Deleted"],200);
    }
}
