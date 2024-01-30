<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddTestResourceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "content" => [
                "string",
                "nullable",
                "regex:#https://(?:docs\.google\.com/(?:document|presentation)/d/|drive\.google\.com/file/d/)([a-zA-Z0-9_-]+)/(?:edit|view)?\S*#"
            ],                    
            "test_uuid" => "uuid|required",
            "description" => "string|required"
        ];
    }
}
