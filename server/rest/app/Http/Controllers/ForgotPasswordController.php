<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Models\User;
use App\Notifications\ResetPasswordVerificationNotification;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(ForgotPasswordRequest $request){
        $validated = $request->validated();
        $email = $validated["email"];
        $user = User::where("email",$email)->first();
        $user->notify(new ResetPasswordVerificationNotification());
        return response()->json(["success" => true],200);


    }
}
