<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Login;
use App\Actions\Admin\Logout;
use App\Actions\Admin\User\RegisterUser;
use App\Exceptions\UserNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
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
                'general' => 'Invalid credentials.',
            ]);
        }catch(UserNotFoundException $e){
            return redirect()->route('home')->with("error","user not found");

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
    public function getAddUsersView(){
        return view('pages.user.add');
    }
    public function create(RegisterUserRequest $request, RegisterUser $registerUser){
        [
            "email" => $email,
            "password" => $password,
            "name" => $name
            ] = $request->validated();
        $user = $registerUser->handle($name,$email,$password);
        return redirect()->route('users.add')->with('success','User Registered Successfully');
    }

    
    
}