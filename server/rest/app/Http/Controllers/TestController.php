<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTestRequest;
use App\Services\TestService;
use Exception;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function __construct(protected TestService $service)
    {
        
    }
    public function createTest(AddTestRequest $request){
        $validated = $request->validated();
        $test = $this->service->createTest($validated["title"],$validated["exam_date"],$validated["subject_uuid"]);
        return response()->json(["test"=>$test,"message"=>"Test added successfully!"],201);
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
}
