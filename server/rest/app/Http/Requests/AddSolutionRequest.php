<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddSolutionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "content" => "string|regex:https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{33})\/view\?usp=sharing|nullable",
            "assignment_uuid" => "uuid|required",
            "description" => "string|nullable"
        ];
    }
}
