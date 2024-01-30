<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTestRequest;
use App\Http\Requests\UpdateTestRequest;
use App\Services\TestService;
use Exception;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function __construct(protected TestService $service)
    {
        
    }
    public function createTest(AddTestRequest $request){
        try{

            $validated = $request->validated();
            $test = $this->service->createTest($validated["title"],$validated["exam_date"] ?? null,$validated["subject_uuid"]);
            return response()->json(["test"=>$test,"message"=>"Test added successfully!"],201);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }
    public function getTestsWithSelectedSubjects(Request $request){
        try{
            $tests = $this->service->getTestsWithSelectedSubjects($request->user()->id);
            return response()->json(["tests"=>$tests],200);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }
    public function getTestsBySubject($uuid){
        try{
            $tests = $this->service->getTestsBySubjects($uuid);
            return response()->json(["tests"=>$tests],200);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage(),"code"=>$e->getCode()]);
        }
    }
    public function getTest($uuid){
        try{
            $test = $this->service->getTestWithResources($uuid);
            return response()->json(["test"=>$test],200);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }

    public function updateTest(UpdateTestRequest $request,$uuid){
        try{
            $validated = $request->validated();
            $test = $this->service->updateTest($uuid,$validated);
            return response()->json(["message"=>"Test Updated!"]);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }
    public function deleteTest($uuid)
{
    try{
        $this->service->deleteTest($uuid);
        return response()->json(["message" => "Assignment deleted successfully"], 200);
    }catch(Exception $e){
        return response()->json(["error"=>$e->getMessage()],$e->getCode());
    }
}
}
