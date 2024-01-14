<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthControllerAdmin;
use App\Http\Controllers\AuthControllerProfessor;
use App\Http\Controllers\AuthControllerStudent;
use App\Http\Controllers\AuthControllerStudentParent;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\GradeTypeController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\SchoolGradeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\SubjectController;
use App\Http\Middleware\AdminAuthenticated;
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

Route::post('/loginRoditelja',[AuthControllerStudentParent::class,'login']);

Route::post('/loginUcenika',[AuthControllerStudent::class,'login']);

Route::post('/loginProfesora',[AuthControllerProfessor::class,'login']);

Route::post('/loginAdmina',[AuthControllerAdmin::class,'login']);

Route::post('/registrujAdmina',[AuthControllerAdmin::class,'register']);

Route::group(['middleware' => ['auth:sanctum', 'professor']], function (){

    Route::get('/schoolGrades',[SchoolGradeController::class,'index']);

    //radi - prikaz svih tipova ocena - svi
    Route::get('/typeOfGrades',[GradeTypeController::class,'index']);

    //radi - vraca odredjeni predmet -prof i admin
    Route::get('/subjects/{subject_id}',[SubjectController::class,'show']);

    //radi za odredjenig ucenika vraca roditelja njegovog
    Route::get('/studentParents/{student_id}',[StudentParentController::class,'getParent']);

    //radi - odredjeni profesor moze da unese ocenu za odredjenog studenta - proesor
    Route::post('/professors/{professor_id}/grades', [GradeController::class,'store']);

    //radi - vraca prosek svih ocena za drugo polugodiste
    Route::post('/professors/{professor_id}/finalgrades', [GradeController::class,'getFinalGrade']);

    //radi - za odredjenog studenta vraca ocenu na polugodistu koja je kompjuterski izracunata
    Route::post('/professors/{professor_id}/firstSemestarGrades', [GradeController::class,'getSemestarGrade']);

    //radi - vraca sve predmete koje predaje profesor
    Route::get('/professors/{professor_id}/subjects', [SubjectController::class,'getAllSubjects']);

    //msm da nema potrebe za profesorom ovde jer on je svakako pre toga ulogovan pa ima proikaz svih svojih predmeta pa samo izabere - profesor
    //radi - vraca sve ucenike za odredjeni predmet (ide po razredu)
    Route::get('/subjects/{subject_id}/students', [StudentController::class,'getAllStudentsForSubject']);

    //ne radi - izbacuje gresku kod save - menja unetu ocenu 
    // TODO: da izbrise tu ocenu pa da sacuva samo novu i vidi da li radi ubacivanje ocene
    Route::put('/students/{student_id}/grades',[GradeController::class,'update']);

    //radi - brise odredjenu ocenu
    Route::post('/professors/{professor_id}/deleteGrades', [GradeController::class,'destroy']);

    //radi - prikaz odredjenog ucenika - kao njegov profil svi
    Route::get('/students/{student_id}',[StudentController::class,'show']);

});


