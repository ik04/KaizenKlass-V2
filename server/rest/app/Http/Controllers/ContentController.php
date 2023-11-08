<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
    public function downloadFile(Request $request){
        $validation = Validator::make($request->all(),[
            "path" => "required|string"
        ]);
        if($validation->fails()){
            return response()->json($validation->errors()->all(),400);
        }

        $validated = $validation->validated();
        if (!Storage::exists($validated["path"])) {
            return response()->json(['error' => 'File not found'], 404);
        }        
        return Storage::download($validated["path"]);
    }
    // add rate limits to prevent exploits
}
