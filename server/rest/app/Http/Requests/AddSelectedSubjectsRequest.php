<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddSelectedSubjectsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'subject_uuid' => 'array',
            'subject_uuid.*' => 'string',
        ];
    }
}
