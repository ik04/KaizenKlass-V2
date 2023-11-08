<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    use HasFactory;
    protected $fillable = [
        "content",
        "solution_uuid",
        "assignment_id",
        "description",
        "user_id"
    ];
}
