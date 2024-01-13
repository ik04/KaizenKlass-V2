<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Subject\AddSubject;
use App\Actions\Admin\Subject\AddSubjects;
use App\Actions\Admin\Subject\DeleteSubject;
use App\Actions\Admin\Subject\GetSubjects;
use App\Http\Requests\AddSubjectRequest;
use App\Http\Requests\AddSubjectsRequest;
use App\Models\Subject;
use Exception;

class SubjectController{
    public function viewSubjects(GetSubjects $getSubjects){
        $subjects = $getSubjects->handle();
        return view('pages.subjects.view',["subjects"=>$subjects]);
    }
    public function addSubjectView(GetSubjects $getSubjects){
        $subjects = $getSubjects->handle();

        return view('pages.subjects.add',["subjects"=>$subjects]);
    }
    public function deleteSubject(DeleteSubject $deleteSubject,Subject $id){
        $deleteSubject->handle($id);
        return redirect()->route('subjects.view')->with('success', 'Subject deleted successfully');
    }
    public function addSubject(AddSubjectRequest $request,AddSubject $addSubject){
        [
            "subject" => $subject
        ] = $request->validated();
        try{
            $subject = $addSubject->handle($subject);
            return redirect()->route('subjects.add')->with('success','Subject Added Successfully');
        }catch(Exception $e){
            // no real scope for errors
        }
    }
    public function addSubjects(AddSubjectsRequest $request, AddSubjects $addSubject){
        $validated = $request->validated();
        try{
            $addSubject->handle(json_decode($validated["subjects"]));
            return redirect()->route('subjects.add')->with('success','Subjects Added Successfully!');
        }catch(Exception $e){
        }
    }
    
}