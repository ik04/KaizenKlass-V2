<?php

namespace App\Actions\Admin\Subject;

use App\Models\Subject;

class DeleteSubject{
    public function handle(Subject $id){
         $id->delete();
    }

}