<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Login;
use App\Actions\Admin\Logout;
use App\Actions\Admin\User\DeleteUser;
use App\Actions\Admin\User\DemoteUser;
use App\Actions\Admin\User\GetUsers;
use App\Actions\Admin\User\PromoteUser;
use App\Actions\Admin\User\RegisterUser;
use App\Exceptions\UserNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
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
    public function getUsersView(GetUsers $getUsers){
        $users = $getUsers->handle();
        return view('pages.user.view',["users"=>$users]);
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
    public function destroy(User $id, DeleteUser $deleteUser){
        try{
            $deleteUser = $deleteUser->handle($id);
            return redirect()->route('users.view')->with('success', 'User deleted successfully');
        }catch(UnauthorizedException $e){
            return redirect()->route('users.view')->with('error', $e->getMessage());
        }
    }
    public function promote(User $id,PromoteUser $promoteUser){
        try{
            $promoteUser = $promoteUser->handle($id);
            return redirect()->route('users.view')->with('success', 'User Promoted successfully');
        }catch(Exception $e){
            return redirect()->route('users.view')->with('error', $e->getMessage());
        }
    }
    public function demote(User $id,DemoteUser $demoteUser){
        try{
            $demoteUser = $demoteUser->handle($id);
            return redirect()->route('users.view')->with('success', 'User Demoted successfully');
        }catch(Exception $e){
            return redirect()->route('users.view')->with('error', $e->getMessage());
        }
    }
    
    
}