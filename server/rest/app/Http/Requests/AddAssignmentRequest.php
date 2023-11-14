<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator;

class AddAssignmentRequest extends FormRequest
{   
    public function rules(): array
    {
        return [
            "title" => "required|string",
            "subject_uuid" => "required|uuid",
            "description" => "string|nullable",
            "link"=>"string|nullable",
            "content" => "regex:~https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{33})\/view\?usp=sharing~|string|nullable",];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new ValidationException($validator, $this->errorResponse($validator));
    }

    protected function errorResponse(\Illuminate\Contracts\Validation\Validator $validator)
    {
        return response()->json([
            'message' => 'Invalid Gdrive link',
            'errors' => $validator->errors(),
        ], 422);
    }
}
