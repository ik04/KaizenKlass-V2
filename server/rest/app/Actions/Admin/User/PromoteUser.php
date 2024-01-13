<?php

namespace App\Actions\Admin\User;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Validation\UnauthorizedException;

class PromoteUser{
    public function handle(User $id){
        if($id->role>Role::CROSSCHECKER->value){
            $id->role = $id->role - 1;
            $id->save();
        }else{
            throw new UnauthorizedException(code:403,message:"No more Promotions");
        }
    }
}