<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddResourceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "title"=>"string|required",
            "link" => ["required", "string", "regex:/^(?:(?:https?|ftp):\/\/|www\.)[a-z0-9-]+(\.[a-z0-9-]+)*(?:\/[^\s]*)?$/i"],        
            "description" => "string|nullable"
        ];
    }
}
