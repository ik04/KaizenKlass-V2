<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Ichtrojan\Otp\Otp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    private $otp;
    public function __construct()
    {
        $this->otp = new Otp;        
    }

    public function resetPassword(ResetPasswordRequest $request){
        $validated = $request->validated();
        $verifyOtp = $this->otp->validate($validated["email"],$request->otp);
        if(!$verifyOtp->status){
            return response()->json(["error"=>$verifyOtp],401);
        }
        $user = User::where("email",$validated["email"])->first();
        $user->update(["password"=>Hash::make($validated["password"])]);
        $user->tokens()->delete();
        return response()->json(["success" => true],200);
    }
}
