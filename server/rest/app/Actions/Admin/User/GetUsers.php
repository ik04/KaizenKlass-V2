<?php

namespace App\Actions\Admin\User;

use App\Models\User;

class GetUsers{

    public function handle(){
        $users = User::select("id","name","email","user_uuid","role")->orderBy("created_at","DESC")->get();
        return $users;
    }
}