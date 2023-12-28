<?php

namespace App\Actions\Admin;

class Logout{
    public function handle(){
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}