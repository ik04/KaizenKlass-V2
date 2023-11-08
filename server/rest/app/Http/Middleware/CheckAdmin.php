<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

class CheckAdmin{
    public function handle(Request $request, Closure $next){
        if($request->user()->role != Role::ADMIN->value){
            throw new AuthenticationException("You are unauthorized");
        }
        return $next($request);

    }
}