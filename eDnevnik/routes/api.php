<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthControllerAdmin;
use App\Http\Controllers\AuthControllerProfessor;
use App\Http\Controllers\AuthControllerStudent;
use App\Http\Controllers\AuthControllerStudentParent;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\GradeTypeController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\SchoolGradeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\SubjectController;
use App\Http\Middleware\AdminAuthenticated;
use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;

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


Route::get('/login', function () {
    return response()->json(['Poruka' => 'Dobrodosli na login stranicu']);;
})->name('login')->middleware('guest');

Route::post('/zaboravljenaLozinka', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email')->middleware('guest');

Route::get('/zaboravljenaLoznika/{token}', function (string $token) {
    return response()->json(['token' => $token]);
})->name('password.reset')->middleware('guest');

Route::post('/resetLozinka/reset',[ForgotPasswordController::class,'reset'])->name('password.update')->middleware('guest');

Route::get('generate-pdf/{student_id}', [PDFController::class, 'generatePDF']);

/* Laravel docs
Route::get('/reset-password/{token}', function (string $token) {
    return view('auth.reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');
*/

Route::group(['middleware' => ['auth:sanctum', 'professor']], function (){

    //radi - odredjeni profesor moze da unese ocenu za odredjenog studenta - proesor
    Route::post('/professors/{professor_id}/grades', [GradeController::class,'store']);

    //radi - vraca prosek svih ocena za drugo polugodiste
    Route::post('/professors/{professor_id}/finalgrades', [GradeController::class,'getFinalGrade']);

    //radi - za odredjenog studenta vraca ocenu na polugodistu koja je kompjuterski izracunata
    Route::post('/professors/{professor_id}/firstSemestarGrades', [GradeController::class,'getSemestarGrade']);

    //radi - vraca sve predmete koje predaje profesor
    Route::get('/professors/{professor_id}/subjects', [SubjectController::class,'getAllSubjects']);

    //radi - vraca sve ucenike za odredjeni predmet (ide po razredu)
    Route::get('/subjects/{subject_id}/students', [StudentController::class,'getAllStudentsForSubject']);

    //radi - menja unetu ocenu 
    Route::post('/students/{student_id}/grades',[GradeController::class,'update']);

    //radi - brise odredjenu ocenu
    Route::delete('/professors/{professor_id}/deleteGrades', [GradeController::class,'destroy']);

    //radi - prikaz odredjenog ucenika - kao njegov profil svi
    Route::get('/studentsProfile/{student_id}',[StudentController::class,'show']);

});


Route::group(['middleware' => ['auth:sanctum', 'admin']], function (){

    //radi - vraca odredjeni predmet
    Route::get('/subjects/{subject_id}',[SubjectController::class,'show']);

    //radi - registracija novog admina
    Route::post('/registrujAdmina',[AuthControllerAdmin::class,'register']);//napisana

    //roditelj - bez dece
    //Route::post('/registrujRoditelja',[AuthControllerStudentParent::class,'register']);//admin ali je isto kao i store

    //ucenik
    //Route::post('/registrujUcenika',[AuthControllerStudent::class,'register']);//isto kao store i admin ce da radi

    //profesor
    //Route::post('/registrujProfesora',[AuthControllerProfessor::class,'register']);//isto kao store i admin ce da radi

    //admin
    //Route::post('/registrujAdmina',[AuthControllerAdmin::class,'register']);//isto kao store i admin ce da radi

    //radi - unos novog razreda
    Route::post('/schoolGrades',[SchoolGradeController::class, 'store']);//napisana

    //radi - brisanje razreda
    Route::delete('/schoolGrades/{school_grade_id}',[SchoolGradeController::class, 'destroy']);//napisana

    //radi - azuriranje ime razreda
    Route::put('/schoolGrades/{school_grade_id}', [SchoolGradeController::class, 'update']);//napisana

    //radi - vraca sve predmete
    Route::resource('/subjects',SubjectController::class);//napisana

    //radi - azuriranje predmeta
    Route::put('/subjects/{subject_id}',[SubjectController::class,'update']);//napisana

    //radi - dodavanje novog predmeta odredjenom razredu za odredjenog prof
    Route::post('/schoolGrades/{school_grade_id}/subjects', [SubjectController::class,'stosre']);//napisana

    //radi - brisanje predmeta
    Route::delete('/subjects/{subject_id}', [SubjectController::class,'destroy']);//napisana

    //radi - prikaz odredjenog tipa
    Route::get('/typeOfGrades/{type_of_grade_id}',[GradeTypeController::class,'show']);//napisana

    //radi - azuriranje odredjenog tipa
    Route::put('/typeOfGrades/{type_of_grade_id}',[GradeTypeController::class,'update']);//napisana

    //radi - dodaje novi tip ocene
    Route::post('/typeOfGrades', [GradeTypeController::class,'store']);//napisana

    //radi - brisanje odredjenog tipa
    Route::delete('/typeOfGrades/{type_of_grade_id}', [GradeTypeController::class,'destroy']);//napisana

    //radi - prikaz svih profesora
    Route::get('/professors',[ProfessorController::class,'index']);//napisana

    //radi - prikaz odredjenog profesora
    Route::get('/professors/{professor_id}',[ProfessorController::class,'show']);

    //radi - azuriranje imena profeosra
    Route::put('/professors/{professor_id}',[ProfessorController::class,'update']);//napisana

    //radi - unos novog profesora
    Route::post('/professors', [ProfessorController::class,'store']);//napisana

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

    //radi donekle - brise roditelja
    Route::delete('/parents/{parent_id}', [StudentParentController::class,'destroy']);

    //radi - prikaz svih ucenika
    Route::get('/students',[StudentController::class,'index']);

    //radi - ubacivanje novog ucenika za odredjenog roditelja
    Route::post('/parents/{parent_id}/students', [StudentController::class,'store']);

    //radi - azuriranje imena ucenika
    Route::put('/students/{student_id}',[StudentController::class,'update']); //napisana

    //radi - brisanje odredjenog studenta
    Route::delete('/students/{student_id}', [StudentController::class,'destroy']); //napisana

    //radi - prikaz svih ocena
    Route::resource('/grades',GradeController::class);//napisana

    //radi - prikaz svih razreda
    Route::get('/schoolGrades',[SchoolGradeController::class,'index']); //napisana
});

//ako necemu mogu svi da pristupe onda neka bude isauth

Route::get('/typeOfGrades',[GradeTypeController::class,'index'])->middleware('isauth');

//radi - vraca za odredjenog ucenika i za odredjeni predmet ocene sve -svi
Route::get('/students/{student_id}/subjects/{subject_id}/grades',[GradeController::class,'getGradesForStudent'])->middleware('isauth');

//mora ovako da bude zbog reacta ali inace isauth - za odredjeni razred vraca sve predmete
Route::get('/schoolGrades/{school_grade_id}/subjects',[SchoolGradeController::class,'show']);

Route::group(['middleware' => ['auth:sanctum', 'student']], function (){

    //radi - prikaz odredjenog ucenika - kao njegov profil svi
    Route::get('/students/{student_id}',[StudentController::class,'show']);

    //radi - vraca za odredjenog ucenika izabrani tip svih ocena - svi
    Route::get('/students/{student_id}/grades/{grade_type_id}',[GradeController::class,'getGradesTypesForStudent']);

    //radi - vraca za odredjenog ucenika, za izabrani predmet i za izabrani tip ocena sve ocene
    Route::get('/students/{student_id}/subjects/{subject_id}/grades/{grade_type_id}',[GradeController::class,'getSubjectGradesOfTypeForStudent']);

    //radi - vraca spisak ocena za odredjenog studenta - svi
    Route::get('/students/{student_id}/grades',[GradeController::class,'show']);
});

Route::post('/loginRoditelja',[AuthControllerStudentParent::class,'login']);

Route::post('/loginUcenika',[AuthControllerStudent::class,'login']);

Route::post('/loginProfesora',[AuthControllerProfessor::class,'login']);

Route::post('/loginAdmina',[AuthControllerAdmin::class,'login']);

Route::group(['middleware' => ['auth:sanctum']],function (){

    Route::middleware('student_parent')->get('studentParent/{parent_id}/students', [StudentController::class, 'getChildren']);

    Route::middleware('student')->post('/logoutUcenika',[AuthControllerStudent::class,'logout']);

    Route::middleware('student')->post('/logoutRoditelja',[AuthControllerStudentParent::class,'logout']);

    Route::middleware('professor')->post('/logoutProfesora',[AuthControllerProfessor::class,'logout']);

    Route::middleware('admin')->post('/logoutAdmina',[AuthControllerAdmin::class,'logout']);
});