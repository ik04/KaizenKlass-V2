<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assignment extends Model
{
    use HasFactory;
    protected $fillable = [
        "title",
        "description",
        "subject_id",
        "assignment_uuid",
        "link",
        "content",
        "deadline"
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany;
     */
    public function solutions(): HasMany
    {
        return $this->hasMany(Solution::class);
    }
}
