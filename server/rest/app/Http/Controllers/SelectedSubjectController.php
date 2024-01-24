<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSelectedSubjectRequest;
use App\Http\Requests\AddSelectedSubjectsRequest;
use App\Services\SelectedSubjectService;
use Exception;
use Illuminate\Http\Request;

class SelectedSubjectController extends Controller
{
    public function __construct(protected SelectedSubjectService $service)
    {
        
    }

    public function selectSubjects(AddSelectedSubjectsRequest $request){
        try{
            $validated = $request->validated();
            $this->service->selectSubjects($validated["subject_uuid"],$request->user());
            return response()->json(["message"=>"Subjects added"]);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }

    public function selectSubject(AddSelectedSubjectRequest $request){
        try{
            $validated = $request->validated();
            $this->service->selectSubject($validated["subject_uuid"],$request->user());
            return response()->json(["message"=>"Subjects added"]);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }

    public function removeSelectedSubject(){
        
    }
}
