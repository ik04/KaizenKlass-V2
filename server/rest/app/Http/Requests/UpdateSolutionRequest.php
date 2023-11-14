<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class UpdateSolutionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "description" => "string",
            "content" => "string|regex:https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{33})\/view\?usp=sharing"
        ];
    }
    public function messages(): array
    {
        return [
            "content.regex" => "The content field must be a valid Google Drive URL.",
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new ValidationException($validator, $this->errorResponse($validator));
    }

    protected function errorResponse(\Illuminate\Contracts\Validation\Validator $validator)
    {
        return response()->json([
            'errors' => $validator->errors(),
        ], 422);
    }
}
