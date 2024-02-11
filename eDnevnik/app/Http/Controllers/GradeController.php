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
        ->get();

        if($grades !== null && count($grades) !== 0){
            $sum = 0;
            $numberOfGrades = 0;
            foreach($grades as $gr){
                $sum = $sum + $gr->grade; 
                $numberOfGrades++;
            }
            $sum = $sum/$numberOfGrades;
            return $sum;
        }else{
            return null;
        }
    }

    public function getFinalGrade(Request $request, $professor_id){
        $grade = Grade::where('student_id', $request->student_id)->where('grade_type_id', 3)->first();

        if($grade instanceof Grade){
            $grades = Grade::where('student_id', $request->student_id)
            ->where('subject_id',$request->subject_id)
            ->whereDate('date', '>', $grade->date)
            ->get();

            if($grades !== null){
                $sum = 0;
                $numberOfGrades = 1;
                foreach($grades as $gr){
                    $sum = $sum + $gr->grade; 
                    $numberOfGrades++;
                }
                $sum = $sum/$numberOfGrades;
                return $sum;
            }else{
                return 0;
            }
        }else{
            return null;
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
        $zak = Grade::where('student_id', $request->student_id)->where('grade_type_id', 4)->first();
        if($zak !== null){
            return response()->json(['message' => 'Ne mozete da unesete ocenu nakon zakljucne ocene'], 404);
        }
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
            if($data["grade_type_id"] !== "1" && $data["grade_type_id"] !== "2"){

                if($data["grade_type_id"] === "4"){
                    $res = $this->getFinalGrade($request, $proffesor_id);

                    if($res === null){
                        return response()->json(['message' => 'Ne postoji ocena na polugodistu'], 400);
                    }else if($res === 0){
                        return response()->json(['message' => 'Ne postoji ocena u drugom polugodistu'], 400);
                    }

                }else{
                    $res = $this->getSemestarGrade($request, $proffesor_id);

                    if($res === null){
                        return response()->json(['message' => 'Ne postoji ni jedna ocena'], 400);
                    }
                }
            }

            $grade->grade = $data["grade"];
            $grade->student_id = $data["student_id"];
            $grade->subject_id = $data["subject_id"];
            $grade->date = $data["date"];
            $grade->grade_type_id = $data["grade_type_id"];

            if($grade->grade_type_id == 1 && !is_string($grade->grade) ){
                return response()->json(['message' =>'Za izabrani tip ocene morate da unesete tekstualnu vrednost. Ocena nije uneta'], 403);
            }

            $res = $grade->save();
            return $res ? response()->json(['message' => 'Ocena je uspesno uneta'], 200) : response()->json(['message' => 'Ocena nije uneta'], 404);
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
