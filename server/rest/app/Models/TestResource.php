<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestResource extends Model
{
    use HasFactory;
    protected $fillable = [
        "content",
        "test_resource_uuid",
        "test_id",
        "description",
        "user_id"
    ];
}
