<?php

namespace App\Services;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class UserService{
    public function register(string $email,string $name, string $password, Role $role){
        $user = User::create([
            "email" => $email,
            "name" => $name,
            "password" => Hash::make($password),
            "user_uuid" => Uuid::uuid4(),
            "role" => $role->value
        ]);
        return $user;
    }
    public function login(string $email, string $password){
        $user = User::where("email",$email)->first();
        if(!$user){
            return response()->json(["error"=>"User not Found, Please Register"],401);
        }
        if(!Hash::check($password,$user->password)){
            return response()->json(["error"=>"Incorrect Password"],401);
        }
        return $user;
    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }
    public function deleteUser(Uuid $userUuid){
        $user = User::where('user_uuid', $userUuid)->first();

    if (!$user) {
        return response()->json(["error" => "User not found"], 404);
    }

    $user->delete();

    }
    public function deleteOwnAccount(Request $request,Uuid $userUuid){
        if ($userUuid !== $request->user()->user_uuid) {
            return response()->json(["error" => "Unauthorized"], 401);
        }
        $request->user()->delete();
    }
}