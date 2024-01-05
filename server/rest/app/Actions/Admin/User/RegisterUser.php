<?php 

namespace App\Actions\Admin\User;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class RegisterUser{
    public function handle(string $name,string $email,string $password){
        $user = User::create([
            "email" => $email,
            "name" => $name,
            "password" => Hash::make($password),
            "user_uuid" => Uuid::uuid4(),
            "role" => Role::CONTRIBUTOR->value
        ]);
        return $user;
    }
}