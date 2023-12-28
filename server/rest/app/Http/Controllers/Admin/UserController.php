<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Login;
use App\Actions\Admin\Logout;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller{
    public function __construct(protected UserService $service)
    {
        
    }
    public function index(){
        return view('pages.login');
    }

    public function home(){
        return view('pages.home');
    }

    public function authenticate(LoginUserRequest $request,Login $login)
    {
        [
            'email' => $email,
            'password' => $password,
        ] = $request->validated();        
        try {
            $login->handle($email, $password);
        } 
        catch (Exception) {
            throw ValidationException::withMessages([
                'general' => 'Incorrect credentials.',
            ]);
        }
        $request->session()->regenerate();

        return redirect()->route('home');
    }

    public function logout(Logout $logout){
        try{
            $logout->handle();
            return redirect()->route('login');
        }catch(Exception $e){
            // ? how do i handle this
        }

    }

    
    
}