Route::group(['middleware' => ['auth:sanctum', 'admin']], function (){

    //roditelj
    Route::post('/registrujRoditelja',[AuthControllerStudentParent::class,'register']);//admin ali je isto kao i store

    //ucenik
    Route::post('/registrujUcenika',[AuthControllerStudent::class,'register']);//isto kao store i admin ce da radi

    //profesor
    Route::post('/registrujProfesora',[AuthControllerProfessor::class,'register']);//isto kao store i admin ce da radi

    //admin
    //Route::post('/registrujAdmina',[AuthControllerAdmin::class,'register']);//isto kao store i admin ce da radi

    //radi - prikaz svih razreda
    Route::get('/schoolGrades',[SchoolGradeController::class,'index']);

    //radi - unos novog razreda
    Route::post('/schoolGrades',[SchoolGradeController::class, 'store']);

    //radi - brisanje predmeta
    Route::delete('/schoolGrades/{school_grade_id}',[SchoolGradeController::class, 'destroy']);

    //radi - azuriranje ime razreda
    Route::put('/schoolGrades/{school_grade_id}', [SchoolGradeController::class, 'update']);

    //radi - vraca sve predmete
    Route::resource('/subjects',SubjectController::class);

    //radi - azuriranje predmeta
    Route::put('/subjects/{subject_id}',[SubjectController::class,'update']);

    //radi - dodavanje novog predmeta odredjenom razredu
    Route::post('/schoolGrades/{school_grade_id}/subjects', [SubjectController::class,'store']);

    //radi - brisanje predmeta
    Route::delete('/subjects/{subject_id}', [SubjectController::class,'destroy']);

    //radi - prikaz odredjenog tipa
    Route::get('/typeOfGrades/{type_of_grade_id}',[GradeTypeController::class,'show']);

    //radi - azuriranje odredjenog tipa
    Route::put('/typeOfGrades/{type_of_grade_id}',[GradeTypeController::class,'update']);

    //radi - dodaje novi tip ocene
    Route::post('/typeOfGrades', [GradeTypeController::class,'store']);

    //radi - brisanje odredjenog tipa
    Route::delete('/typeOfGrades/{type_of_grade_id}', [GradeTypeController::class,'destroy']);

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

    //radi - prikaz svih ucenika
    Route::get('/students',[StudentController::class,'index']);

    //radi - ubacivanje novog ucenika za odredjenog roditelja
    Route::post('/parents/{parent_id}/students', [StudentController::class,'store']);

    //radi - azuriranje imena ucenika
    Route::put('/students/{student_id}',[StudentController::class,'update']);

    //radi - brisanje odredjenog studenta
    Route::delete('/students/{student_id}', [StudentController::class,'destroy']);

    //radi - prikaz svih ocena
    Route::resource('/grades',GradeController::class);

    Route::get('/schoolGrades',[SchoolGradeController::class,'index']);
});


Route::group(['middleware' => ['auth:sanctum', 'student']], function (){

    //radi - za odredjeni razred vraca sve predmete - svi mogu
    Route::get('/schoolGrades/{school_grade_id}/subjects',[SchoolGradeController::class,'show']);

    //radi - prikaz svih tipova ocena - svi
    Route::get('/typeOfGrades',[GradeTypeController::class,'index']);

    //radi - prikaz odredjenog ucenika - kao njegov profil svi
    Route::get('/students/{student_id}',[StudentController::class,'show']);

    //radi - vraca za odredjenog ucenika i za odredjeni predmet ocene sve -svi
    Route::get('/students/{student_id}/subjects/{subject_id}/grades',[GradeController::class,'getGradesForStudent']);

    //radi - vraca za odredjenog ucenika izabrani tip svih ocena - svi
    Route::get('/students/{student_id}/grades/{grade_type_id}',[GradeController::class,'getGradesTypesForStudent']);

    //radi - vraca za odredjenog ucenika, za izabrani predmet i za izabrani tip ocena sve ocene
    Route::get('/students/{student_id}/subjects/{subject_id}/grades/{grade_type_id}',[GradeController::class,'getSubjectGradesOfTypeForStudent']);

    //radi - vraca spisak ocena za odredjenog studenta - svi
    Route::get('/students/{student_id}/grades',[GradeController::class,'show']);
});

//
/*{
    "email": "tanjaKilibarda@gmail.com",
    "password": "tanja123"
}*/

    Route::group(['middleware' => ['auth:sanctum']],function (){
        Route::middleware('student_parent')->get('studentParent/{parent_id}/students', [StudentController::class, 'getChildren']);

        Route::middleware('student')->post('/logoutUcenika',[AuthControllerStudent::class,'logout']);

        Route::middleware('student')->post('/logoutRoditelja',[AuthControllerStudentParent::class,'logout']);

        Route::middleware('professor')->post('/logoutProfesora',[AuthControllerProfessor::class,'logout']);

        Route::middleware('admin')->post('/logoutAdmina',[AuthControllerAdmin::class,'logout']);
    });
/*"name_surname":"Pera Peric",
    "email":"peraPera@gmail.com",
    "password": "perapera123"*/
//TODO: Vidi kod update da li da se meneja i email