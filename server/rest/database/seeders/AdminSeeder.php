<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            "email" => "ik5292@srmist.edu.in",
            "name" => "Ishaan",
            "password" => Hash::make(env('SEEDER_PASSWORD')),
            "user_uuid" => Uuid::uuid4(),
            "role" => Role::ADMIN->value
        ]);
        
    }
}
