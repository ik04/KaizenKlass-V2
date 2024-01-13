<?php

use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/',[UserController::class,"index"])->name('login');
Route::post('/login',[UserController::class,"authenticate"])->name('login.authenticate');

Route::middleware(['auth'])->group(function () {
    Route::get('/home', [UserController::class, "home"])->name('home');
    Route::post('/logout', [UserController::class, "logout"])->name('logout');
    Route::get('/view/subjects', [SubjectController::class, "viewSubjects"])->name('subjects.view');
    Route::get('/add/subjects', [SubjectController::class, "addSubjectView"])->name('subjects.add');
    Route::post('/subject/add', [SubjectController::class, "addSubject"])->name('subject.create');
    Route::post('/subject/add-multiple', [SubjectController::class, "addSubjects"])->name('subject.create.multiple');
    Route::delete('/delete/subject/{id}', [SubjectController::class, "deleteSubject"])->name('subject.destroy');

    Route::get('/add/users',[UserController::class,"getAddUsersView"])->name('users.add');
    Route::get('/view/users',[UserController::class,"getUsersView"])->name('users.view');
    Route::post('/user/add',[UserController::class,"create"])->name('user.create');
    Route::delete('/user/delete/{id}',[UserController::class,"destroy"])->name('user.destroy');
    Route::put('/user/promote/{id}',[UserController::class,"promote"])->name('user.promote');
    Route::put('/user/demote/{id}',[UserController::class,"demote"])->name('user.demote');

});
// todo: promote and demote route