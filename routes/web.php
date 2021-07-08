<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index']);
Route::post('nrp', [HomeController::class, 'requestAllNRP']);
Route::post('save-results', [HomeController::class, 'saveResults']);
Route::post('save-descriptors', [HomeController::class, 'saveDescriptors']);
Route::post('get-descriptors', [HomeController::class, 'getDescriptors']);
Route::post('get-photo-address', [HomeController::class, 'getPhotoAddress']);
Route::post('get-registered-labels', [HomeController::class, 'getRegisteredLabels']);
Route::post('search/{nrp}/{filename}/photo', [HomeController::class, 'requestMyPhoto']);
Route::post('search/{nrp}/photo', [HomeController::class, 'requestPhoto']);
Route::post('search/{nrp}', [HomeController::class, 'recognizeFace']);
