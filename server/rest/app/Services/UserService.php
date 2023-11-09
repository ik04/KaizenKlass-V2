<?php

namespace App\Services;

use App\Enums\Role;
use App\Models\User;
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
}