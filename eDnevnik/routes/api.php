<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\GradeTypeController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\SchoolGradeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\SubjectController;
use App\Models\Grade;
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


/*  
 *   Rute za razrede
*/

//radi - prikaz svih razreda
Route::get('/schoolGrades',[SchoolGradeController::class,'index']);

//radi - za odredjeni razred vraca sve predmete
Route::get('/schoolGrades/{school_grade_id}/subjects',[SchoolGradeController::class,'show']);

//radi - unos novog razreda
Route::post('/schoolGrades',[SchoolGradeController::class, 'store']);

//radi - brisanje predmeta
Route::delete('/schoolGrades/{school_grade_id}',[SchoolGradeController::class, 'destroy']);

//radi - azuriranje ime razreda
Route::put('/schoolGrades/{school_grade_id}', [SchoolGradeController::class, 'update']);


/*  
 *   Rute za predmete
*/

//radi - vraca sve predmete
Route::resource('/subjects',SubjectController::class);

//radi - vraca odredjeni predmet
Route::get('/subjects/{subject_id}',[SubjectController::class,'show']);

//radi - azuriranje predmeta
Route::put('/subjects/{subject_id}',[SubjectController::class,'update']);

//radi - dodavanje novog predmeta odredjenom razredu
Route::post('/schoolGrades/{school_grade_id}/subjects', [SubjectController::class,'store']);

//radi - brisanje predmeta
Route::delete('/subjects/{subject_id}', [SubjectController::class,'destroy']);

/*  
 *   Rute za tip ocene
*/

//radi - prikaz svih tipova ocena
Route::get('/typeOfGrades',[GradeTypeController::class,'index']);

//radi - prikaz odredjenog tipa
Route::get('/typeOfGrades/{type_of_grade_id}',[GradeTypeController::class,'show']);

//radi - azuriranje odredjenog tipa
Route::put('/typeOfGrades/{type_of_grade_id}',[GradeTypeController::class,'update']);

//radi - dodaje novi tip ocene
Route::post('/typeOfGrades', [GradeTypeController::class,'store']);

//radi - brisanje odredjenog tipa
Route::delete('/typeOfGrades/{type_of_grade_id}', [GradeTypeController::class,'destroy']);

/*  
 *   Rute za profesora
*/

//radi - prikaz svih profesora
Route::get('/professors',[ProfessorController::class,'index']);

//radi - prikaz odredjenog profesora
Route::get('/professors/{professor_id}',[ProfessorController::class,'show']);

//radi - azuriranje imena profeosra
Route::put('/professors/{professor_id}',[ProfessorController::class,'update']);

//radi - unos novog profesora
Route::post('/professors', [ProfessorController::class,'store']);

//radi - brisanje odredjenog profesora
Route::delete('/professors/{professor_id}', [ProfessorController::class,'destroy']);

/*  
 *   Rute za roditelja
*/

//radi - prikaz svih roditelja
Route::get('/parents',[StudentParentController::class,'index']);

//radi - prikaz odredjenog roditelja
Route::get('/parents/{parent_id}',[StudentParentController::class,'show']);

//radi - azuriranje imena roditelja
Route::put('/parents/{parent_id}',[StudentParentController::class,'update']);

//radi - dodaje novog roditelja bez dece
Route::post('/parents', [StudentParentController::class,'store']);

//radi donekle - brise roditelje cak iako imaju decu (u migraciji nije dodao kao foreignId?)
Route::delete('/parents/{parent_id}', [StudentParentController::class,'destroy']);

/*  
 *   Rute za ucenike
*/

//radi - prikaz svih ucenika
Route::get('/students',[StudentController::class,'index']);

//radi - prikaz odredjenog ucenika
Route::get('/students/{student_id}',[StudentController::class,'show']);

//radi - ubacivanje novog ucenika za odredjenog roditelja
Route::post('/parents/{parent_id}/students', [StudentController::class,'store']);

//radi - azuriranje imena ucenika
Route::put('/students/{student_id}',[StudentController::class,'update']);

//radi - brisanje odredjenog studenta
Route::delete('/students/{student_id}', [StudentController::class,'destroy']);

/*  
 *   Rute za ocene
*/

//radi - prikaz svih ocena
Route::resource('/grades',GradeController::class);

//radi - vraca spisak ocena za odredjenog studenta
Route::get('/students/{student_id}/grades',[GradeController::class,'show']);

//radi - odredjeni profesor moze da ubaci ocenu za odredjenog studenta
Route::post('/professors/{professor_id}/grades', [GradeController::class,'store']);

//ne radi - izbacuje gresku kod save
Route::put('/professors/{professor_id}/grades',[GradeController::class,'update']);

//radi - brise odredjenu ocenu
Route::post('/professors/{professor_id}/deleteGrades', [GradeController::class,'destroy']);

/*  
 *   Rute za registraciju, login, logout
*/