<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Auths
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

//Task
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
    Route::get('/user/{id}', [\App\Http\Controllers\UserController::class, 'show']);
    Route::put('/user/update/', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/user/delete/', [\App\Http\Controllers\UserController::class, 'destroy']);

    Route::get('/tasks', [\App\Http\Controllers\TaskController::class, 'index']);
    Route::post('/task/create', [\App\Http\Controllers\TaskController::class, 'store']);
    Route::get('/task/{id}', [\App\Http\Controllers\TaskController::class, 'show']);
    Route::put('/task/update/', [\App\Http\Controllers\TaskController::class, 'update']);
    Route::delete('/task/delete/', [\App\Http\Controllers\TaskController::class, 'destroy']);

    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
