<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSolutionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "description" => "string",
            "content" => "string|regex:https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{33})\/view\?usp=sharing"
        ];
    }
}
