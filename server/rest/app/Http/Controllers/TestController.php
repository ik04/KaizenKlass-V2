<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTestRequest;
use App\Services\TestService;
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
}
