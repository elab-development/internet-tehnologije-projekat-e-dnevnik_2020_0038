<?php

use App\Http\Controllers\AuthController;
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
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
//spisak svih razreda(1-4)
Route::resource('/razredi', RazredController::class);

//unos razreda
Route::post('/razredi', [RazredController::class, 'store']);

//prikaz svih ocena i aktivnosti unetih za odredjenog ucenika
//Route::get('/korisnici/{korisnik_id}/dnevnici',[DnevnikController::class,'index']);
//Route::resource('/dnevnici/{ucenik_id}', DnevnikController::class);

//ne radi
//prikazuje sve unose za sve ucenike
Route::get('/dnevnici', [DnevnikController::class,'index']);

//prikaz predmeta za konkretan razred
Route::get('/razredi/{razred_id}', [RazredController::class,'show']);


Route::put('/razredi/{razred_id}', [RazredController::class,'update']);

//unos predmeta za odredjen razred
Route::post('/razredi/{razred_id}/predmeti', [PredmetController::class,'store']);

//ne radi
Route::put('predmeti/{predmet_id}',[PredmetController::class, 'update']);

//brisanje predmeta
Route::delete('predmeti/{predmet_id}', [PredmetController::class, 'destroy']);

//prikaz svih tipova korisnika (admin, profesor, ucenik, roditelj)
Route::resource('/tipoviKorisnika', TipKorisnikaController::class);

//prikaz svih mogucih unosa opisa (aktivnost, ocena, ocena na polugodistu, zakljucna ocena)
Route::resource('/tipoviOpisa', TipOpisaController::class);

//prikaz odredjenog korisnika ali za tip korisnika nece da prikaze lepi json
Route::get('/korisnici/{korisnik_id}',[KorisnikController::class,'show']);

//Route::match(['get','post'],'/registrujUcenika',[DnevnikController::class,'index']);
Route::post('/registrujRoditelja',[AuthController::class,'register'])->middleware('guest');

Route::post('/login',[AuthController::class,'login'])->middleware('guest');

Route::get('/logoutRoditelja',[AuthController::class,'logout'])->middleware('auth');
