<?php

use App\Http\Controllers\DnevnikController;
use App\Http\Controllers\KorisnikController;
use App\Http\Controllers\PredmetController;
use App\Http\Controllers\RazredController;
use App\Http\Controllers\TipKorisnikaController;
use App\Http\Controllers\TipOpisaController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//radi
Route::resource('/razredi', RazredController::class);

//ne radi ne znam sto?
//Route::resource('/dnevnici', DnevnikController::class);

//radiiii
Route::get('/razredi/{razred_id}', [RazredController::class,'show']);

//radii
Route::post('/razredi/{razred_id}/predmeti', [PredmetController::class,'store']);

//radi
Route::delete('predmeti/{predmet_id}', [PredmetController::class, 'destroy']);

//radi
Route::resource('/tipoviKorisnika', TipKorisnikaController::class);

//radi
Route::resource('/tipoviOpisa', TipOpisaController::class);

//radi ali nece lepo da prikaze ugnjezdeno
Route::get('/korisnici/{korisnik_id}',[KorisnikController::class,'show']);

//pogledaj posle da li radi
Route::get('/korisnici/{korisnik_id}/dnevnici',[DnevnikController::class,'index']);
