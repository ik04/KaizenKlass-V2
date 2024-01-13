<?php

namespace App\Actions\Admin\Subject;

use App\Models\Subject;

class GetSubjects{
    public function handle(){
        $subjects = Subject::select("id","subject_uuid","subject","created_at")->orderBy("created_at","DESC")->get();
        return $subjects;
    }
}