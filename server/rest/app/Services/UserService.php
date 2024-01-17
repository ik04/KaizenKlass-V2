<?php

namespace App\Services;

use App\Enums\Role;
use App\Exceptions\AlreadyDemotedException;
use App\Exceptions\AlreadyPromotedException;
use App\Exceptions\IncorrectPasswordException;
use App\Exceptions\UserNotFoundException;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class UserService{
    public function getUserId($userUuid){
        $userId = User::select("id")->where("user_uuid",$userUuid)->first("id")->id;
        return $userId;
    }
    public function register(string $email,string $name, string $password, Role $role){
        $user = User::create([
            "email" => $email,
            "name" => $name,
            "password" => Hash::make($password),
            "user_uuid" => Uuid::uuid4(),
            "role" => $role->value,
        ]);
        return $user;
    }
    public function login(string $email, string $password){
        $user = User::where("email",$email)->first();
        if(!$user){
            throw new UserNotFoundException(message:"User is not registered",code:400);
        }
        if(!Hash::check($password,$user->password)){
            throw new IncorrectPasswordException(message:"Incorrect Password",code:400);
        }
        return $user;
    }

    public function loginWeb($validatedData){
        return auth()->attempt($validatedData);
    }

    public static function isAdmin(int $role): bool
    {
        return $role === Role::ADMIN->value;
    }
    public static function isCrosschecker(int $role): bool
    {
        return $role === Role::CROSSCHECKER->value;
    }
    public static function isContributor(int $role): bool
    {
        return $role === Role::CONTRIBUTOR->value;
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
    public function promote(string $userUuid)
{
    $userId = $this->getUserId($userUuid);
    $user = User::where("id", $userId)->first();

    if (!$user) {
        throw new Exception("User not found", 404);
    }

    $role = $user->role;
    $newRole = $role + 1;

    if ($newRole > Role::ADMIN->value) {
        throw new Exception("Invalid role", 403);
    }

    if ($role == Role::CROSSCHECKER->value) {
        throw new AlreadyPromotedException("User is already a crosschecker", 403);
    }

    $user->role = $newRole;
    $user->save();

    return $user;
}


    public function demote(string $userUuid){
    $userId = $this->getUserId($userUuid);
    $user = User::where("id", $userId)->first();

    if (!$user) {
        throw new Exception("User not found", 404);
    }

    $role = $user->role;
    $newRole = $role - 1;

    if ($newRole < Role::CONTRIBUTOR->value) {
        throw new Exception("Invalid role", 403);
    }
    if ($role == Role::CONTRIBUTOR->value) {
        throw new AlreadyDemotedException("User is already a contributor", 403);
    }
    $user->role = $newRole;
    $user->save();

    return $user;

    }

}
