<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Exceptions\AlreadyPromotedException;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class UserController extends Controller
{
    // todo: learn exception handling
    public function __construct(protected UserService $service)
    {
        
    }
    // todo: shift to service class logic
    public function registerAdmin(RegisterUserRequest $request){ 
        $validated = $request->validated();   
        $user = $this->service->register($validated["email"],$validated["name"],$validated["password"],Role::ADMIN);
        unset($user->id);
        return response()->json(["user"=>$user],201);
    }
    public function registerContributor(RegisterUserRequest $request){
        $validated = $request->validated();
        $user = $this->service->register($validated["email"],$validated["name"],$validated["password"],Role::CONTRIBUTOR);
        return response()->json(["user"=>$user],201);
    }
    public function registerCrosschecker(RegisterUserRequest $request){
        $validated = $request->validated();
        $user = $this->service->register($validated["email"],$validated["name"],$validated["password"],Role::CROSSCHECKER);
        return response()->json(["user"=>$user],201);
    }
    public function login(LoginUserRequest $request){
        $validated = $request->validated();
        $user = $this->service->login($validated["email"],$validated["password"]);
        $userToken = $user->createToken("myusertoken")->plainTextToken;
        unset($user->id);
        return response()->json(["user"=>$user,"user_token"=>$userToken],200)->withCookie(cookie()->forever('at',$userToken));
    }

    public function logout(Request $request){
        $this->service->logout($request);
        return response([
            'message' => 'logged out'
        ],200);
    }

    public function userData(Request $request){
        if(!$request->hasCookie("at")){
            return response()->json([
                'error' => "Unauthenticated"
            ],401);
        }
        if($token = \Laravel\Sanctum\PersonalAccessToken::findToken($request->cookie("at"))){
            $user = $token->tokenable;
        }
        else{
            return response()->json([
                'error' => "unauthenticated"
            ],401);
        }
        if(is_null($user)){
            return response()->json([
                'error' => "Unauthenticated"
            ]);
        }
        return response() -> json([
            'email' => $user->email,
            'name' => $user->name,
            'uuid' => $user->user_uuid,
            'role' => $user->role,
            'access_token' => $request -> cookie('at'),
        ],200);
    }
    public function deleteUser(Uuid $userUuid)
{
    // todo: add more checks, to prevent bs
    $this->service->deleteUser($userUuid);
    return response()->json(["message" => "User deleted successfully"], 200);
}

// public function updateUser(Request $request, $userUuid)
// {
//     $user = User::where('user_uuid', $userUuid)->first();

//     if (!$user) {
//         return response()->json(["error" => "User not found"], 404);
//     }

//     $user->save();

//     return response()->json(["user" => $user], 200);
// }

public function deleteOwnAccount(Request $request, $userUuid)
{
    $this->service->deleteOwnAccount($request,$userUuid);
    return response()->json(["message" => "Account deleted successfully"], 200);
}
public function promote(Request $request,string $userUuid){
    try{

        if($userUuid === $request->user()->user_uuid){
            return response()->json(["message"=>"can't promote yourself"],403);
        }
        $user = $this->service->promote($userUuid);
        return response()->json(["user"=>$user,"message"=>"User Promoted"]);
    }catch(\Exception $e){
        return response()->json(["error"=>$e->getMessage()],$e->getCode());
    }catch(AlreadyPromotedException $e){
        return response()->json(["error"=>$e->getMessage()],$e->getCode());

    }
}
public function demote(Request $request,string $userUuid){
    try{
        if($userUuid === $request->user()->user_uuid){
            return response()->json(["message"=>"can't promote yourself"],403);
        }
        $user = $this->service->demote($userUuid);
        return response()->json(["user"=>$user,"message"=>"User Demoted"]);
    }catch(\Exception $e){
        return response()->json(["error"=>$e->getMessage()],$e->getCode());
    }catch(AlreadyPromotedException $e){
        return response()->json(["error"=>$e->getMessage()],$e->getCode());

    }
}

}
