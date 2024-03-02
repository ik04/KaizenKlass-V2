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
            "subject_uuid" => "required|string",
            "description" => "string",
            "link" => [
                "string",
                "nullable",
                "regex:/^(https?|ftp):\/\/[^\s\/$?#].[^\s]*$/",],
                "deadline" =>"nullable|date_format:Y-m-d H:i:s",
            "content" => [
                "string",
                "nullable",
                "regex:#https://(?:docs\.google\.com/(?:document|presentation)/d/|drive\.google\.com/file/d/)([a-zA-Z0-9_-]+)/(?:edit|view|usp=drivesdk)?\S*#"            
            ],        
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
