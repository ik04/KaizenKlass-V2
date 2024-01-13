<?php

namespace App\Actions\Admin\User;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Validation\UnauthorizedException;

class DeleteUser{
    public function handle(User $id){
        if($id->role != Role::ADMIN->value)
        $id->delete();
    else{
        throw new UnauthorizedException(message:"can't delete admins",code:403);
    }
    }
}