<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

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

    protected function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $content = $this->input('content');

            if ($content && !preg_match('~https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{33})\/view\?usp=sharing~', $content)) {
                $validator->errors()->add('content', 'The content field must be a valid Google Drive link.');
            }
        });
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new ValidationException($validator, $this->response(
            $this->formatErrors($validator)
        ));
    }
}
