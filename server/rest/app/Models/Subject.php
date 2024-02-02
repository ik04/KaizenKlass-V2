<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $fillable = [
        "subject",
        "subject_uuid"
    ];
    
    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}
