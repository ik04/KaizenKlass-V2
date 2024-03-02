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
            $this->service->selectSubjects($validated["subject_uuid"],$request->user()->id);
            return response()->json(["message"=>"Subjects added"]);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }
    public function selectSubject(AddSelectedSubjectRequest $request){
        try{
            $validated = $request->validated();
            $this->service->selectSubject($validated["subject_uuid"],$request->user()->id);
            return response()->json(["message"=>"Subject added"]);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }
    public function getSelectedSubjects(Request $request){
        $selectedSubjects = $this->service->getSelectedSubject($request->user()->id);
        return response()->json(["selected_subjects"=>$selectedSubjects],200);
    }

    public function removeSelectedSubject($uuid){
        try{
            $this->service->removeSubject($uuid);
            return response()->json(["message"=>"Selection Removed"]);
        }catch(Exception $e){
            return response()->json(["error"=>$e->getMessage()],$e->getCode());
        }
    }

    public function searchSelectedSubjects(Request $request,$query){
        $results = $this->service->searchSelectedSubjects($query,$request->user()->id);
        return response()->json(["result" => $results,"search_term" => $query],200);
    }

    
}
