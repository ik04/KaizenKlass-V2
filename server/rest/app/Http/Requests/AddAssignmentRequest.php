<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddAssignmentRequest extends FormRequest
{   
    public function rules(): array
    {
        return [
            "title" => "required|string",
            "subject_uuid" => "required|uuid",
            "description" => "string|nullable",
            "link"=>"string|nullable",
            "content" => "string|regex:https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{33})\/view\?usp=sharing|nullable",];
    }
}
