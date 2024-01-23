<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectedSubject extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "subject_id",
        "selection_uuid"
    ];
}
