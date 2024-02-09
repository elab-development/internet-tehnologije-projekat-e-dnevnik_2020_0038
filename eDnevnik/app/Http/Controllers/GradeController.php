<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeCollection;
use App\Models\Grade;
use Hamcrest\Core\IsInstanceOf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $pageNumber)
    {
        $perPage = $request->input('per_page', 5);
        $ocene = Grade::paginate($perPage);
        $totalPages = $ocene->lastPage();
        $request->pageNumber;

        return response()->json([
            'ocene' => new GradeCollection($ocene),
            'total_pages' => $totalPages,

        ]);
    }

    public function getGradesPaginate($pageNumber, Request $request){
         $perPage = $request->input('per_page', 5);
        $skip = $perPage * $pageNumber;
        $ocene = Grade::skip($skip)->take($perPage)->get();
        $totalPages = ceil(Grade::count() / $perPage);

        return response()->json([
            'ocene' => new GradeCollection($ocene),
            'total_pages' => $totalPages,
            'pageNumber' => intval($pageNumber)
        ]);
    }

    public function getGradesForStudent($student_id, $subject_id){
        $grades = Grade::where('student_id', $student_id)->where('subject_id',$subject_id)->get();
        return new GradeCollection($grades);
    }

    public function getGradesTypesForStudent($student_id, $grade_type_id){
        $grades = Grade::where('student_id', $student_id)->where('grade_type_id',$grade_type_id)->get();
        return new GradeCollection($grades);
    }

    public function getSubjectGradesOfTypeForStudent($student_id, $subject_id, $grade_type_id){
        $grades = Grade::where('student_id', $student_id)->where('subject_id',$subject_id)->where('grade_type_id',$grade_type_id)->get();
        return new GradeCollection($grades);
    }

    public function getSemestarGrade(Request $request, $professor_id){
        $grades = Grade::where('student_id', $request->student_id)
        ->where('subject_id',$request->subject_id)
        ->where('grade_type_id',2)
        ->whereMonth('date', '>=', '09')
        ->get();

        if($grades !== null){
            $sum = 0;
            $numberOfGrades = 0.0;
            foreach($grades as $gr){
                $sum = $sum + $gr->grade; 
                $numberOfGrades++;
            }
            $sum = $sum/$numberOfGrades;
            return response()->json('Zakljucna ocena je ' . $sum, 200);
        }else{
            return response()->json('Ne postoje ocene', 404);
        }
    }

    public function getFinalGrade(Request $request, $professor_id){
        $grade = Grade::where('student_id', $request->student_id)->where('grade_type_id', 3)->first();

        if($grade instanceof Grade){
            $grades = Grade::where('student_id', $request->student_id)
            ->where('subject_id',$request->subject_id)
            ->whereDate('date', '>', $grade->date)
            ->get();

            $sum = $grade->grade;
            $numberOfGrades = 1.0;
            foreach($grades as $gr){
                $sum = $sum + $gr->grade; 
                $numberOfGrades++;
            }
            $sum = $sum/$numberOfGrades;
            return response()->json('Zakljucna ocena je ' . $sum, 200);
        }else{
            return response()->json('Ne postoji ocena na polugodistu', 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $proffesor_id)
    {
        $grade = new Grade;
        //$student->studentParent = StudentParent::where('id',$student_parent_id)->get();
        $grade->professor_id = $proffesor_id;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'grade' => 'required',
            'grade_type_id' => 'required|integer',
            'student_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'date'=> 'required|date'
            //dodaj posle za gradetype
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ocena, predmet, student mora da bude izabrano', 404);
        }else{
            $grade->grade = $data["grade"];
            $grade->student_id = $data["student_id"];
            $grade->subject_id = $data["subject_id"];
            $grade->date = $data["date"];
            $grade->grade_type_id = $data["grade_type_id"];

            if($grade->grade_type_id == 1 && !is_string($grade->grade) ){
                return response()->json('Za izabrani tip ocene morate da unesete tekstualnu vrednost. Ocena nije uneta', 404);
            }

            $res = $grade->save();
            return $res ? response()->json('Ocena je uspesno uneta', 200) : response()->json('Ocena nije uneta', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function show($student_id)
    {
        $grade = Grade::where('student_id', $student_id)->get();
        return new GradeCollection($grade);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function edit(Grade $grade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */

     //ne moze ovako mora da se trazi i ocena ili datum
    public function update(Request $request, $student_id)
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'grade' => 'required',
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ocena mora da bude izmedju 1 i 5', 404);
        }else{ 
            $date = $data['date'];
            $professor = $data['professor_id'];
            $subject = $data['subject_id'];

            $updated_grade = new Grade();

            $grade = Grade::where('subject_id', $subject)
            ->where('student_id', $student_id)
            ->where('professor_id', $professor)
            ->where('date', $date)
            ->first();

            $updated_grade->grade = $data['grade'];
            $updated_grade->student_id = $grade->student_id;
            $updated_grade->subject_id = $grade->subject_id;
            $updated_grade->date = $grade->date;
            $updated_grade->grade_type_id = $grade->grade_type_id;
            $updated_grade->professor_id = $professor;
            
            $grade = Grade::where('subject_id', $subject)
            ->where('student_id', $student_id)
            ->where('professor_id', $professor)
            ->where('date', $date)
            ->delete();
            if ($updated_grade) {
                if (isset($data['grade'])) {
                    $res = $updated_grade->save();
                    return $res ? response()->json('Ocena je uspesno izmenjena', 200) : response()->json('Ocena nije izmernjena', 404);
                } else {
                    return response()->json('Nedostaje ključ "grade" u podacima', 400);
                }
            } else {
                return response()->json('Zapis nije pronađen', 404);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $professor_id)
    {
        $data = json_decode($request->getContent(), true);

        $date = $data['date'];
        $student = $data['student_id'];
        $subject = $data['subject_id'];
        
        $res  = Grade::where('date', $date)
            ->where('subject_id', $subject)
            ->where('student_id', $student)
            ->where('professor_id', $professor_id)
            ->delete();
        
        return $res ? response()->json('Ocena je uspesno izbrisana', 200) : response()->json('Ocena nije izbrisana', 404);
    }
}
