<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Test extends Model
{
    use HasFactory;
    protected $fillable = [
        "title",
        "exam_date",
        "subject_id",
        "test_uuid"
    ];

       /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany;
     */
    public function testResources(): HasMany
    {
        return $this->hasMany(TestResource::class);
    }

}
