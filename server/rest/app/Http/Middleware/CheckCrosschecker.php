<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

class CheckCrosschecker{
    public function handle(Request $request, Closure $next){
        if($request->user()->role != Role::ADMIN->value && $request->user()->role != Role::CROSSCHECKER->value){
            throw new AuthenticationException("You are unauthorized");
        }
        return $next($request);

    }
}