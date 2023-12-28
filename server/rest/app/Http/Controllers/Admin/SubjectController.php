<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Subject\DeleteSubject;
use App\Actions\Admin\Subject\GetSubjects;
use App\Models\Subject;

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
    public function addSubject(){
        
    }
 

}