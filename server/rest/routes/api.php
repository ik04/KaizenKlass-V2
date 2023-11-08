<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\SolutionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Ramsey\Uuid\Uuid;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix("v1")->group(function(){
    Route::get("/healthcheck",function(){
        return response()->json(["message" => "Hi from KaizenKlass ~Ishaan Khurana"]);
    });
    
    Route::post("register-admin",[UserController::class,"registerAdmin"]);
    Route::post("register-contributor",[UserController::class,"registerContributor"]);
    Route::post("register-crosschecker",[UserController::class,"registerCrosschecker"]);
    Route::post("login",[UserController::class,"login"]);
    Route::get("user-data",[UserController::class,"userData"]); // No regular users
    Route::get("get-subjects",[SubjectController::class,"getSubjects"]);
    Route::get("get-subject-assignments/{subjectUuid}",[SubjectController::class,"getAssignmentsBySubject"]); // used in subjects page
    Route::get("get-assignment-solutions/{assignmentUuid}",[AssignmentController::class,"getSolutionsByAssignment"]); // for each assignment
    Route::get("get-assignment-subjects",[AssignmentController::class,"getAssignmentsWithSubjects"]); // for assignments page
    Route::get("get-assignments/{assignmentUuid}",[AssignmentController::class,"getAssignment"]); // for each assignment
    Route::get("get-assignments",[AssignmentController::class,"getAssignments"]);


    // * contributor routes
    Route::middleware(["auth:sanctum"])->group(function(){
        Route::post("logout",[UserController::class,"logout"]);
        Route::post("add-solution",[SolutionController::class,"addSolution"]);
        Route::delete("delete-own-account/{userUuid}", [UserController::class, "deleteOwnAccount"]);
        Route::delete("delete-own-solution/{solutionUuid}", [SolutionController::class, "deleteOwnSolution"]);
        Route::put("update-own-solution/{solutionUuid}", [SolutionController::class, "updateOwnSolution"]);
    });

    // * crosschecker routes
    Route::middleware(["auth:sanctum","checkCrosschecker"])->group(function(){
        Route::put("edit-assignment/{assignmentUuid}", [AssignmentController::class, "editAssignment"]);
        Route::put("update-solution/{solutionUuid}", [SolutionController::class, "updateSolution"]);
        Route::delete("delete-solution/{solutionUuid}", [SolutionController::class, "deleteSolution"]);
    });

    // * admin routes
    Route::middleware(["auth:sanctum","checkAdmin"])->group(function(){
        Route::delete("delete-assignment/{assignmentUuid}", [AssignmentController::class, "deleteAssignment"]);
        Route::post("add-assignment",[AssignmentController::class,"addAssignment"]);
        Route::post("add-subject",[SubjectController::class,"addSubject"]);
        Route::delete("delete-subject/{subjectUuid}", [SubjectController::class, "deleteSubject"]);
        Route::get("/_dbinit",function(){
            $relativePath = __DIR__ . "/init/subjects.json";
            $subjects = file_get_contents($relativePath);
            $subjects = json_decode($subjects);
            $subjects = $subjects->subjects;
            foreach($subjects as $subject){
                $subject = Subject::create([
                    "subject" => $subject->subject,
                    "subject_uuid" => Uuid::uuid4()
                ]);
            }
            return response()->json("initialized subjects db",201);
        });
    });

});
