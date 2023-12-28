<?php

namespace App\Actions\Admin;

use App\Exceptions\UserNotFoundException;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Finder\Exception\AccessDeniedException;
class Login{

    public function handle(string $email,string $password){
        $user = User::select("id","password","role")->where("email",$email)->first();
        if(!$user){
            throw new UserNotFoundException(message:"invalid user",code:400);
        }
        if(!UserService::isAdmin($user->role)){
            throw new AccessDeniedException(message:"forbidden",code:403);
        }
        if(!Hash::check($password,$user->password)){
            throw new AccessDeniedException(message:"incorrect credentials",code:403);
        }
        Auth::login($user);
    }

}